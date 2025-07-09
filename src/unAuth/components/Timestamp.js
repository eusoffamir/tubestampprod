import React, { useState } from 'react';
import './Timestamp.css';

const Timestamp = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // YouTube URL regex patterns
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}(&.*)?$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!url.trim()) {
      setError('Please enter a YouTube video URL');
      return;
    }

    if (!youtubeRegex.test(url)) {
      setError('Invalid YouTube video URL. Please enter a valid YouTube link.');
      return;
    }

    // If validation passes, show generating message
    setIsGenerating(true);
    alert('Generating timestamps...');
    
    // Reset generating state after a short delay (you can replace this with actual API call)
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError(''); // Clear error when user starts typing
  };

  return (
    <section className="timestamp-section">
      <div className="timestamp-container">
        <h1 className="main-title">AI YouTube Timestamps</h1>
        <p className="subtitle">
          Generates timestamps for a given YouTube video using the bump-1.0 model for uninterrupted, priority service <a href="https://bumpups.com" target="_blank" rel="noopener noreferrer">bumpups.com</a>.
        </p>
        <form className="timestamp-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">🔗</span>
            <input
              type="text"
              className="url-input"
              placeholder="Enter YouTube video URL"
              value={url}
              onChange={handleUrlChange}
            />
          </div>
          <select 
            className="lang-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
          <button 
            type="submit" 
            className="generate-btn"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Timestamps'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </section>
  );
};

export default Timestamp;
