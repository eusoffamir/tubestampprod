import React, { useState } from 'react';
import './stampPop.css';

const StampPop = ({ timestamps, onClose }) => {
  const [copied, setCopied] = useState(false);
  // Support error object
  const isError = timestamps && typeof timestamps === 'object' && timestamps.error;
  let errorMsg = isError ? timestamps.error : '';
  console.log('Popup error message:', errorMsg);
  // Improve error messages for users
  if (isError && errorMsg) {
    const lower = errorMsg.toLowerCase();
    if (lower.includes('credit balance') || lower.includes('insufficient credit') || lower.includes('insufficient funds')) {
      errorMsg = 'Insufficient funds: Please add credits to your Bumpups.com account to use this service.';
    } else if (lower.includes('bad request') && lower.includes('bumpups.com')) {
      errorMsg = 'The service is temporarily unavailable or your account has insufficient credit. Please check your Bumpups.com account.';
    } else if (lower.includes('authentication required')) {
      errorMsg = 'You must be signed in to use this feature.';
    } else if (lower.includes('app check required')) {
      errorMsg = 'App integrity check failed. Please refresh and try again.';
    } else if (lower.includes('missing youtube url')) {
      errorMsg = 'Please enter a valid YouTube video URL.';
    } else if (lower.includes('api key not set')) {
      errorMsg = 'Internal error: Service API key is missing. Please contact support.';
    } else if (lower.includes('service temporarily unavailable')) {
      errorMsg = 'The service is temporarily unavailable. Please try again later.';
    } else if (lower.includes('timeout')) {
      errorMsg = 'The request timed out. Please try again later.';
    } else {
      errorMsg = 'An error occurred: ' + errorMsg;
    }
  }
  const handleCopy = () => {
    const text = Array.isArray(timestamps) ? timestamps.join('\n') : timestamps;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="stamp-pop-overlay">
      <div className="stamp-pop-container">
        <button className="stamp-pop-close" onClick={onClose}>&times;</button>
        <h2 className="stamp-pop-title">Timestamps</h2>
        <div className="stamp-pop-content">
          {isError ? (
            <div className="stamp-pop-error">{errorMsg}</div>
          ) : Array.isArray(timestamps)
            ? timestamps.map((t, i) => <div key={i} className="stamp-pop-timestamp">{t}</div>)
            : <div className="stamp-pop-timestamp">{timestamps}</div>}
        </div>
        {!isError && (
          <button className="stamp-pop-copy" onClick={handleCopy} disabled={copied}>
            {copied ? 'Copied!' : 'Copy All'}
          </button>
        )}
      </div>
    </div>
  );
};

export default StampPop;
