import '../../styles/NavBar.css';
import { useAppConfig } from '../../Context/AppConfigContext';
import { getAssetUrl } from '../../Config/api';

function NavBar({ currentPage, setCurrentPage }) {
  const { config } = useAppConfig();
  const menuItems = config.nav || [];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img
            src={getAssetUrl(config.brand.logo)}
            alt={`${config.brand.name} Logo`}
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
