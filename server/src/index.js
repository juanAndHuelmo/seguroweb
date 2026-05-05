require('dotenv').config();

const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const defaultConfig = require('./defaultConfig');

const app = express();
const port = Number(process.env.PORT || 4000);
const jwtSecret = process.env.JWT_SECRET || 'dev-only-change-this-secret';
const clientOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,http://localhost:3001')
  .split(',')
  .map(origin => origin.trim());

const dataDir = path.join(__dirname, '..', 'data');
const uploadsDir = path.join(__dirname, '..', 'uploads');
const configPath = path.join(dataDir, 'config.json');
const adminPath = path.join(dataDir, 'admin.json');

const ensureStorage = async () => {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.mkdir(uploadsDir, { recursive: true });

  try {
    await fs.access(configPath);
  } catch {
    await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
  }
};

const readJson = async (filePath, fallback = null) => {
  try {
    return JSON.parse(await fs.readFile(filePath, 'utf8'));
  } catch {
    return fallback;
  }
};

const writeJson = async (filePath, value) => {
  await fs.writeFile(filePath, JSON.stringify(value, null, 2));
};

const isPlainObject = value => value && typeof value === 'object' && !Array.isArray(value);

const mergeConfig = (base, saved) => {
  if (!isPlainObject(saved)) return base;

  return Object.keys(base).reduce((merged, key) => {
    if (Array.isArray(base[key])) {
      merged[key] = Array.isArray(saved[key]) ? saved[key] : base[key];
      return merged;
    }

    if (isPlainObject(base[key])) {
      merged[key] = mergeConfig(base[key], saved[key]);
      return merged;
    }

    merged[key] = saved[key] ?? base[key];
    return merged;
  }, {});
};

const hashPassword = password => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedValue) => {
  const [salt, storedHash] = String(storedValue || '').split(':');
  if (!salt || !storedHash) return false;

  const hash = crypto.scryptSync(password, salt, 64);
  const storedBuffer = Buffer.from(storedHash, 'hex');
  return storedBuffer.length === hash.length && crypto.timingSafeEqual(storedBuffer, hash);
};

const createToken = () => {
  return jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '8h' });
};

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== 'admin') throw new Error('Invalid role');
    next();
  } catch {
    res.status(401).json({ error: 'No autorizado' });
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    },
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Sólo se permiten imágenes'));
      return;
    }
    cb(null, true);
  },
});

app.use(cors({
  origin(origin, callback) {
    if (!origin || clientOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error('Origen no permitido'));
  },
}));
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/admin/status', async (_req, res) => {
  const admin = await readJson(adminPath);
  res.json({ isSetup: Boolean(admin?.passwordHash) });
});

app.post('/api/auth/setup', async (req, res) => {
  const admin = await readJson(adminPath);
  if (admin?.passwordHash) {
    res.status(409).json({ error: 'El administrador ya fue configurado' });
    return;
  }

  const { password } = req.body;
  if (!password || password.length < 8) {
    res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    return;
  }

  await writeJson(adminPath, { passwordHash: hashPassword(password), createdAt: new Date().toISOString() });
  res.json({ token: createToken() });
});

app.post('/api/auth/login', async (req, res) => {
  const admin = await readJson(adminPath);
  if (!admin?.passwordHash) {
    res.status(409).json({ error: 'Primero configurá el administrador' });
    return;
  }

  if (!verifyPassword(req.body.password, admin.passwordHash)) {
    res.status(401).json({ error: 'Contraseña incorrecta' });
    return;
  }

  res.json({ token: createToken() });
});

app.post('/api/auth/change-password', requireAuth, async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 8) {
    res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
    return;
  }

  await writeJson(adminPath, { passwordHash: hashPassword(password), updatedAt: new Date().toISOString() });
  res.json({ ok: true });
});

app.get('/api/config', async (_req, res) => {
  const saved = await readJson(configPath, defaultConfig);
  res.json(mergeConfig(defaultConfig, saved));
});

app.put('/api/config', requireAuth, async (req, res) => {
  if (!isPlainObject(req.body)) {
    res.status(400).json({ error: 'Configuración inválida' });
    return;
  }

  const nextConfig = mergeConfig(defaultConfig, req.body);
  await writeJson(configPath, nextConfig);
  res.json(nextConfig);
});

app.post('/api/uploads', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No se recibió imagen' });
    return;
  }

  res.json({ url: `/uploads/${req.file.filename}` });
});

app.use((error, _req, res, _next) => {
  res.status(400).json({ error: error.message || 'Error inesperado' });
});

ensureStorage().then(() => {
  app.listen(port, () => {
    console.log(`Backend corriendo en http://localhost:${port}`);
  });
});
