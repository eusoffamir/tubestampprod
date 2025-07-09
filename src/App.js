import React from 'react';
import './App.css';
import LandingPage from './unAuth/LandingPage';

import './firebase';

// Redirect users from Firebase default domains to the custom domain
const defaultHosts = [
  "tubestampprod-3ff40.web.app",
  "tubestampprod-3ff40.firebaseapp.com"
];
if (defaultHosts.includes(window.location.hostname)) {
  window.location.href = "https://stamptube.online" + window.location.pathname + window.location.search + window.location.hash;
}

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
