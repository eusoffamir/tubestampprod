import React, { useState } from 'react';
import './stampPop.css';

const StampPop = ({ timestamps, onClose }) => {
  const [copied, setCopied] = useState(false);
  // Support error object
  const isError = timestamps && typeof timestamps === 'object' && timestamps.error;
  let errorMsg = isError ? timestamps.error : '';
  console.log('Popup error message:', errorMsg);
  if (isError && errorMsg && errorMsg.toLowerCase().includes('credit balance')) {
    errorMsg = 'Insufficient funds: Please add credits to your Bumpups.com account to use this service.';
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
