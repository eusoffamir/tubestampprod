import React from 'react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>TubeStamp</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link">Features</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
        <div className="nav-buttons">
          <button className="nav-btn login-btn">Login</button>
          <button className="nav-btn signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
