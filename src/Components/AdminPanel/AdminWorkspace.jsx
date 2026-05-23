import { useContext, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../Context/ThemeContext';
import { useSiteContent } from '../../Hooks/useSiteContent';
import { ADMIN_TOKEN_KEY, getApiUrl } from '../../config/adminApi';
import NavBar from '../Layout/NavBar';
import Home from '../Pages/Home';
import About from '../Pages/About';
import Brokers from '../Pages/Brokers';
import Contact from '../Forms/Contact';
import Footer from '../Layout/Footer';
import WhatsAppButton from '../Layout/WhatsAppButton';

const Shell = styled.main`
  height: 100vh;
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr) 390px;
  background: #eef2f7;
  color: #111827;
  overflow: hidden;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    height: auto;
    min-height: 100vh;
  }
`;

const Sidebar = styled.aside`
  background: #111827;
  color: #fff;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  overflow-y: auto;

  @media (max-width: 1100px) {
    position: sticky;
    top: 0;
    z-index: 20;
  }
`;

const Brand = styled.div`
  display: grid;
  gap: 4px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  strong {
    font-size: 1rem;
  }

  span {
    color: #9ca3af;
    font-size: 0.82rem;
  }
`;

const Nav = styled.nav`
  display: grid;
  gap: 7px;
`;

const NavButton = styled.button`
  width: 100%;
  border: 1px solid ${props => (props.$active ? 'rgba(255,255,255,0.22)' : 'transparent')};
  border-radius: 7px;
  background: ${props => (props.$active ? 'rgba(255,255,255,0.12)' : 'transparent')};
  color: #fff;
  cursor: pointer;
  padding: 11px 10px;
  text-align: left;
  font-weight: 800;

  small {
    display: block;
    margin-top: 3px;
    color: #9ca3af;
    font-weight: 600;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.09);
  }
`;

const CanvasColumn = styled.section`
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Topbar = styled.div`
  min-height: 66px;
  padding: 12px 18px;
  border-bottom: 1px solid #dbe3ef;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

const Segmented = styled.div`
  display: inline-flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid #d1d5db;
  border-radius: 999px;
  background: #f9fafb;
`;

const Segment = styled.button`
  border: none;
  border-radius: 999px;
  background: ${props => (props.$active ? '#111827' : 'transparent')};
  color: ${props => (props.$active ? '#fff' : '#374151')};
  cursor: pointer;
  font-weight: 800;
  padding: 8px 12px;
`;

const PreviewWrap = styled.div`
  flex: 1;
  overflow: auto;
  padding: 24px;
  display: flex;
  justify-content: center;
`;

const Browser = styled.div`
  width: ${props => (props.$mode === 'mobile' ? '390px' : '100%')};
  max-width: ${props => (props.$mode === 'mobile' ? '390px' : '1180px')};
  min-height: calc(100vh - 118px);
  background: var(--color-light);
  border: 1px solid #d1d5db;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.18);
`;

const BrowserBar = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;

  span {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: #d1d5db;
  }

  strong {
    margin-left: 8px;
    color: #6b7280;
    font-size: 0.78rem;
  }
`;

const SiteFrame = styled.div`
  height: calc(100% - 38px);
  min-height: calc(100vh - 156px);
  overflow: auto;

  .navbar {
    position: static;
  }
`;

const Inspector = styled.aside`
  background: #ffffff;
  border-left: 1px solid #dbe3ef;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1100px) {
    border-left: none;
    border-top: 1px solid #dbe3ef;
    min-height: 70vh;
  }
`;

const InspectorHead = styled.header`
  padding: 18px;
  border-bottom: 1px solid #e5e7eb;

  p {
    margin: 0 0 4px;
    color: #6b7280;
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
  }

  h2 {
    margin: 0;
    font-size: 1.2rem;
  }
`;

const InspectorBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 18px;
`;

const Group = styled.div`
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 14px;
`;

const GroupTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
`;

const Field = styled.label`
  display: grid;
  gap: 6px;
  color: #374151;
  font-size: 0.82rem;
  font-weight: 800;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  color: #111827;
  font: inherit;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 92px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px;
  color: #111827;
  font: inherit;
  resize: vertical;
