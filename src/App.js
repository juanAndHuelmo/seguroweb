import { Suspense, lazy, useState, useEffect } from 'react';
import './App.css';
import { useTheme } from './Hooks/useTheme';
import NavBar from './Components/Layout/NavBar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Brokers from './Components/Pages/Brokers';
import Contact from './Components/Forms/Contact';
import Footer from './Components/Layout/Footer';
import WhatsAppButton from './Components/Layout/WhatsAppButton';

const AdminWorkspace = lazy(() => import('./Components/AdminPanel/AdminWorkspace'));

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoader, setShowLoader] = useState(true);
  const { theme } = useTheme();
  const isAdminPage =
    window.location.pathname.endsWith('/admin') || window.location.hash === '#/admin';

  // Aplicar colores dinámicos al documento
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    document.documentElement.style.setProperty('--color-dark', theme.dark);
    document.documentElement.style.setProperty('--color-light', theme.light);
  }, [theme]);

  useEffect(() => {
    if (isAdminPage) {
      setShowLoader(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [isAdminPage]);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
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

  return (
    <div className="App">
      {isAdminPage ? (
        <Suspense fallback={<div style={{ padding: 40 }}>Cargando editor...</div>}>
          <AdminWorkspace />
        </Suspense>
      ) : (
        <>
          {showLoader && (
            <div className="initial-loader" role="status" aria-label="Cargando Huelmo Seguros">
              <div className="initial-loader__mark">
                <img src={`${process.env.PUBLIC_URL}/Images/logo.png`} alt="Huelmo Seguros" />
              </div>
              <div className="initial-loader__bar" aria-hidden="true">
                <span />
              </div>
            </div>
          )}
          <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
          <main className="main-content">
            {renderContent()}
          </main>
          <WhatsAppButton />
          <Footer />
        </>
      )}
    </div>  
  );
}

export default App;
