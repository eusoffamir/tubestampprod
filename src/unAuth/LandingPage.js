import React, { useState } from 'react';
import './LandingPage.css';
import NavBar from './components/NavBar';
import Bumpups from './components/Bumpups';
import Timestamp from './components/Timestamp';
import Footer from './components/Footer';
import StampPop from './components/stampPop';

const LandingPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [timestamps, setTimestamps] = useState([]);

  // Handler to be called when timestamps are generated
  const handleShowTimestamps = (newTimestamps) => {
    setTimestamps(newTimestamps);
    setShowPopup(true);
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <div className="landing-page">
      <NavBar />
      <Timestamp onTimestampsGenerated={handleShowTimestamps} />
      <Bumpups />
      <Footer />
      {showPopup && (
        <StampPop timestamps={timestamps} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default LandingPage;
