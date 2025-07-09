import React from 'react';
import './Bumpups.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faComments, faVideo, faCode, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const bumpupsData = [
  {
    label: 'Local Videos',
    icon: faUpload,
    description: 'Learn more',
    url: 'https://bumpups.com/local-feature',
  },
  {
    label: 'Video Chat',
    icon: faComments,
    description: 'Learn more',
    url: 'https://bumpups.com/workspace-feature',
  },
  {
    label: 'AI YouTube',
    icon: faVideo,
    description: 'Learn more',
    url: 'https://bumpups.com/creator-feature',
  },
  {
    label: 'API',
    icon: faCode,
    description: 'Learn more',
    url: 'https://bumpups.com/startup',
  },
];

const Bumpups = () => {
  return (
    <section className="bumpups-section">
      <div className="bumpups-container">
        <hr className="bumpup-separator" />
        <h2 className="bumpups-title">
          Do more with <span className="bumpups-highlight">bump<span className="bumpups-green">ups</span>.com</span>
        </h2>
        <p className="bumpups-subtitle">
          Process your videos to deliver insights across all industries. Ask questions, request summaries, analyses, and more with Bump-1.0.
        </p>
        <div className="bumpups-grid">
          {bumpupsData.map((item) => (
            <div className="bumpup-card" key={item.label}>
              <div className="bumpup-left">
                <span className="bumpup-label">{item.label}</span>
                <a className="bumpup-link" href={item.url} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faArrowRight} className="bumpup-arrow" />
                  <span>Learn more</span>
                </a>
              </div>
              <div className="bumpup-icon">
                <FontAwesomeIcon icon={item.icon} />
              </div>
            </div>
          ))}
        </div>
        <hr className="bumpup-separator" />
      </div>
    </section>
  );
};

export default Bumpups;