`;

const ImageFieldBox = styled.div`
  display: grid;
  gap: 8px;
`;

const ImagePreview = styled.div`
  width: 100%;
  min-height: 118px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    background: #fff;
  }

  span {
    color: #9ca3af;
    font-size: 0.82rem;
  }
`;

const UploadRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: center;
`;

const FileButton = styled.label`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-weight: 800;
  padding: 10px 12px;
  white-space: nowrap;

  input {
    display: none;
  }
`;

const HelpText = styled.p`
  margin: 0;
  color: #6b7280;
  font-size: 0.78rem;
  line-height: 1.4;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  border: 1px solid ${props => (props.$danger ? '#fecaca' : '#d1d5db')};
  border-radius: 6px;
  background: ${props => (props.$primary ? '#111827' : '#fff')};
  color: ${props => (props.$primary ? '#fff' : props.$danger ? '#b91c1c' : '#374151')};
  cursor: pointer;
  font-weight: 800;
  padding: 10px 12px;
`;

const LoginPage = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: #eef2f7;
`;

const LoginCard = styled.form`
  width: min(100%, 390px);
  display: grid;
  gap: 14px;
  padding: 26px;
  border: 1px solid #dbe3ef;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 22px 50px rgba(15, 23, 42, 0.14);

  h1 {
    margin: 0;
    font-size: 1.45rem;
  }

  p {
    margin: 0;
    color: #6b7280;
    line-height: 1.45;
  }
`;

const ErrorText = styled.p`
  color: #b91c1c !important;
  font-weight: 800;
