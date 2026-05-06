/* src/components/NavBar/NavBar.jsx */
import { useEffect, useState } from 'react';
import '../../styles/NavBar.css';

function NavBar({ currentPage, setCurrentPage }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'brokers', label: 'Aseguradoras' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <button
          type="button"
          className="navbar-brand"
          onClick={() => setCurrentPage('home')}
          aria-label="Ir a Inicio"
        >
          <img
            src={process.env.PUBLIC_URL + '/Images/logo.png'}
            alt="Huelmo Seguros Logo"
            className="navbar-logo"
          />
        </button>

        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="navbar-item">
              <button
                type="button"
                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default NavBar;