const crypto = require('crypto');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || process.env.ADMIN_BACKEND_PORT || 4000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;
const DATA_DIR = process.env.ADMIN_DATA_DIR || __dirname;
const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'db.json');
const SETTINGS_PATH = process.env.SETTINGS_PATH || path.join(DATA_DIR, 'site-settings.json');
const UPLOADS_DIR = process.env.UPLOADS_DIR || path.join(DATA_DIR, 'uploads');
const MAX_UPLOAD_BYTES = Number(process.env.MAX_UPLOAD_BYTES || 5 * 1024 * 1024);
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']);

const initialSiteData = {
  pages: [
    { 
      id: 'home', 
      title: 'Inicio', 
      slug: '/', 
      description: 'Página principal del sitio',
      sections: ['hero-1', 'services-1', 'why-us-1'] 
    },
    {
      id: 'about',
      title: 'Nosotros',
      slug: '/nosotros',
      description: 'Conoce nuestra historia y equipo',
      sections: ['hero-about', 'about-text']
    },
    {
      id: 'contact',
      title: 'Contacto',
      slug: '/contacto',
      description: 'Canales de comunicación directa',
      sections: ['contact-hero', 'contact-form']
    }
  ],
  sections: {
    'hero-1': { 
      type: 'Hero', 
      content: { 
        title: 'Protección que se adapta a tu vida', 
        subtitle: 'Seguros diseñados para lo que más valoras.',
        buttonText: 'Cotizar ahora'
      },
      styles: { 
        backgroundColor: '#064e3b', 
        textColor: '#ffffff', 
        paddingTop: '120px',
        paddingBottom: '120px',
        textAlign: 'center',
        fontSizeTitle: '4rem',
        textColor: '#ffffff'
      },
      is_visible: true
    },
    'services-1': {
      type: 'Services',
      content: {
        title: 'Servicios Destacados',
        items: 'Automóviles, Hogar, Vida, Comercio'
      },
      styles: {
        backgroundColor: '#f5f5f7',
        paddingTop: '60px',
        paddingBottom: '60px'
      },
      is_visible: true
    },
    'why-us-1': {
      type: 'Features',
      content: { 
        title: '¿Por qué elegir Huelmo?', 
        text: 'Asesoría experta, respuesta inmediata y el respaldo de las mejores compañías del país.' 
      },
      styles: { backgroundColor: '#ffffff', textColor: '#1f2937', paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' },
      is_visible: true
    },
    'hero-about': {
      type: 'Hero',
      content: { title: 'Nuestra Trayectoria', subtitle: 'Más de una década brindando seguridad.', buttonText: 'Ver Historia' },
      styles: { backgroundColor: '#1d4ed8', textColor: '#ffffff', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center', fontSizeTitle: '3.5rem' },
      is_visible: true
    },
    'about-text': {
      type: 'Text',
      content: { title: 'Líderes en Confianza', text: 'En Huelmo Seguros, entendemos que cada cliente es único. Por eso diseñamos soluciones a medida.' },
      styles: { backgroundColor: '#ffffff', textColor: '#374151', paddingTop: '60px', paddingBottom: '60px', textAlign: 'left' },
      is_visible: true
    },
    'contact-hero': {
      type: 'Hero',
      content: { title: 'Contáctanos', subtitle: 'Estamos aquí para asesorarte.', buttonText: '' },
      styles: { backgroundColor: '#064e3b', textColor: '#ffffff', paddingTop: '80px', paddingBottom: '80px', textAlign: 'center', fontSizeTitle: '3rem' },
      is_visible: true
    },
    'contact-form': {
      type: 'Contact',
      content: { title: 'Información de Contacto', email: 'phuelmoseguros@gmail.com', phone: '+598 92 290 092' },
      styles: { backgroundColor: '#f9fafb', textColor: '#1f2937', paddingTop: '60px', paddingBottom: '60px', textAlign: 'left' },
      is_visible: true
    }
  }
};

// Persistencia de datos
let siteData = initialSiteData;

function loadData() {
  if (fs.existsSync(DB_PATH)) {
    try { siteData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8')); } catch (e) { console.error("Error loading DB"); }
  }
}

function saveData() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, JSON.stringify(siteData, null, 2));
}

loadData();

function readSettings() {
  if (!fs.existsSync(SETTINGS_PATH)) {
    return { content: {}, theme: {}, customThemes: {}, updatedAt: null };
  }

  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
  } catch (error) {
    return { content: {}, theme: {}, customThemes: {}, updatedAt: null };
  }
}

function saveSettings(settings) {
  fs.mkdirSync(path.dirname(SETTINGS_PATH), { recursive: true });
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': process.env.ADMIN_ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, PUT, DELETE',
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(data));
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  if (!fs.existsSync(filePath)) {
    sendJson(response, 404, { error: 'Archivo no encontrado.' });
    return;
  }

  response.writeHead(200, {
    'Access-Control-Allow-Origin': process.env.ADMIN_ALLOWED_ORIGIN || '*',
    'Content-Type': contentTypes[extension] || 'application/octet-stream',
    'Cache-Control': 'public, max-age=31536000, immutable',
  });
  fs.createReadStream(filePath).pipe(response);
}

