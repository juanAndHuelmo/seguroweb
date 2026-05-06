import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import { useSiteContent } from '../../Hooks/useSiteContent';
import '../../styles/AdminPanel.css';

const MAX_IMAGE_SIZE_MB = 2;
const ADMIN_TOKEN_KEY = 'adminToken';
const ADMIN_API_URL = process.env.REACT_APP_ADMIN_API_URL ||
  (process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '');

const getPreviewUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return process.env.PUBLIC_URL + path;
};

function AdminPanel() {
  const {
    theme,
    updateTheme,
    updateColor,
    resetColors,
    defaultThemes,
    baseThemeKeys,
    saveThemeTemplate,
    deleteThemeTemplate,
  } = useContext(ThemeContext);
  const { content, updateContent, resetContent } = useSiteContent();
  const [activeTab, setActiveTab] = useState('templates');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [imageError, setImageError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [templateName, setTemplateName] = useState('');

  const colorKeys = [
    { key: 'primary', label: 'Color Primario' },
    { key: 'secondary', label: 'Color Secundario' },
    { key: 'accent', label: 'Color de Acento' },
    { key: 'dark', label: 'Texto Oscuro' },
    { key: 'light', label: 'Fondo Claro' },
  ];

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY);

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(`${ADMIN_API_URL}/api/admin/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(response.ok);
        if (!response.ok) localStorage.removeItem(ADMIN_TOKEN_KEY);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(`${ADMIN_API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'No se pudo iniciar sesión.');
        return;
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setPassword('');
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError('No se pudo conectar con el backend.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsAuthenticated(false);
    setPassword('');
    setLoginError('');
  };

  const updateSectionField = (section, field, value) => {
    updateContent(section, {
      ...content[section],
      [field]: value,
    });
  };

  const updateListItem = (section, index, field, value) => {
    const nextItems = content[section].items.map((item, itemIndex) => (
      itemIndex === index ? { ...item, [field]: value } : item
    ));

    updateSectionField(section, 'items', nextItems);
  };

  const updateService = (index, field, value) => {
    const nextServices = content.services.map((service, serviceIndex) => (
      serviceIndex === index ? { ...service, [field]: value } : service
    ));

    updateContent('services', nextServices);
  };

  const addService = () => {
    updateContent('services', [
      ...content.services,
      {
        title: 'Nuevo servicio',
        description: 'Descripción del servicio.',
        icon: '/Images/Logos/vehiculo.jpg',
        imagen: '/Images/fondovehiculo.jpg',
      },
    ]);
  };

  const removeService = (index) => {
    if (content.services.length <= 1) return;
    updateContent('services', content.services.filter((service, serviceIndex) => serviceIndex !== index));
  };

  const updateAboutFeature = (index, field, value) => {
    const nextFeatures = content.about.features.map((feature, featureIndex) => (
      featureIndex === index ? { ...feature, [field]: value } : feature
    ));

    updateSectionField('about', 'features', nextFeatures);
  };

  const updateAboutParagraph = (index, value) => {
    const nextParagraphs = content.about.historyParagraphs.map((paragraph, paragraphIndex) => (
      paragraphIndex === index ? value : paragraph
    ));

    updateSectionField('about', 'historyParagraphs', nextParagraphs);
  };

  const addWhyUsItem = () => {
    updateSectionField('whyUs', 'items', [...content.whyUs.items, 'Nuevo beneficio']);
  };

  const removeWhyUsItem = (index) => {
    updateSectionField('whyUs', 'items', content.whyUs.items.filter((item, itemIndex) => itemIndex !== index));
  };

  const addAboutParagraph = () => {
    updateSectionField('about', 'historyParagraphs', [
      ...content.about.historyParagraphs,
      'Nuevo párrafo de historia.',
    ]);
  };

  const removeAboutParagraph = (index) => {
    updateSectionField(
      'about',
      'historyParagraphs',
      content.about.historyParagraphs.filter((paragraph, paragraphIndex) => paragraphIndex !== index)
    );
  };

  const addAboutFeature = () => {
    updateSectionField('about', 'features', [
      ...content.about.features,
      {
        title: 'Nuevo beneficio',
        description: 'Descripción del beneficio.',
      },
    ]);
  };

  const removeAboutFeature = (index) => {
    updateSectionField(
      'about',
      'features',
      content.about.features.filter((feature, featureIndex) => featureIndex !== index)
    );
  };

  const addBroker = () => {
    updateSectionField('brokers', 'items', [
      ...content.brokers.items,
      {
        name: 'Nueva aseguradora',
        image: '/Images/Logos/Brokers/sura.svg',
      },
    ]);
  };

  const removeBroker = (index) => {
    if (content.brokers.items.length <= 1) return;
    updateSectionField(
      'brokers',
      'items',
      content.brokers.items.filter((broker, brokerIndex) => brokerIndex !== index)
    );
  };

  const readImageFile = (file, onLoad) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError('El archivo debe ser una imagen.');
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
      setImageError(`La imagen debe pesar menos de ${MAX_IMAGE_SIZE_MB} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageError('');
      onLoad(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleServiceImageUpload = (index, field, file) => {
    readImageFile(file, (imageData) => updateService(index, field, imageData));
  };

  const handleBrokerImageUpload = (index, file) => {
    readImageFile(file, (imageData) => updateListItem('brokers', index, 'image', imageData));
  };

  const createTemplateFromCurrentTheme = () => {
    const name = templateName.trim() || 'Plantilla personalizada';
    const templateKey = `custom-${Date.now()}`;

    saveThemeTemplate(templateKey, {
      ...theme,
      name,
    });
    setTemplateName('');
  };

  const updateTemplateColor = (templateKey, colorKey, value) => {
    saveThemeTemplate(templateKey, {
      ...defaultThemes[templateKey],
      [colorKey]: value,
    });
  };

  const updateTemplateName = (templateKey, value) => {
    saveThemeTemplate(templateKey, {
      ...defaultThemes[templateKey],
      name: value,
    });
  };

  const removeTemplate = (templateKey) => {
    deleteThemeTemplate(templateKey);
  };

  return (
    <main className="admin-page">
      <div className="admin-panel admin-panel-page">
        <div className="admin-header">
          <h2>Panel de Administración</h2>
          <a
            className="admin-close-btn"
            href="./"
            aria-label="Volver al sitio"
          >
            ✕
          </a>
        </div>

        {isCheckingAuth ? (
          <div className="admin-login">
            <p className="admin-muted-text">Verificando sesión...</p>
          </div>
        ) : !isAuthenticated ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <label htmlFor="admin-password">Contraseña de administrador</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Ingresá la contraseña"
              autoComplete="current-password"
            />
            {loginError && <p className="admin-login-error">{loginError}</p>}
            <button className="admin-login-btn" type="submit">
              Entrar
            </button>
          </form>
        ) : (
          <>
            <div className="admin-tabs">
              <button
                className={`admin-tab ${activeTab === 'templates' ? 'active' : ''}`}
                onClick={() => setActiveTab('templates')}
              >
                📋 Plantillas
              </button>
              <button
                className={`admin-tab ${activeTab === 'colors' ? 'active' : ''}`}
                onClick={() => setActiveTab('colors')}
              >
                🎨 Colores
              </button>
              <button
                className={`admin-tab ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                ✎ Contenido
              </button>
            </div>

            <div className="admin-content">
              {activeTab === 'templates' && (
                <div className="admin-section">
                  <h3>Selecciona una plantilla</h3>
                  <div className="templates-grid">
                    {Object.entries(defaultThemes).map(([key, templateTheme]) => (
                      <div
                        key={key}
                        className={`template-card ${
                          theme.primary === templateTheme.primary ? 'active' : ''
                        }`}
                        onClick={() => updateTheme(templateTheme)}
                      >
                        <div className="template-preview">
                          <div
                            className="color-square-primary"
                            style={{ backgroundColor: templateTheme.primary }}
                          />
                          <div
                            className="color-square-secondary"
                            style={{ backgroundColor: templateTheme.secondary }}
                          />
                        </div>
                        <p>{templateTheme.name}</p>
                      </div>
                    ))}
                  </div>

                  <div className="admin-editor-block">
                    <h4>Crear plantilla</h4>
                    <label>Nombre</label>
                    <input
                      value={templateName}
                      onChange={(event) => setTemplateName(event.target.value)}
                      placeholder="Ej: Institucional verano"
                    />
                    <button
                      type="button"
                      className="admin-add-btn"
                      onClick={createTemplateFromCurrentTheme}
                    >
                      + Guardar colores actuales como plantilla
                    </button>
                  </div>

                  <div className="admin-editor-block">
                    <h4>Editar plantillas personalizadas</h4>
                    {Object.entries(defaultThemes)
                      .filter(([templateKey]) => !baseThemeKeys.includes(templateKey))
                      .map(([templateKey, templateTheme]) => (
                        <div className="admin-editor-card" key={templateKey}>
                          <div className="admin-editor-card-header">
                            <strong>{templateTheme.name}</strong>
                            <button
                              type="button"
                              className="admin-small-danger"
                              onClick={() => removeTemplate(templateKey)}
                            >
                              Quitar
                            </button>
                          </div>

                          <label>Nombre</label>
                          <input
                            value={templateTheme.name}
                            onChange={(event) => updateTemplateName(templateKey, event.target.value)}
                          />

                          <div className="colors-grid">
                            {colorKeys.map(({ key: colorKey, label }) => (
                              <div key={colorKey} className="color-input-group">
                                <label>{label}</label>
                                <div className="color-input-wrapper">
                                  <input
                                    type="color"
                                    value={templateTheme[colorKey]}
                                    onChange={(event) => {
                                      updateTemplateColor(templateKey, colorKey, event.target.value);
                                    }}
                                    className="color-input"
                                  />
                                  <span className="color-value">{templateTheme[colorKey]}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="admin-add-btn"
                            onClick={() => updateTheme(templateTheme)}
                          >
                            Aplicar cambios
                          </button>
                        </div>
                      ))}

                    {Object.entries(defaultThemes).every(([templateKey]) => (
                      baseThemeKeys.includes(templateKey)
                    )) && (
                      <p className="admin-muted-text">
                        Todavía no hay plantillas personalizadas.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'colors' && (
                <div className="admin-section">
                  <h3>Personaliza los colores</h3>
                  <div className="colors-grid">
                    {colorKeys.map(({ key, label }) => (
                      <div key={key} className="color-input-group">
                        <label>{label}</label>
                        <div className="color-input-wrapper">
                          <input
                            type="color"
                            value={theme[key]}
                            onChange={(event) => updateColor(key, event.target.value)}
                            className="color-input"
                          />
                          <span className="color-value">{theme[key]}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="btn-reset" onClick={resetColors}>
                    ↻ Restaurar colores predeterminados
                  </button>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="admin-section admin-content-editor">
                  <h3>Editar contenido de la web</h3>
                  {imageError && <p className="admin-login-error">{imageError}</p>}

                  <div className="admin-editor-block">
                    <h4>Servicios</h4>
                    {content.services.map((service, index) => (
                      <div className="admin-editor-card" key={index}>
                        <div className="admin-editor-card-header">
                          <strong>Servicio {index + 1}</strong>
                          <button
                            type="button"
                            className="admin-small-danger"
                            onClick={() => removeService(index)}
                            disabled={content.services.length <= 1}
                          >
                            Quitar
                          </button>
                        </div>
                        <label>Título</label>
                        <input
                          value={service.title}
                          onChange={(event) => updateService(index, 'title', event.target.value)}
                        />
                        <label>Descripción</label>
                        <textarea
                          value={service.description}
                          onChange={(event) => updateService(index, 'description', event.target.value)}
                        />
                        <label>Icono</label>
                        {service.icon && (
                          <div className="admin-image-preview admin-image-preview-small">
                            <img src={getPreviewUrl(service.icon)} alt={`Icono de ${service.title}`} />
                          </div>
                        )}
                        <input
                          value={service.icon}
                          onChange={(event) => updateService(index, 'icon', event.target.value)}
                        />
                        <label>Subir icono</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleServiceImageUpload(index, 'icon', event.target.files[0])}
                        />
                        <label>Imagen de fondo</label>
                        {service.imagen && (
                          <div className="admin-image-preview admin-image-preview-wide">
                            <img src={getPreviewUrl(service.imagen)} alt={`Fondo de ${service.title}`} />
                          </div>
                        )}
                        <input
                          value={service.imagen}
                          onChange={(event) => updateService(index, 'imagen', event.target.value)}
                        />
                        <label>Subir imagen de fondo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleServiceImageUpload(index, 'imagen', event.target.files[0])}
                        />
                      </div>
                    ))}
                    <button type="button" className="admin-add-btn" onClick={addService}>
                      + Agregar servicio
                    </button>
                  </div>

                  <div className="admin-editor-block">
                    <h4>Por qué elegirnos</h4>
                    <label>Título</label>
                    <input
                      value={content.whyUs.title}
                      onChange={(event) => updateSectionField('whyUs', 'title', event.target.value)}
                    />
                    {content.whyUs.items.map((item, index) => (
                      <div className="admin-inline-field" key={index}>
                        <div className="admin-editor-card-header">
                          <label>Ítem {index + 1}</label>
                          <button
                            type="button"
                            className="admin-small-danger"
                            onClick={() => removeWhyUsItem(index)}
                          >
                            Quitar
                          </button>
                        </div>
                        <input
                          value={item}
                          onChange={(event) => {
                            const nextItems = content.whyUs.items.map((whyItem, whyIndex) => (
                              whyIndex === index ? event.target.value : whyItem
                            ));
                            updateSectionField('whyUs', 'items', nextItems);
                          }}
                        />
                      </div>
                    ))}
                    <button type="button" className="admin-add-btn" onClick={addWhyUsItem}>
                      + Agregar ítem
                    </button>
                  </div>

                  <div className="admin-editor-block">
                    <h4>Nosotros</h4>
                    <label>Título</label>
                    <input
                      value={content.about.title}
                      onChange={(event) => updateSectionField('about', 'title', event.target.value)}
                    />
                    <label>Subtítulo</label>
                    <textarea
                      value={content.about.subtitle}
                      onChange={(event) => updateSectionField('about', 'subtitle', event.target.value)}
                    />
                    <label>Título de historia</label>
                    <input
                      value={content.about.historyTitle}
                      onChange={(event) => updateSectionField('about', 'historyTitle', event.target.value)}
                    />
                    {content.about.historyParagraphs.map((paragraph, index) => (
                      <div className="admin-inline-field" key={index}>
                        <div className="admin-editor-card-header">
                          <label>Párrafo {index + 1}</label>
                          <button
                            type="button"
                            className="admin-small-danger"
                            onClick={() => removeAboutParagraph(index)}
                          >
                            Quitar
                          </button>
                        </div>
                        <textarea
                          value={paragraph}
                          onChange={(event) => updateAboutParagraph(index, event.target.value)}
                        />
                      </div>
                    ))}
                    <button type="button" className="admin-add-btn" onClick={addAboutParagraph}>
                      + Agregar párrafo
                    </button>
                    {content.about.features.map((feature, index) => (
                      <div className="admin-editor-card" key={index}>
                        <div className="admin-editor-card-header">
                          <strong>Beneficio {index + 1}</strong>
                          <button
                            type="button"
                            className="admin-small-danger"
                            onClick={() => removeAboutFeature(index)}
                          >
                            Quitar
                          </button>
                        </div>
                        <label>Título</label>
                        <input
                          value={feature.title}
                          onChange={(event) => updateAboutFeature(index, 'title', event.target.value)}
                        />
                        <textarea
                          value={feature.description}
                          onChange={(event) => updateAboutFeature(index, 'description', event.target.value)}
                        />
                      </div>
                    ))}
                    <button type="button" className="admin-add-btn" onClick={addAboutFeature}>
                      + Agregar beneficio
                    </button>
                    <label>Texto del botón</label>
                    <input
                      value={content.about.ctaText}
                      onChange={(event) => updateSectionField('about', 'ctaText', event.target.value)}
                    />
                  </div>

                  <div className="admin-editor-block">
                    <h4>Aseguradoras</h4>
                    <label>Título</label>
                    <input
                      value={content.brokers.title}
                      onChange={(event) => updateSectionField('brokers', 'title', event.target.value)}
                    />
                    <label>Subtítulo</label>
                    <textarea
                      value={content.brokers.subtitle}
                      onChange={(event) => updateSectionField('brokers', 'subtitle', event.target.value)}
                    />
                    {content.brokers.items.map((broker, index) => (
                      <div className="admin-editor-card" key={index}>
                        <div className="admin-editor-card-header">
                          <strong>Aseguradora {index + 1}</strong>
                          <button
                            type="button"
                            className="admin-small-danger"
                            onClick={() => removeBroker(index)}
                            disabled={content.brokers.items.length <= 1}
                          >
                            Quitar
                          </button>
                        </div>
                        <label>Nombre</label>
                        <input
                          value={broker.name}
                          onChange={(event) => updateListItem('brokers', index, 'name', event.target.value)}
                        />
                        <label>Logo</label>
                        {broker.image && (
                          <div className="admin-image-preview admin-image-preview-logo">
                            <img src={getPreviewUrl(broker.image)} alt={`Logo de ${broker.name}`} />
                          </div>
                        )}
                        <input
                          value={broker.image}
                          onChange={(event) => updateListItem('brokers', index, 'image', event.target.value)}
                        />
                        <label>Subir logo</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => handleBrokerImageUpload(index, event.target.files[0])}
                        />
                      </div>
                    ))}
                    <button type="button" className="admin-add-btn" onClick={addBroker}>
                      + Agregar aseguradora
                    </button>
                  </div>

                  <div className="admin-editor-block">
                    <h4>Contacto y footer</h4>
                    <label>Email</label>
                    <input
                      value={content.footer.email}
                      onChange={(event) => updateSectionField('footer', 'email', event.target.value)}
                    />
                    <label>Teléfono</label>
                    <input
                      value={content.footer.phone}
                      onChange={(event) => updateSectionField('footer', 'phone', event.target.value)}
                    />
                    <label>Horario</label>
                    <input
                      value={content.footer.schedule}
                      onChange={(event) => updateSectionField('footer', 'schedule', event.target.value)}
                    />
                    <label>Sobre nosotros</label>
                    <textarea
                      value={content.footer.about}
                      onChange={(event) => updateSectionField('footer', 'about', event.target.value)}
                    />
                    <label>Instagram</label>
                    <input
                      value={content.footer.instagram}
                      onChange={(event) => updateSectionField('footer', 'instagram', event.target.value)}
                    />
                    <label>Facebook</label>
                    <input
                      value={content.footer.facebook}
                      onChange={(event) => updateSectionField('footer', 'facebook', event.target.value)}
                    />
                    <label>LinkedIn</label>
                    <input
                      value={content.footer.linkedin}
                      onChange={(event) => updateSectionField('footer', 'linkedin', event.target.value)}
                    />
                  </div>

                  <div className="admin-editor-block">
                    <h4>WhatsApp</h4>
                    <label>Número</label>
                    <input
                      value={content.whatsapp.phone}
                      onChange={(event) => updateSectionField('whatsapp', 'phone', event.target.value)}
                    />
                    <label>Mensaje</label>
                    <textarea
                      value={content.whatsapp.message}
                      onChange={(event) => updateSectionField('whatsapp', 'message', event.target.value)}
                    />
                  </div>

                  <button className="btn-reset" onClick={resetContent}>
                    ↻ Restaurar contenido predeterminado
                  </button>
                </div>
              )}
            </div>

            <div className="admin-preview">
              <h4>Vista previa</h4>
              <div className="preview-buttons">
                <button
                  className="preview-primary"
                  style={{
                    background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                  }}
                >
                  Botón Primario
                </button>
                <button
                  className="preview-secondary"
                  style={{
                    background: theme.accent,
                    color: theme.dark,
                  }}
                >
                  Acento
                </button>
              </div>
            </div>

            <button className="admin-logout-btn" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default AdminPanel;
