import React, { useState, useEffect } from 'react';
import './Timestamp.css';

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

function extractVideoId(url) {
  // Handles various YouTube URL formats
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const Timestamp = () => {
  const [url, setUrl] = useState('');
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [isFetchingVideo, setIsFetchingVideo] = useState(false);
  const [showGenerateBtn, setShowGenerateBtn] = useState(false);

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

    // If validation passes, show video preview (handled by useEffect)
    setShowGenerateBtn(false); // Hide generate button until video loads
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError(''); // Clear error when user starts typing
    setVideoData(null); // Reset video preview on URL change
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      setVideoData(null);
      setIsFetchingVideo(false);
      if (!url || !youtubeRegex.test(url)) return;
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
          setShowGenerateBtn(true); // Show generate button after video loads
        } else {
          setVideoData(null);
          setError('No video data found');
          setShowGenerateBtn(false);
        }
      } catch (err) {
        setVideoData(null);
        setError('Error fetching video data');
        setShowGenerateBtn(false);
      } finally {
        setIsFetchingVideo(false);
      }
    };
    fetchVideoData();
    // eslint-disable-next-line
  }, [url]);

  // Function to call backend generate_timestamps
  const handleGenerateTimestamps = async () => {
    setIsGenerating(true);
    setError("");
    const payload = { url };
    console.log("Sending payload to backend:", payload);
    try {
      // Use your deployed Firebase Function endpoint below
      const response = await fetch("https://us-central1-tubestampprod-3ff40.cloudfunctions.net/generate_timestamps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log("Timestamps response:", data);
      if (data.timestamps_list) {
        console.log("Timestamps List:", data.timestamps_list);
      }
      if (data.timestamps_string) {
        console.log("Timestamps String:\n" + data.timestamps_string);
      }
    } catch (err) {
      setError("Error generating timestamps");
      console.error(err);
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
            {isGenerating ? 'Loading...' : 'Show Video Preview'}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        {isFetchingVideo && url && youtubeRegex.test(url) && (
          <div className="video-preview-loading">Loading video preview...</div>
        )}
        {videoData && (
          <div className="video-preview">
            <img
              className="video-thumbnail"
              src={videoData.thumbnail}
              alt="YouTube video thumbnail"
            />
            <div className="video-title">{videoData.title}</div>
            {showGenerateBtn && (
              <button
                className="generate-btn"
                onClick={handleGenerateTimestamps}
                disabled={isGenerating}
                style={{ marginTop: '1rem' }}
              >
                {isGenerating ? 'Generating...' : 'Generate Timestamps'}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Timestamp;
