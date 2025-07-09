import React, { useState, useEffect } from 'react';
import './Timestamp.css';
import History, { addToHistory } from './history';
import { generateTimestamps } from '../../firebase';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function extractVideoId(url) {
  // Handles various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const Timestamp = ({ onTimestampsGenerated }) => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [isFetchingVideo, setIsFetchingVideo] = useState(false);

  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)[a-zA-Z0-9_-]{11}(&.*)?$/;
  const isValidUrl = url && youtubeRegex.test(url);
  const isEmpty = !url;

  useEffect(() => {
    const fetchVideoData = async () => {
      setVideoData(null);
      setIsFetchingVideo(false);
      if (!isValidUrl) return;
      const videoId = extractVideoId(url);
      if (!videoId) return;
      setIsFetchingVideo(true);
      try {
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const snippet = data.items[0].snippet;
          setVideoData({
            title: snippet.title,
            thumbnail:
              snippet.thumbnails.maxres?.url ||
              snippet.thumbnails.standard?.url ||
              snippet.thumbnails.high?.url ||
              snippet.thumbnails.medium?.url ||
              snippet.thumbnails.default?.url,
          });
        } else {
          setVideoData(null);
        }
      } catch (err) {
        setVideoData(null);
      } finally {
        setIsFetchingVideo(false);
      }
    };
    fetchVideoData();
    // eslint-disable-next-line
  }, [url]);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError('');
  };

  // Save to history and show popup
  const handleTimestampsGenerated = (timestamps) => {
    // Save to history even if error
    let title = videoData && videoData.title ? videoData.title : 'Invalid or Unavailable';
    let thumbnail = videoData && videoData.thumbnail ? videoData.thumbnail : '';
    if (isValidUrl && timestamps) {
      addToHistory({
        url,
        title,
        thumbnail,
        timestamps
      });
    }
    onTimestampsGenerated && onTimestampsGenerated(timestamps);
  };

  // Show timestamps from history
  const handleShowTimestampsFromHistory = (item) => {
    onTimestampsGenerated && onTimestampsGenerated(item.timestamps);
  };

  const handleGenerateTimestamps = async () => {
    if (!isValidUrl) return;
    setIsGenerating(true);
    setError("");
    const payload = { url, language };
    try {
      const result = await generateTimestamps(payload);
      const data = result.data;
      if (data.timestamps_list) {
        handleTimestampsGenerated(data.timestamps_list);
      } else if (data.timestamps_string) {
        handleTimestampsGenerated(data.timestamps_string);
      } else if (data.error) {
        let errorMsg = typeof data.error === 'string' ? data.error : (data.error.message || 'Service temporarily unavailable, please try again later.');
        handleTimestampsGenerated({ error: errorMsg });
      }
    } catch (err) {
      setError("Error generating timestamps");
      handleTimestampsGenerated({ error: 'Service temporarily unavailable, please try again later.' });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="timestamp-section">
      <div className="timestamp-container">
        <h1 className="main-title">AI YouTube Timestamps</h1>
        <p className="subtitle">
          Generates timestamps for a given YouTube video using the bump-1.0 model for uninterrupted, priority service <a href="https://bumpups.com" target="_blank" rel="noopener noreferrer">bumpups.com</a>.
        </p>
        <form className="timestamp-form" onSubmit={e => { e.preventDefault(); if (isValidUrl) handleGenerateTimestamps(); }}>
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
            className={`generate-btn${isEmpty ? ' empty-btn' : !isValidUrl ? ' invalid-btn' : ''}`}
            disabled={isEmpty || !isValidUrl || isGenerating}
            style={isEmpty ? { opacity: 0.5 } : !isValidUrl ? { background: '#ef4444', color: '#fff', cursor: 'not-allowed' } : {}}
          >
            {isEmpty ? 'Generate' : !isValidUrl ? 'Invalid YouTube URL' : (isGenerating ? 'Generating...' : 'Generate Timestamps')}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {isEmpty ? (
          <div className="youtube-placeholder">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Go to YouTube" className="youtube-placeholder-link">
              <svg width="480" height="270" viewBox="0 0 96 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="96" height="68" rx="14" fill="#18181b"/>
                <path d="M38 48V20L66 34L38 48Z" fill="#FF0000"/>
                <rect x="1" y="1" width="94" height="66" rx="13" stroke="#333" strokeWidth="2"/>
              </svg>
            </a>
            <div className="youtube-placeholder-text">Paste your YouTube link.</div>
          </div>
        ) : isFetchingVideo ? (
          <div className="video-preview-loading">Loading video preview...</div>
        ) : videoData ? (
          <div className="video-preview">
            <img
              className="video-thumbnail"
              src={videoData.thumbnail}
              alt="YouTube video thumbnail"
            />
            <div className="video-title">{videoData.title}</div>
          </div>
        ) : null}
        {/* History section below placeholder/preview */}
        <History onShowTimestamps={handleShowTimestampsFromHistory} />
      </div>
    </section>
  );
};

export default Timestamp;
