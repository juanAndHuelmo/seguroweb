import '../../styles/NavBar.css';

function NavBar({ currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'home', label: 'Inicio' },
    { id: 'about', label: 'Nosotros' },
    { id: 'brokers', label: 'Aseguradoras' },
    { id: 'contact', label: 'Contacto' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src={process.env.PUBLIC_URL + '/Images/logo.png'}
            alt="Huelmo Seguros Logo"
            className="navbar-logo"
          />
        </div>

        <ul className="navbar-menu">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-link ${
                  currentPage === item.id ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;