import React, { useState, useEffect } from 'react';
import './Timestamp.css';

const Timestamp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="timestamp-section">
      <div className="timestamp-container">
        <h2 className="timestamp-title">Live Timestamp</h2>
        <div className="timestamp-display">
          <div className="time-card">
            <div className="time-label">Current Time</div>
            <div className="time-value">
              {currentTime.toLocaleTimeString()}
            </div>
          </div>
          <div className="time-card">
            <div className="time-label">Current Date</div>
            <div className="time-value">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="timestamp-features">
          <div className="feature-item">
            <span className="feature-icon">⏱️</span>
            <span>Real-time updates</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🌍</span>
            <span>Global timezone support</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📱</span>
            <span>Mobile responsive</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timestamp;
