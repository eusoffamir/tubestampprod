import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-card">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3 className="footer-title" style={{ color: '#38d39f', fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.2rem' }}>#1 AI VIDEO MODEL</h3>
              <p className="footer-description" style={{ color: '#fff', fontWeight: 400, marginBottom: '1.2rem' }}>
                Bump AI will watch any video and deliver insights across all industries.
              </p>
              <div className="social-links">
                <a href="https://www.linkedin.com/" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg>
                </a>
                <a href="https://x.com/" className="social-link" aria-label="X" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 2.47A12 12 0 0 0 2.47 17.53 12 12 0 0 0 17.53 2.47zm-1.06 1.06A10 10 0 1 1 3.53 18.47 10 10 0 0 1 16.47 3.53zm-7.07 2.12l2.12 2.12 2.12-2.12 1.41 1.41-2.12 2.12 2.12 2.12-1.41 1.41-2.12-2.12-2.12 2.12-1.41-1.41 2.12-2.12-2.12-2.12z"/></svg>
                </a>
                <a href="https://youtube.com/" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.425 3.5 12 3.5 12 3.5s-7.425 0-9.386.574a2.994 2.994 0 0 0-2.112 2.112C0 8.147 0 12 0 12s0 3.853.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.575 20.5 12 20.5 12 20.5s7.425 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.853 24 12 24 12s0-3.853-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Product</h4>
              <ul className="footer-links">
                <li><a href="https://bumpups.com/news" target="_blank" rel="noopener noreferrer">News</a></li>
                <li><a href="https://bumpups.com/pricing" target="_blank" rel="noopener noreferrer">Pricing</a></li>
                <li><a href="https://bumpups.canny.io/changelog" target="_blank" rel="noopener noreferrer">Product Changelog</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Features</h4>
              <ul className="footer-links">
                <li><a href="https://bumpups.com/workspace-feature" target="_blank" rel="noopener noreferrer">Workspaces</a></li>
                <li><a href="https://bumpups.com/creator-feature" target="_blank" rel="noopener noreferrer">Creator Studio</a></li>
                <li><a href="https://bumpups.com/youtube-feature" target="_blank" rel="noopener noreferrer">YouTube Videos</a></li>
                <li><a href="https://bumpups.com/local-feature" target="_blank" rel="noopener noreferrer">Local Videos</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>API</h4>
              <ul className="footer-links">
                <li><a href="https://bumpups.com/startup" target="_blank" rel="noopener noreferrer">Startups</a></li>
                <li><a href="https://bumpups.com/zapier" target="_blank" rel="noopener noreferrer">Zapier</a></li>
                <li><a href="https://bumpups.com/enterprise" target="_blank" rel="noopener noreferrer">Enterprise</a></li>
                <li><a href="https://docs.bumpups.com/docs/getting-started" target="_blank" rel="noopener noreferrer">API Documentation</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 Bumpups Inc. – All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="https://bumpups.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                <a href="https://bumpups.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
