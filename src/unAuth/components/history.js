import React, { useEffect, useState } from 'react';
import './history.css';

// Key for localStorage
const HISTORY_KEY = 'timestamp_history';

const loadHistory = () => {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  // Dispatch a custom event so all components can update
  window.dispatchEvent(new Event('history-updated'));
};

export const addToHistory = (item) => {
  const history = loadHistory();
  // Remove duplicates by url
  const filtered = history.filter(h => h.url !== item.url);
  const newHistory = [item, ...filtered];
  saveHistory(newHistory);
};

const History = ({ onShowTimestamps }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(loadHistory());
    // Listen for updates from other tabs/windows and custom event
    const handler = () => setHistory(loadHistory());
    window.addEventListener('storage', handler);
    window.addEventListener('history-updated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('history-updated', handler);
    };
  }, []);

  return (
    <div className="history-section">
      <div className="history-title-row">
        <h3 className="history-title">History</h3>
        <span className="history-icon">
          {/* YouTube-style history (clock) icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" fill="#18181b"/>
            <path d="M12 7v5l3 2" stroke="#FF0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      {history.length === 0 ? (
        <div className="history-empty">No history yet.</div>
      ) : (
        <div className="history-list">
          {history.map((item, idx) => {
            const isInvalid = item.timestamps && item.timestamps.error;
            return (
              <div className="history-item" key={item.url}>
                <img className="history-thumb" src={item.thumbnail} alt="thumb" />
                <span className={`history-video-title${isInvalid ? ' history-invalid-title' : ''}`}>{item.title}</span>
                {isInvalid ? (
                  <button className="history-invalid-btn" disabled>Invalid</button>
                ) : (
                  <button className="history-show-btn" onClick={() => onShowTimestamps(item)}>
                    Regenerate
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
