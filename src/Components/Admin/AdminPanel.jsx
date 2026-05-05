import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { useAppConfig } from '../../Context/AppConfigContext';
import { API_BASE_URL, getAssetUrl } from '../../Config/api';
import '../../styles/AdminPanel.css';

const TOKEN_KEY = 'adminToken';

const listToText = list => (list || []).join('\n');
const textToList = text => text.split('\n').map(item => item.trim()).filter(Boolean);

function AdminPanel() {
  const { theme, updateTheme, updateColor, resetColors, defaultThemes } = useContext(ThemeContext);
  const { config, updateConfig, resetConfig, defaultConfig, apiStatus } = useAppConfig();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [configDraft, setConfigDraft] = useState(() => JSON.stringify(config, null, 2));
  const [configError, setConfigError] = useState('');
  const [authValue, setAuthValue] = useState('');
  const [authError, setAuthError] = useState('');
  const [adminStatus, setAdminStatus] = useState({ isSetup: true, loading: true });
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem(TOKEN_KEY)));

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/status`)
      .then(response => response.json())
      .then(status => setAdminStatus({ ...status, loading: false }))
      .catch(() => setAdminStatus({ isSetup: true, loading: false, offline: true }));
  }, []);

  const colorKeys = [
    { key: 'primary', label: 'Color Primario' },
    { key: 'secondary', label: 'Color Secundario' },
    { key: 'accent', label: 'Color de Acento' },
    { key: 'dark', label: 'Texto Oscuro' },
    { key: 'light', label: 'Fondo Claro' },
  ];

  const savePartialConfig = async nextConfig => {
    try {
      await updateConfig(nextConfig, token);
    } catch (error) {
      alert(error.message);
    }
    setConfigDraft(JSON.stringify(nextConfig, null, 2));
  };

  const updatePath = (path, value) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(config));
    let target = next;
    keys.slice(0, -1).forEach(key => {
      target = target[key];
    });
    target[keys[keys.length - 1]] = value;
    savePartialConfig(next);
  };

  const updateListItem = (path, index, field, value) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(config));
    let list = next;
    keys.forEach(key => {
      list = list[key];
    });
    list[index] = { ...list[index], [field]: value };
    savePartialConfig(next);
  };

  const addListItem = (path, item) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(config));
    let list = next;
    keys.forEach(key => {
      list = list[key];
    });
    list.push(item);
    savePartialConfig(next);
  };

  const removeListItem = (path, index) => {
    const keys = path.split('.');
    const next = JSON.parse(JSON.stringify(config));
    let list = next;
    keys.forEach(key => {
      list = list[key];
    });
    list.splice(index, 1);
    savePartialConfig(next);
  };

  const uploadToServer = async file => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Seleccioná una imagen válida.');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert('La imagen es muy grande. Usá una imagen menor a 3 MB.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/api/uploads`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || 'No se pudo subir la imagen');
    }

    const body = await response.json();
    return body.url;
  };

  const uploadImage = async (path, file) => {
    try {
      const url = await uploadToServer(file);
      if (url) updatePath(path, url);
    } catch (error) {
      alert(error.message);
    }
  };

  const uploadListImage = async (path, index, field, file) => {
    try {
      const url = await uploadToServer(file);
      if (url) updateListItem(path, index, field, url);
    } catch (error) {
      alert(error.message);
    }
  };

  const saveConfigDraft = async () => {
    try {
      const parsed = JSON.parse(configDraft);
      await updateConfig(parsed, token);
      setConfigError('');
      alert('Configuración guardada');
    } catch (error) {
      setConfigError(error.message || 'El JSON no es válido. Revisá comas, llaves y comillas.');
    }
  };

  const restoreConfig = async () => {
    if (!window.confirm('Esto restaura todos los datos originales. ¿Continuar?')) return;
    try {
      await resetConfig(token);
    } catch (error) {
      alert(error.message);
    }
    setConfigDraft(JSON.stringify(defaultConfig, null, 2));
    setConfigError('');
  };

  const handleAuthSubmit = async event => {
    event.preventDefault();
    if (authValue.length < 8) {
      setAuthError('Usá al menos 8 caracteres.');
      return;
    }

    try {
      const endpoint = adminStatus.isSetup ? '/api/auth/login' : '/api/auth/setup';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: authValue }),
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'No se pudo ingresar');

      localStorage.setItem(TOKEN_KEY, body.token);
      setToken(body.token);
      setIsAuthenticated(true);
      setAdminStatus({ isSetup: true, loading: false });
      setAuthValue('');
      setAuthError('');
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setIsAuthenticated(false);
  };

  const resetPassword = async () => {
    const password = window.prompt('Nueva contraseña de administrador (mínimo 8 caracteres)');
    if (!password) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'No se pudo cambiar la contraseña');
      alert('Contraseña actualizada');
    } catch (error) {
      alert(error.message);
    }
  };

  const renderTextInput = (label, path, value, type = 'text') => (
    <label className="admin-field">
      <span>{label}</span>
      <input type={type} value={value || ''} onChange={event => updatePath(path, event.target.value)} />
    </label>
  );

  const renderTextarea = (label, path, value, rows = 4) => (
    <label className="admin-field">
      <span>{label}</span>
      <textarea rows={rows} value={value || ''} onChange={event => updatePath(path, event.target.value)} />
    </label>
  );

  const renderImageInput = (label, path, value) => (
    <div className="admin-field">
      <span>{label}</span>
      {value && <img className="image-preview" src={getAssetUrl(value)} alt="" />}
      <input type="file" accept="image/*" onChange={event => uploadImage(path, event.target.files[0])} />
      <input type="text" value={value || ''} onChange={event => updatePath(path, event.target.value)} placeholder="O pegá una URL de imagen" />
    </div>
  );

  const renderAuth = () => (
    <form className="admin-login" onSubmit={handleAuthSubmit}>
      <h3>{adminStatus.isSetup ? 'Acceso de administrador' : 'Crear contraseña de administrador'}</h3>
      <p>
        {adminStatus.isSetup
          ? 'Ingresá la contraseña para editar el sitio.'
          : 'Primera configuración: creá una contraseña para proteger el panel.'}
      </p>
      {adminStatus.offline && <p className="config-error">No se pudo conectar con el backend. Revisá que esté corriendo.</p>}
      <input
        type="password"
        value={authValue}
        onChange={event => setAuthValue(event.target.value)}
        placeholder="Contraseña"
        autoFocus
      />
      {authError && <p className="config-error">{authError}</p>}
      <button className="btn-save" type="submit">{adminStatus.isSetup ? 'Entrar' : 'Crear contraseña'}</button>
      <small>La sesión usa token seguro del backend. No compartas la contraseña.</small>
    </form>
  );

  const renderGeneral = () => (
    <div className="admin-section">
      <h3>Datos generales</h3>
      {renderTextInput('Nombre de la marca', 'brand.name', config.brand.name)}
      {renderImageInput('Logo', 'brand.logo', config.brand.logo)}
      {renderTextInput('WhatsApp', 'whatsapp.phone', config.whatsapp.phone)}
      {renderTextarea('Mensaje de WhatsApp', 'whatsapp.message', config.whatsapp.message, 3)}
      <h4>Menú</h4>
      {config.nav.map((item, index) => (
        <div className="admin-card" key={item.id}>
          <label className="admin-field">
            <span>Texto</span>
            <input value={item.label} onChange={event => updateListItem('nav', index, 'label', event.target.value)} />
          </label>
        </div>
      ))}
    </div>
  );

  const renderServices = () => (
    <div className="admin-section">
      <h3>Servicios</h3>
      {renderTextInput('Texto del botón', 'services.ctaLabel', config.services.ctaLabel)}
      {config.services.items.map((service, index) => (
        <div className="admin-card" key={index}>
          <div className="card-title-row">
            <h4>{service.title || `Servicio ${index + 1}`}</h4>
            <button className="btn-danger" onClick={() => removeListItem('services.items', index)}>Eliminar</button>
          </div>
          <label className="admin-field">
            <span>Título</span>
            <input value={service.title} onChange={event => updateListItem('services.items', index, 'title', event.target.value)} />
          </label>
          <label className="admin-field">
            <span>Descripción</span>
            <textarea rows="3" value={service.description} onChange={event => updateListItem('services.items', index, 'description', event.target.value)} />
          </label>
          <div className="admin-field">
            <span>Ícono</span>
            {service.icon && <img className="image-preview" src={getAssetUrl(service.icon)} alt="" />}
            <input type="file" accept="image/*" onChange={event => uploadListImage('services.items', index, 'icon', event.target.files[0])} />
            <input value={service.icon} onChange={event => updateListItem('services.items', index, 'icon', event.target.value)} placeholder="URL del ícono" />
          </div>
          <div className="admin-field">
            <span>Imagen de fondo</span>
            {service.image && <img className="image-preview wide" src={getAssetUrl(service.image)} alt="" />}
            <input type="file" accept="image/*" onChange={event => uploadListImage('services.items', index, 'image', event.target.files[0])} />
            <input value={service.image} onChange={event => updateListItem('services.items', index, 'image', event.target.value)} placeholder="URL de imagen" />
          </div>
        </div>
      ))}
      <button className="btn-save" onClick={() => addListItem('services.items', { title: 'Nuevo servicio', icon: '', image: '', description: '' })}>
        Agregar servicio
      </button>
    </div>
  );

  const renderBrokers = () => (
    <div className="admin-section">
      <h3>Aseguradoras</h3>
      {renderTextInput('Título', 'brokers.title', config.brokers.title)}
      {renderTextarea('Subtítulo', 'brokers.subtitle', config.brokers.subtitle, 3)}
      {config.brokers.items.map((broker, index) => (
        <div className="admin-card" key={index}>
          <div className="card-title-row">
            <h4>{broker.name || `Aseguradora ${index + 1}`}</h4>
            <button className="btn-danger" onClick={() => removeListItem('brokers.items', index)}>Eliminar</button>
          </div>
          <label className="admin-field">
            <span>Nombre</span>
            <input value={broker.name} onChange={event => updateListItem('brokers.items', index, 'name', event.target.value)} />
          </label>
          <div className="admin-field">
            <span>Logo</span>
            {broker.image && <img className="image-preview" src={getAssetUrl(broker.image)} alt="" />}
            <input type="file" accept="image/*" onChange={event => uploadListImage('brokers.items', index, 'image', event.target.files[0])} />
            <input value={broker.image} onChange={event => updateListItem('brokers.items', index, 'image', event.target.value)} placeholder="URL del logo" />
          </div>
        </div>
      ))}
      <button className="btn-save" onClick={() => addListItem('brokers.items', { name: 'Nueva aseguradora', image: '' })}>
        Agregar aseguradora
      </button>
    </div>
  );

  const renderAbout = () => (
    <div className="admin-section">
      <h3>Nosotros</h3>
      {renderTextInput('Título', 'about.title', config.about.title)}
      {renderTextarea('Subtítulo', 'about.subtitle', config.about.subtitle, 3)}
      {renderTextInput('Título de historia', 'about.historyTitle', config.about.historyTitle)}
      <label className="admin-field">
        <span>Párrafos de historia</span>
        <textarea rows="6" value={listToText(config.about.paragraphs)} onChange={event => updatePath('about.paragraphs', textToList(event.target.value))} />
      </label>
      {renderTextInput('Botón', 'about.ctaLabel', config.about.ctaLabel)}
      <h4>Tarjetas</h4>
      {config.about.features.map((feature, index) => (
        <div className="admin-card" key={index}>
          <label className="admin-field">
            <span>Título</span>
            <input value={feature.title} onChange={event => updateListItem('about.features', index, 'title', event.target.value)} />
          </label>
          <label className="admin-field">
            <span>Descripción</span>
            <textarea rows="3" value={feature.description} onChange={event => updateListItem('about.features', index, 'description', event.target.value)} />
          </label>
        </div>
      ))}
    </div>
  );

  const renderFooter = () => (
    <div className="admin-section">
      <h3>Footer y contacto</h3>
      {renderTextInput('Email', 'footer.email', config.footer.email, 'email')}
      {renderTextInput('Teléfono', 'footer.phone', config.footer.phone)}
      {renderTextInput('Horario', 'footer.hours', config.footer.hours)}
      {renderTextarea('Sobre nosotros', 'footer.aboutText', config.footer.aboutText, 4)}
      {renderTextInput('Instagram', 'footer.socials.instagram', config.footer.socials.instagram)}
      {renderTextInput('Facebook', 'footer.socials.facebook', config.footer.socials.facebook)}
      {renderTextInput('LinkedIn', 'footer.socials.linkedin', config.footer.socials.linkedin)}
    </div>
  );

  const renderForms = () => (
    <div className="admin-section">
      <h3>Formularios</h3>
      <h4>Cotización</h4>
      <label className="admin-field">
        <span>Departamentos</span>
        <textarea rows="7" value={listToText(config.quotation.departments)} onChange={event => updatePath('quotation.departments', textToList(event.target.value))} />
      </label>
      <label className="admin-field">
        <span>Coberturas de vehículos</span>
        <textarea rows="4" value={listToText(config.quotation.vehicleCoverages)} onChange={event => updatePath('quotation.vehicleCoverages', textToList(event.target.value))} />
      </label>
      <label className="admin-field">
        <span>Coberturas de hogar</span>
        <textarea rows="4" value={listToText(config.quotation.homeCoverages)} onChange={event => updatePath('quotation.homeCoverages', textToList(event.target.value))} />
      </label>
      <label className="admin-field">
        <span>Capitales de vida</span>
        <textarea rows="4" value={listToText(config.quotation.lifeCoverageOptions)} onChange={event => updatePath('quotation.lifeCoverageOptions', textToList(event.target.value))} />
      </label>
      <h4>Contacto</h4>
      {renderTextInput('Título', 'contact.title', config.contact.title)}
      {renderTextarea('Subtítulo', 'contact.subtitle', config.contact.subtitle, 3)}
      {renderTextInput('Botón', 'contact.submitLabel', config.contact.submitLabel)}
    </div>
  );

  const renderAdvanced = () => (
    <div className="admin-section">
      <h3>Avanzado</h3>
      <p className="admin-help">Usalo sólo si necesitás tocar un dato que no aparece en los formularios simples.</p>
      <textarea
        className="config-editor"
        value={configDraft}
        onChange={(e) => setConfigDraft(e.target.value)}
        spellCheck="false"
      />
      {configError && <p className="config-error">{configError}</p>}
      <div className="admin-actions">
        <button className="btn-save" onClick={saveConfigDraft}>Guardar JSON</button>
        <button className="btn-reset" onClick={restoreConfig}>Restaurar datos originales</button>
      </div>
    </div>
  );

  const contentByTab = {
    general: renderGeneral,
    services: renderServices,
    brokers: renderBrokers,
    about: renderAbout,
    footer: renderFooter,
    forms: renderForms,
    templates: () => (
      <div className="admin-section">
        <h3>Selecciona una plantilla</h3>
        <div className="templates-grid">
          {Object.entries(defaultThemes).map(([key, templateTheme]) => (
            <div
              key={key}
              className={`template-card ${theme.primary === templateTheme.primary ? 'active' : ''}`}
              onClick={() => updateTheme(templateTheme)}
            >
              <div className="template-preview">
                <div className="color-square-primary" style={{ backgroundColor: templateTheme.primary }} />
                <div className="color-square-secondary" style={{ backgroundColor: templateTheme.secondary }} />
              </div>
              <p>{templateTheme.name}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    colors: () => (
      <div className="admin-section">
        <h3>Personaliza los colores</h3>
        <div className="colors-grid">
          {colorKeys.map(({ key, label }) => (
            <div key={key} className="color-input-group">
              <label>{label}</label>
              <div className="color-input-wrapper">
                <input type="color" value={theme[key]} onChange={(e) => updateColor(key, e.target.value)} className="color-input" />
                <span className="color-value">{theme[key]}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="btn-reset" onClick={resetColors}>Restaurar colores predeterminados</button>
      </div>
    ),
    security: () => (
      <div className="admin-section">
        <h3>Seguridad</h3>
        <p className="admin-help">La sesión usa un token del backend y vence automáticamente. Estado del backend: {apiStatus}.</p>
        <div className="admin-actions">
          <button className="btn-reset" onClick={logout}>Cerrar sesión</button>
          <button className="btn-danger wide" onClick={resetPassword}>Crear nueva contraseña</button>
        </div>
      </div>
    ),
    advanced: renderAdvanced,
  };

  const tabs = [
    ['general', 'General'],
    ['services', 'Servicios'],
    ['brokers', 'Aseguradoras'],
    ['about', 'Nosotros'],
    ['footer', 'Footer'],
    ['forms', 'Formularios'],
    ['templates', 'Plantillas'],
    ['colors', 'Colores'],
    ['security', 'Seguridad'],
    ['advanced', 'Avanzado'],
  ];

  return (
    <>
      <button
        className="admin-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Abrir panel de administración"
        aria-label="Panel de administración"
      >
        ⚙
      </button>

      {isOpen && (
        <div className="admin-panel">
          <div className="admin-header">
            <h2>Panel de Administración</h2>
            <button className="admin-close-btn" onClick={() => setIsOpen(false)} aria-label="Cerrar panel">x</button>
          </div>

          {!isAuthenticated ? (
            <div className="admin-content">{renderAuth()}</div>
          ) : (
            <>
              <div className="admin-tabs">
                {tabs.map(([id, label]) => (
                  <button
                    key={id}
                    className={`admin-tab ${activeTab === id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(id);
                      if (id === 'advanced') setConfigDraft(JSON.stringify(config, null, 2));
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="admin-content">
                {contentByTab[activeTab]()}
              </div>

              <div className="admin-preview">
                <h4>Vista previa</h4>
                <div className="preview-buttons">
                  <button className="preview-primary" style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}>
                    Botón Primario
                  </button>
                  <button className="preview-secondary" style={{ background: theme.accent, color: theme.dark }}>
                    Acento
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {isOpen && <div className="admin-overlay" onClick={() => setIsOpen(false)} aria-label="Cerrar panel" />}
    </>
  );
}

export default AdminPanel;
