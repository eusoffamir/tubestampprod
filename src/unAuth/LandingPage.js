import React from 'react';
import './LandingPage.css';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <NavBar />
      <div className="landing-content">
        <h1 className="landing-title">Hello Landing Page</h1>
        <p className="landing-subtitle">Welcome to our amazing application!</p>
        <button className="cta-button">Get Started</button>
      </div>
      <Bumpups />
      <Timestamp />
      <Footer />
    </div>
  );
};

export default LandingPage;
