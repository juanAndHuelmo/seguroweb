import { useState, useEffect } from 'react';
import './App.css';
import { useTheme } from './Hooks/useTheme';
import NavBar from './Components/Layout/NavBar';
import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Brokers from './Components/Pages/Brokers';
import Contact from './Components/Forms/Contact';
import Footer from './Components/Layout/Footer';
import Header from './Components/Layout/Header';
import WhatsAppButton from './Components/Layout/WhatsAppButton';
import AdminPanel from './Components/Admin/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { theme } = useTheme();

  // Aplicar colores dinámicos al documento
  useEffect(() => {
    document.documentElement.style.setProperty('--color-primary', theme.primary);
    document.documentElement.style.setProperty('--color-secondary', theme.secondary);
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    document.documentElement.style.setProperty('--color-dark', theme.dark);
    document.documentElement.style.setProperty('--color-light', theme.light);
  }, [theme]);

  const handleQuotationClick = () => {
    setCurrentPage('home');
  };

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
      {/* <Header onQuotationClick={handleQuotationClick} /> */}
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-content">
        {renderContent()}
      </main>
      <WhatsAppButton />
      <Footer />
    </div>  
  );
}

export default App;
