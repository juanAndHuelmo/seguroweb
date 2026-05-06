const crypto = require('crypto');
const http = require('http');

const PORT = Number(process.env.PORT || process.env.ADMIN_BACKEND_PORT || 4000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'change-this-secret';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 8;

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': process.env.ADMIN_ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  });
  response.end(JSON.stringify(data));
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

  if (request.url === '/api/admin/login' && request.method === 'POST') {
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

  if (request.url === '/api/admin/verify' && request.method === 'GET') {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!verifyToken(token)) {
      sendJson(response, 401, { authenticated: false });
      return;
    }

    sendJson(response, 200, { authenticated: true });
    return;
  }

  sendJson(response, 404, { error: 'No encontrado.' });
});

server.listen(PORT, () => {
  console.log(`Admin backend running on http://localhost:${PORT}`);
});