function readBuffer(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let total = 0;

    request.on('data', (chunk) => {
      total += chunk.length;
      if (total > MAX_UPLOAD_BYTES) {
        reject(new Error('Archivo demasiado grande.'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on('end', () => resolve(Buffer.concat(chunks)));
    request.on('error', reject);
  });
}

function parseMultipartUpload(request, bodyBuffer) {
  const contentType = request.headers['content-type'] || '';
  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!boundaryMatch) throw new Error('Falta boundary multipart.');

  const boundary = Buffer.from(`--${boundaryMatch[1] || boundaryMatch[2]}`);
  let searchIndex = 0;

  while (searchIndex < bodyBuffer.length) {
    const partStart = bodyBuffer.indexOf(boundary, searchIndex);
    if (partStart === -1) break;

    const headersStart = partStart + boundary.length + 2;
    const headersEnd = bodyBuffer.indexOf(Buffer.from('\r\n\r\n'), headersStart);
    if (headersEnd === -1) break;

    const headersText = bodyBuffer.slice(headersStart, headersEnd).toString('utf8');
    const isFilePart = /name="file"/i.test(headersText);
    const filenameMatch = headersText.match(/filename="([^"]+)"/i);
    const typeMatch = headersText.match(/content-type:\s*([^\r\n]+)/i);

    const dataStart = headersEnd + 4;
    const nextBoundary = bodyBuffer.indexOf(boundary, dataStart);
    if (nextBoundary === -1) break;

    const dataEnd = Math.max(dataStart, nextBoundary - 2);

    if (isFilePart && filenameMatch) {
      return {
        originalName: filenameMatch[1],
        contentType: (typeMatch?.[1] || '').trim().toLowerCase(),
        buffer: bodyBuffer.slice(dataStart, dataEnd),
      };
    }

    searchIndex = nextBoundary + boundary.length;
  }

  throw new Error('No se encontró archivo.');
}

function publicApiBaseUrl(request) {
  if (process.env.PUBLIC_API_URL) return process.env.PUBLIC_API_URL.replace(/\/$/, '');

  const protocol = request.headers['x-forwarded-proto'] || 'http';
  return `${protocol}://${request.headers.host}`;
}

function extensionFromUpload(upload) {
  const fromName = path.extname(upload.originalName).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(fromName)) return fromName;

  const byType = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp',
    'image/gif': '.gif',
    'image/svg+xml': '.svg',
  };

  return byType[upload.contentType] || '';
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

