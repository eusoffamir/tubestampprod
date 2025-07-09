import React from 'react';
import './Timestamp.css';

const Timestamp = () => {
  return (
    <section className="timestamp-section">
      <div className="timestamp-container">
        <h1 className="main-title">AI YouTube Timestamps</h1>
        <p className="subtitle">
          Generates timestamps for a given YouTube video using the bump-1.0 model—for uninterrupted, priority service <a href="https://bumpups.com" target="_blank" rel="noopener noreferrer">bumpups.com</a>.
        </p>
        <form className="timestamp-form">
          <div className="input-group">
            <span className="input-icon">🔗</span>
            <input
              type="text"
              className="url-input"
              placeholder="Enter YouTube video URL"
            />
          </div>
          <select className="lang-select">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
          <button type="submit" className="generate-btn">Generate Timestamps</button>
        </form>
      </div>
    </section>
  );
};

export default Timestamp;
