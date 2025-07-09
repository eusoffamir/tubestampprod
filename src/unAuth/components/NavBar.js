import React from 'react';
import './NavBar.css';
import tubeLogo from '../../assets/tubev1.png';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo-simple">
        <img src={tubeLogo} alt="Logo" style={{ height: '28px', marginRight: '8px', verticalAlign: 'middle' }} />
        <span className="nav-logo-text">
          <span className="nav-logo-blue">tube</span><span className="nav-logo-white">stamp</span>
        </span>
      </div>
      <button
        className="nav-chatbot-btn"
        onClick={() => window.open('https://bumpups.com/', '_blank', 'noopener,noreferrer')}
      >
        AI Video Chatbot <span className="nav-chatbot-arrow">→</span>
      </button>
    </nav>
  );
};

export default NavBar;