function sign(value) {
  return crypto
    .createHmac('sha256', ADMIN_SECRET)
    .update(value)
    .digest('hex');
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({
    exp: Date.now() + TOKEN_TTL_MS,
    nonce: crypto.randomBytes(16).toString('hex'),
  })).toString('base64url');

  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || !token.includes('.')) return false;

  const [payload, signature] = token.split('.');
  if (signature !== sign(payload)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Date.now() < data.exp;
  } catch (error) {
    return false;
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 200, {});
    return;
  }

  if (request.url.startsWith('/uploads/') && request.method === 'GET') {
    const requestedFile = decodeURIComponent(request.url.replace('/uploads/', ''));
    const safeFile = path.basename(requestedFile);
    sendFile(response, path.join(UPLOADS_DIR, safeFile));
    return;
  }

  if (request.url === '/api/auth/login' && request.method === 'POST') {
    try {
      const body = await readJson(request);

      if (body.password !== ADMIN_PASSWORD) {
        sendJson(response, 401, { error: 'Contraseña incorrecta.' });
        return;
      }

      sendJson(response, 200, { token: createToken() });
    } catch (error) {
      sendJson(response, 400, { error: 'Solicitud inválida.' });
    }
    return;
  }

  // API Endpoints para el Visual Editor
  // Lista de páginas
  if (request.url === '/api/pages' && request.method === 'GET') {
    sendJson(response, 200, { data: siteData.pages });
    return;
  }

  // Crear nueva página
  if (request.url === '/api/pages' && request.method === 'POST') {
    try {
      const body = await readJson(request);
      const newPage = {
        id: body.title.toLowerCase().replace(/\s+/g, '-'),
        title: body.title,
        slug: body.slug || `/${body.title.toLowerCase()}`,
        description: '',
        sections: []
      };
      siteData.pages.push(newPage);
      saveData();
      sendJson(response, 201, { data: newPage });
    } catch (e) {
      sendJson(response, 400, { error: 'Error al crear página' });
    }
    return;
  }

  // Obtener una página específica
  const pageMatch = request.url.match(/^\/api\/pages\/([^/]+)$/);
  if (pageMatch && request.method === 'GET') {
    const pageId = pageMatch[1];
    const page = siteData.pages.find(p => p.id === pageId);
    
    if (page) {
      sendJson(response, 200, { data: page });
    } else {
      sendJson(response, 404, { error: 'Página no encontrada' });
    }
    return;
  }

  // Actualizar página
  if (pageMatch && request.method === 'PATCH') {
    const pageId = pageMatch[1];
    const body = await readJson(request);
    const pageIndex = siteData.pages.findIndex(p => p.id === pageId);
    if (pageIndex !== -1) {
      siteData.pages[pageIndex] = { ...siteData.pages[pageIndex], ...body };
      saveData();
      sendJson(response, 200, { message: 'Página actualizada' });
    } else {
      sendJson(response, 404, { error: 'Página no encontrada' });
    }
    return;
  }

  // Secciones de una página
  const sectionsMatch = request.url.match(/^\/api\/pages\/([^/]+)\/sections$/);
  if (sectionsMatch && request.method === 'GET') {
    const pageId = sectionsMatch[1];
    const page = siteData.pages.find(p => p.id === pageId);
    
    if (page) {
      const sections = page.sections.map(id => ({ id, ...siteData.sections[id] }));
      sendJson(response, 200, { data: sections });
    } else {
      sendJson(response, 404, { error: 'Página no encontrada' });
    }
    return;
  }

  // Crear sección en una página
  if (sectionsMatch && request.method === 'POST') {
    const pageId = sectionsMatch[1];
    try {
      const body = await readJson(request);
      const sectionId = `${body.type.toLowerCase()}-${Date.now()}`;
      
      const newSection = {
        type: body.type,
        content: { title: 'Nueva Sección', subtitle: 'Edita este contenido' },
        styles: { 
          backgroundColor: body.type === 'Hero' ? '#064e3b' : '#ffffff',
          textColor: body.type === 'Hero' ? '#ffffff' : '#000000',
          paddingTop: '60px',
          paddingBottom: '60px',
          textAlign: 'center'
        },
        is_visible: true
      };

      siteData.sections[sectionId] = newSection;
      const page = siteData.pages.find(p => p.id === pageId);
      if (page) {
        page.sections.push(sectionId);
        saveData();
        sendJson(response, 201, { id: sectionId, ...newSection });
      } else {
        sendJson(response, 404, { error: 'Página no encontrada' });
      }
    } catch (e) {
      sendJson(response, 400, { error: 'Error al añadir sección' });
    }
    return;
  }

  if (request.url.startsWith('/api/sections/') && request.method === 'PATCH') {
    const sectionId = request.url.split('/').pop();
    try {
      const body = await readJson(request);
      if (siteData.sections[sectionId]) {
        siteData.sections[sectionId] = { ...siteData.sections[sectionId], ...body };
        saveData();
        sendJson(response, 200, { message: 'Sección actualizada', data: siteData.sections[sectionId] });
      } else {
        sendJson(response, 404, { error: 'Sección no encontrada' });
      }
    } catch (e) {
      sendJson(response, 400, { error: 'Data inválida' });
    }
    return;
  }

  if (request.url === '/api/auth/me' && request.method === 'GET') {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!verifyToken(token)) {
      sendJson(response, 401, { authenticated: false });
      return;
    }

    sendJson(response, 200, { authenticated: true });
    return;
  }

  if (request.url === '/api/media/upload' && request.method === 'POST') {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!verifyToken(token)) {
      sendJson(response, 401, { error: 'Sesión inválida.' });
      return;
    }

    try {
      const upload = parseMultipartUpload(request, await readBuffer(request));
      const extension = extensionFromUpload(upload);

      if (!ALLOWED_IMAGE_TYPES.has(upload.contentType) || !extension) {
        sendJson(response, 400, { error: 'Formato no permitido. Usá JPG, PNG, WEBP, GIF o SVG.' });
        return;
      }

      fs.mkdirSync(UPLOADS_DIR, { recursive: true });

      const filename = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${extension}`;
      const filePath = path.join(UPLOADS_DIR, filename);
      fs.writeFileSync(filePath, upload.buffer);

      const url = `${publicApiBaseUrl(request)}/uploads/${filename}`;
      sendJson(response, 201, { url, filename });
    } catch (error) {
      sendJson(response, 400, { error: error.message || 'No se pudo subir la imagen.' });
    }
    return;
  }

  if (request.url === '/api/settings' && request.method === 'GET') {
    sendJson(response, 200, readSettings());
    return;
  }

  if (request.url === '/api/settings' && request.method === 'PUT') {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!verifyToken(token)) {
      sendJson(response, 401, { error: 'Sesión inválida.' });
      return;
    }

    try {
      const body = await readJson(request);

      if (!body.content || !body.theme) {
        sendJson(response, 400, { error: 'Faltan datos para guardar.' });
        return;
      }

      const settings = {
        content: body.content,
        theme: body.theme,
        customThemes: body.customThemes || {},
        updatedAt: new Date().toISOString(),
      };

      saveSettings(settings);
      sendJson(response, 200, settings);
    } catch (error) {
      sendJson(response, 400, { error: 'Solicitud inválida.' });
    }
    return;
  }

  sendJson(response, 404, { error: 'No encontrado.' });
});

server.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
