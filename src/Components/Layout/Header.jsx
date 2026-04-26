import React, { useEffect, useState } from "react";
import "../styles/Header.css";

const Header = ({ onQuotationClick }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  useEffect(() => {
    let timer;

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setCollapsed(true);
        setManualOpen(false);
      } else {
        setCollapsed(false);
      }

      clearTimeout(timer);

      timer = setTimeout(() => {
        if (window.scrollY > 80) {
          setCollapsed(true);
          setManualOpen(false);
        }
      }, 2500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const expanded = !collapsed || manualOpen;

  return (
    <header className={`header ${collapsed ? "collapsed" : ""}`}>
      <div className="header-topbar">
        <div className="header-mini-info">
          📞 +598 92 290 092
        </div>

        {collapsed && (
          <button
            className="toggle-header-btn"
            onClick={() => setManualOpen(!manualOpen)}
          >
            {manualOpen ? "✕" : "☰"}
          </button>
        )}
      </div>

      <div className={`header-content ${expanded ? "show" : "hide"}`}>
        <div className="header-info">
          <p>📞 +598 92 290 092 | 📧 info@huelmo.com.uy</p>
        </div>
        <div className="header-buttons">
          <button
            className="quote-btn"
            onClick={onQuotationClick}
          >
            💬 Cotizar Ahora
          </button>

          <button className="emergency-btn">
            🚨 Tuve un Siniestro
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;