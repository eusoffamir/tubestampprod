import React from 'react';
import './Bumpups.css';

const Bumpups = () => {
  return (
    <section className="bumpups-section">
      <div className="bumpups-container">
        <h2 className="bumpups-title">Featured Highlights</h2>
        <div className="bumpups-grid">
          <div className="bumpup-card">
            <div className="bumpup-icon">🚀</div>
            <h3>Fast Processing</h3>
            <p>Lightning-fast video processing with our advanced algorithms</p>
          </div>
          <div className="bumpup-card">
            <div className="bumpup-icon">🎯</div>
            <h3>High Accuracy</h3>
            <p>Precise timestamp detection with 99.9% accuracy rate</p>
          </div>
          <div className="bumpup-card">
            <div className="bumpup-icon">💡</div>
            <h3>Smart Features</h3>
            <p>AI-powered features that adapt to your content needs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bumpups;
