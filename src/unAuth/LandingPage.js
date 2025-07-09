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
      <Timestamp />
      <Bumpups />
      <Footer />
    </div>
  );
};

export default LandingPage;
