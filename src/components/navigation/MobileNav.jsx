import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserCog } from 'react-icons/fa';

const MobileNav = ({ estConnecte }) => {
  const location = useLocation();
  const estActif = (chemin) => location.pathname === chemin;

  return (
    <nav className="mobile-nav">
      <div className="mobile-nav-grid">
        <Link
          to="/"
          className={`mobile-nav-button ${estActif('/') ? 'active' : ''}`}
        >
          <FaHome className="mobile-nav-icon" />
          <span>Accueil</span>
        </Link>

        {estConnecte && (
          <Link
            to="/dashboard"
            className={`mobile-nav-button ${estActif('/dashboard') ? 'active' : ''}`}
          >
            <FaUserCog className="mobile-nav-icon" />
            <span>Dashboard</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default MobileNav;