`;

const sections = [
  { id: 'services', title: 'Servicios', hint: 'Productos, textos e imágenes', page: 'home' },
  { id: 'whyUs', title: 'Beneficios', hint: 'Por qué elegirnos', page: 'home' },
  { id: 'about', title: 'Nosotros', hint: 'Historia y diferenciales', page: 'about' },
  { id: 'brokers', title: 'Aseguradoras', hint: 'Logos y textos', page: 'brokers' },
  { id: 'footer', title: 'Contacto', hint: 'Teléfono, email y redes', page: 'contact' },
  { id: 'whatsapp', title: 'WhatsApp', hint: 'Botón flotante', page: 'home' },
  { id: 'colors', title: 'Colores', hint: 'Paleta visual', page: 'home' },
];

const toLines = (items) => (Array.isArray(items) ? items.join('\n') : '');
const fromLines = (value) => value.split('\n').map(item => item.trim()).filter(Boolean);
const imageSizeLimit = 5 * 1024 * 1024;

const getImagePreviewUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  return process.env.PUBLIC_URL + path;
};

function ImageInput({ label, value, onChange }) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      window.alert('Seleccioná un archivo de imagen.');
      event.target.value = '';
      return;
    }

    if (file.size > imageSizeLimit) {
      window.alert('La imagen es muy pesada. Usá una imagen menor a 5 MB.');
      event.target.value = '';
      return;
    }

    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);

    try {
      const response = await fetch(getApiUrl('/api/media/upload'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        window.alert(data.error || 'No se pudo subir la imagen.');
        return;
      }

      onChange(data.url);
    } catch (error) {
      window.alert('No se pudo conectar con la API para subir la imagen.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return (
    <Field>
      {label}
      <ImageFieldBox>
        <ImagePreview>
          {value ? <img src={getImagePreviewUrl(value)} alt="" /> : <span>Sin imagen</span>}
        </ImagePreview>
        <UploadRow>
          <Input value={value || ''} onChange={event => onChange(event.target.value)} placeholder="Pegá un link o ruta de imagen" />
          <FileButton>
            {isUploading ? 'Subiendo...' : 'Subir'}
            <input type="file" accept="image/*" disabled={isUploading} onChange={handleFile} />
          </FileButton>
        </UploadRow>
        <HelpText>Podés pegar una URL, usar una imagen de `/Images/...` o subir JPG, PNG, WEBP, GIF o SVG hasta 5 MB.</HelpText>
      </ImageFieldBox>
    </Field>
  );
}

function AdminWorkspace() {
  const { content, updateContent, resetContent } = useSiteContent();
  const { theme, updateColor, resetColors, customThemes } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('services');
  const [previewPage, setPreviewPage] = useState('home');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [saveMessage, setSaveMessage] = useState('Sin cambios pendientes.');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(ADMIN_TOKEN_KEY);

      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        const response = await fetch(getApiUrl('/api/auth/me'), {
          headers: { Authorization: `Bearer ${token}` },
        });

        setIsAuthenticated(response.ok);
        if (!response.ok) localStorage.removeItem(ADMIN_TOKEN_KEY);
      } catch (error) {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const currentSection = useMemo(
    () => sections.find(section => section.id === activeSection) || sections[0],
    [activeSection]
  );

  const selectSection = (section) => {
    setActiveSection(section.id);
    setPreviewPage(section.page);
  };

  const markDirty = () => {
    setIsDirty(true);
    setSaveMessage('Cambios sin guardar. Presioná Guardar para publicarlos.');
  };

  const saveNow = async () => {
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);

    if (!token) {
      setIsAuthenticated(false);
      setSaveMessage('La sesión venció. Iniciá sesión de nuevo.');
      return;
    }

    setIsSaving(true);
    localStorage.setItem('siteContent', JSON.stringify(content));
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
    localStorage.setItem('customColors', JSON.stringify(theme));

    try {
      const response = await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          theme,
          customThemes: customThemes || {},
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setSaveMessage(data.error || 'No se pudo guardar en la API. Quedó guardado solo en este navegador.');
        if (response.status === 401) {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
          setIsAuthenticated(false);
        }
        return;
      }

      setIsDirty(false);
      setSaveMessage('Cambios guardados y publicados para la web.');
    } catch (error) {
      setSaveMessage('No se pudo conectar con la API. Quedó guardado solo en este navegador.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateObject = (key, patch) => {
    markDirty();
    updateContent(key, { ...content[key], ...patch });
  };

  const updateService = (index, patch) => {
    markDirty();
    updateContent('services', content.services.map((service, serviceIndex) => (
      serviceIndex === index ? { ...service, ...patch } : service
    )));
  };

  const updateBroker = (index, patch) => {
    markDirty();
    updateObject('brokers', {
      items: content.brokers.items.map((broker, brokerIndex) => (
        brokerIndex === index ? { ...broker, ...patch } : broker
      )),
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    try {
      const response = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || 'Contraseña incorrecta.');
        return;
      }

      localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
      setPassword('');
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError('No se pudo conectar con la API.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setPassword('');
    setIsAuthenticated(false);
    setSaveMessage('Sesión cerrada.');
  };

  const handleResetContent = () => {
    if (!window.confirm('¿Restaurar el contenido predeterminado? Guardá después para publicarlo.')) return;
    markDirty();
    resetContent();
  };

  const renderPreviewPage = () => {
    switch (previewPage) {
      case 'about':
        return <About />;
      case 'brokers':
        return <Brokers />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  const renderEditor = () => {
    if (activeSection === 'services') {
      return (
        <>
          {content.services.map((service, index) => (
            <Group key={`${service.title}-${index}`}>
              <GroupTitle>{service.title || `Servicio ${index + 1}`}</GroupTitle>
              <Field>Título<Input value={service.title} onChange={event => updateService(index, { title: event.target.value })} /></Field>
              <Field>Descripción<Textarea value={service.description} onChange={event => updateService(index, { description: event.target.value })} /></Field>
              <ImageInput label="Ícono" value={service.icon} onChange={value => updateService(index, { icon: value })} />
              <ImageInput label="Imagen de fondo" value={service.imagen} onChange={value => updateService(index, { imagen: value })} />
            </Group>
          ))}
        </>
      );
    }

    if (activeSection === 'whyUs') {
      return (
        <Group>
          <Field>Título<Input value={content.whyUs.title} onChange={event => updateObject('whyUs', { title: event.target.value })} /></Field>
          <Field>Beneficios<Textarea value={toLines(content.whyUs.items)} onChange={event => updateObject('whyUs', { items: fromLines(event.target.value) })} /></Field>
        </Group>
      );
    }

    if (activeSection === 'about') {
      return (
        <>
          <Group>
            <Field>Título<Input value={content.about.title} onChange={event => updateObject('about', { title: event.target.value })} /></Field>
            <Field>Subtítulo<Input value={content.about.subtitle} onChange={event => updateObject('about', { subtitle: event.target.value })} /></Field>
            <Field>Título historia<Input value={content.about.historyTitle} onChange={event => updateObject('about', { historyTitle: event.target.value })} /></Field>
            <Field>Párrafos de historia<Textarea value={toLines(content.about.historyParagraphs)} onChange={event => updateObject('about', { historyParagraphs: fromLines(event.target.value) })} /></Field>
            <Field>Texto botón<Input value={content.about.ctaText} onChange={event => updateObject('about', { ctaText: event.target.value })} /></Field>
          </Group>
          {content.about.features.map((feature, index) => (
            <Group key={`${feature.title}-${index}`}>
              <GroupTitle>Diferencial {index + 1}</GroupTitle>
              <Field>Título<Input value={feature.title} onChange={event => updateObject('about', {
                features: content.about.features.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item),
              })} /></Field>
              <Field>Descripción<Textarea value={feature.description} onChange={event => updateObject('about', {
                features: content.about.features.map((item, itemIndex) => itemIndex === index ? { ...item, description: event.target.value } : item),
              })} /></Field>
            </Group>
          ))}
        </>
      );
    }

    if (activeSection === 'brokers') {
      return (
        <>
          <Group>
            <Field>Título<Input value={content.brokers.title} onChange={event => updateObject('brokers', { title: event.target.value })} /></Field>
            <Field>Subtítulo<Textarea value={content.brokers.subtitle} onChange={event => updateObject('brokers', { subtitle: event.target.value })} /></Field>
          </Group>
          {content.brokers.items.map((broker, index) => (
            <Group key={`${broker.name}-${index}`}>
              <GroupTitle>{broker.name || `Aseguradora ${index + 1}`}</GroupTitle>
              <Field>Nombre<Input value={broker.name} onChange={event => updateBroker(index, { name: event.target.value })} /></Field>
              <ImageInput label="Logo" value={broker.image} onChange={value => updateBroker(index, { image: value })} />
            </Group>
          ))}
        </>
      );
    }

    if (activeSection === 'footer') {
      return (
        <Group>
          <Field>Email<Input value={content.footer.email} onChange={event => updateObject('footer', { email: event.target.value })} /></Field>
          <Field>Teléfono<Input value={content.footer.phone} onChange={event => updateObject('footer', { phone: event.target.value })} /></Field>
          <Field>Horario<Input value={content.footer.schedule} onChange={event => updateObject('footer', { schedule: event.target.value })} /></Field>
          <Field>Texto del footer<Textarea value={content.footer.about} onChange={event => updateObject('footer', { about: event.target.value })} /></Field>
          <Field>Instagram<Input value={content.footer.instagram} onChange={event => updateObject('footer', { instagram: event.target.value })} /></Field>
          <Field>Facebook<Input value={content.footer.facebook} onChange={event => updateObject('footer', { facebook: event.target.value })} /></Field>
          <Field>LinkedIn<Input value={content.footer.linkedin} onChange={event => updateObject('footer', { linkedin: event.target.value })} /></Field>
        </Group>
      );
    }

    if (activeSection === 'whatsapp') {
      return (
        <Group>
          <Field>Teléfono<Input value={content.whatsapp.phone} onChange={event => updateObject('whatsapp', { phone: event.target.value })} /></Field>
          <Field>Mensaje inicial<Textarea value={content.whatsapp.message} onChange={event => updateObject('whatsapp', { message: event.target.value })} /></Field>
        </Group>
      );
    }

    return (
      <Group>
        <Field>Primario<Input type="color" value={theme.primary} onChange={event => { markDirty(); updateColor('primary', event.target.value); }} /></Field>
        <Field>Secundario<Input type="color" value={theme.secondary} onChange={event => { markDirty(); updateColor('secondary', event.target.value); }} /></Field>
        <Field>Acento<Input type="color" value={theme.accent} onChange={event => { markDirty(); updateColor('accent', event.target.value); }} /></Field>
        <Field>Texto<Input type="color" value={theme.dark} onChange={event => { markDirty(); updateColor('dark', event.target.value); }} /></Field>
        <Field>Fondo<Input type="color" value={theme.light} onChange={event => { markDirty(); updateColor('light', event.target.value); }} /></Field>
        <Button type="button" onClick={() => { markDirty(); resetColors(); }}>Restaurar colores</Button>
      </Group>
    );
  };

  if (isCheckingAuth) {
    return (
      <LoginPage>
        <LoginCard as="div">
          <h1>Panel de administración</h1>
          <p>Verificando sesión...</p>
        </LoginCard>
      </LoginPage>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage>
        <LoginCard onSubmit={handleLogin}>
          <h1>Panel de administración</h1>
          <p>Ingresá la contraseña para editar la web.</p>
          <Field>
            Contraseña
            <Input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Ingresá la contraseña"
              autoComplete="current-password"
            />
          </Field>
          {loginError && <ErrorText>{loginError}</ErrorText>}
          <Button type="submit" $primary>Entrar</Button>
        </LoginCard>
      </LoginPage>
    );
  }

  return (
    <Shell>
      <Sidebar>
        <Brand>
          <strong>Editor Huelmo</strong>
          <span>Solo contenido real de la web</span>
        </Brand>
        <Nav aria-label="Partes editables de la web">
          {sections.map(section => (
            <NavButton
              key={section.id}
              type="button"
              $active={activeSection === section.id}
              onClick={() => selectSection(section)}
            >
              {section.title}
              <small>{section.hint}</small>
            </NavButton>
          ))}
        </Nav>
        <Actions>
          <Button type="button" $danger onClick={handleResetContent}>Restaurar contenido</Button>
          <Button type="button" onClick={handleLogout}>Cerrar sesión</Button>
        </Actions>
      </Sidebar>

      <CanvasColumn>
        <Topbar>
          <div>
            <strong>Vista previa en vivo</strong>
            <div style={{ color: isDirty ? '#b45309' : '#6b7280', fontSize: 13 }}>{saveMessage}</div>
          </div>
          <Actions>
            <Segmented>
              {['home', 'about', 'brokers', 'contact'].map(page => (
                <Segment key={page} type="button" $active={previewPage === page} onClick={() => setPreviewPage(page)}>
                  {page === 'home' ? 'Inicio' : page === 'about' ? 'Nosotros' : page === 'brokers' ? 'Aseguradoras' : 'Contacto'}
                </Segment>
              ))}
            </Segmented>
            <Segmented>
              <Segment type="button" $active={previewMode === 'desktop'} onClick={() => setPreviewMode('desktop')}>Desktop</Segment>
              <Segment type="button" $active={previewMode === 'mobile'} onClick={() => setPreviewMode('mobile')}>Mobile</Segment>
            </Segmented>
            <Button type="button" $primary onClick={saveNow} disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button type="button" onClick={() => { window.location.href = './'; }}>Ver sitio</Button>
          </Actions>
        </Topbar>

        <PreviewWrap>
          <Browser $mode={previewMode}>
            <BrowserBar>
              <span style={{ background: '#ef4444' }} />
              <span style={{ background: '#f59e0b' }} />
              <span style={{ background: '#22c55e' }} />
              <strong>huelmoseguros.uy/{previewPage === 'home' ? '' : previewPage}</strong>
            </BrowserBar>
            <SiteFrame>
              <NavBar currentPage={previewPage} setCurrentPage={setPreviewPage} />
              <main>{renderPreviewPage()}</main>
              <WhatsAppButton />
              <Footer />
            </SiteFrame>
          </Browser>
        </PreviewWrap>
      </CanvasColumn>

      <Inspector>
        <InspectorHead>
          <p>Editando</p>
          <h2>{currentSection.title}</h2>
        </InspectorHead>
        <InspectorBody>
          {renderEditor()}
        </InspectorBody>
      </Inspector>
    </Shell>
  );
}

export default AdminWorkspace;
