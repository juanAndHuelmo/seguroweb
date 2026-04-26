import { useContext, useState } from 'react';
import { ThemeContext } from '../../Context/ThemeContext';
import '../../styles/AdminPanel.css';
function AdminPanel() {
  const { theme, updateTheme, updateColor, resetColors, defaultThemes } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('templates');

  const colorKeys = [
    { key: 'primary', label: 'Color Primario' },
    { key: 'secondary', label: 'Color Secundario' },
    { key: 'accent', label: 'Color de Acento' },
    { key: 'dark', label: 'Texto Oscuro' },
    { key: 'light', label: 'Fondo Claro' },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="admin-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Abrir panel de administración"
        aria-label="Panel de administración"
      >
        ⚙️
      </button>

      {/* Admin Panel */}
      {isOpen && (
        <div className="admin-panel">
          <div className="admin-header">
            <h2>Panel de Administración</h2>
            <button
              className="admin-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar panel"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
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
          </div>

          {/* Tab Content */}
          <div className="admin-content">
            {/* Templates Tab */}
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
              </div>
            )}

            {/* Colors Tab */}
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
                          onChange={(e) => updateColor(key, e.target.value)}
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
          </div>

          {/* Preview */}
          <div className="admin-preview">
            <h4>Vista previa</h4>
            <div className="preview-buttons">
              <button
                className="preview-primary"
                style={{
                  background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`
                }}
              >
                Botón Primario
              </button>
              <button
                className="preview-secondary"
                style={{ 
                  background: theme.accent,
                  color: theme.dark 
                }}
              >
                Acento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="admin-overlay"
          onClick={() => setIsOpen(false)}
          aria-label="Cerrar panel"
        />
      )}
    </>
  );
}

export default AdminPanel;
