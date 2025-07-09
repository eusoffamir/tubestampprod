import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1 className="landing-title">Hello Landing Page</h1>
        <p className="landing-subtitle">Welcome to our amazing application!</p>
        <div className="landing-features">
          <div className="feature-card">
            <h3>Feature 1</h3>
            <p>Amazing functionality that will blow your mind</p>
          </div>
          <div className="feature-card">
            <h3>Feature 2</h3>
            <p>Incredible features that make life easier</p>
          </div>
          <div className="feature-card">
            <h3>Feature 3</h3>
            <p>Revolutionary technology at your fingertips</p>
          </div>
        </div>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default LandingPage;
