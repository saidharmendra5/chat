import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="logo">
            <div className="logo-icon">💬</div>
            <span>ChatSphere</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className={`hero-text ${isLoaded ? 'animate-slideUp' : ''}`}>
            <h1 className="hero-title">
              Connect in Real-Time
              <span className="gradient-text"> Anywhere</span>
            </h1>
            <p className="hero-subtitle">
              Experience seamless communication with our next-generation chat platform.
              Built for speed, designed for connection.
            </p>
            <div className="hero-buttons">
              <Link to="/" className="btn btn-primary animate-glow">
                <i className="fas fa-rocket"></i>
                Get Started
              </Link>
              <button className="btn btn-secondary">
                <i className="fas fa-play"></i>
                Watch Demo
              </button>
            </div>
          </div>
          
          <div className={`hero-visual ${isLoaded ? 'animate-fadeIn' : ''}`}>
            <div className="chat-preview transform-3d">
              <div className="chat-window glass">
                <div className="chat-header">
                  <div className="chat-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="chat-title">Live Chat</div>
                </div>
                <div className="chat-messages">
                  <div className="message message-received animate-slideUp">
                    <div className="message-avatar">👤</div>
                    <div className="message-content">Hey! How's it going?</div>
                  </div>
                  <div className="message message-sent animate-slideUp">
                    <div className="message-content">Great! Just testing this new chat app 🚀</div>
                  </div>
                  <div className="message message-received animate-slideUp">
                    <div className="message-avatar">👤</div>
                    <div className="message-content">The UI looks amazing!</div>
                  </div>
                </div>
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <span>Someone is typing...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <h2 className="section-title">Why Choose ChatSphere?</h2>
          <div className="features-grid">
            <div className="feature-card card animate-slideUp">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Real-time messaging with zero lag. Experience instant communication like never before.</p>
            </div>
            <div className="feature-card card animate-slideUp">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>End-to-end encryption ensures your conversations remain private and secure.</p>
            </div>
            <div className="feature-card card animate-slideUp">
              <div className="feature-icon">🌐</div>
              <h3>Cross Platform</h3>
              <p>Access your chats from any device, anywhere in the world. Seamless synchronization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-icon">💬</div>
            <span>ChatSphere</span>
          </div>
          <p>&copy; 2025 ChatSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;