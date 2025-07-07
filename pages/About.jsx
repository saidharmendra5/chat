import React, { useEffect, useState } from 'react';
import './About.css';

const About = () => {
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingDone(true);
    }, 4600); // should match typing duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-container">
      <h1>About ChatXpress</h1>
      <p>
        <strong>ChatXpress</strong> is a real-time chat application built using the powerful MERN stack
        (MongoDB, Express, React, Node.js) along with <strong>Socket.IO</strong> for seamless
        real-time messaging.
      </p>

      <div className="quote-container">
        <p className={`quote ${typingDone ? 'done' : 'typing-active'}`}>
          “Any application that can be written in JavaScript, will eventually be written in JavaScript.”
        </p>
        <p className="author">— Jeff Atwood</p>
      </div>

      <div className="features">
        <h2>🔑 Key Features:</h2>
        <ul>
          <li>💬 Real-time 1-on-1 and group chatting</li>
          <li>🟢 Online user status indicator</li>
          <li>🔒 Secure login & authentication with JWT</li>
          <li>📷 Profile picture upload using Cloudinary</li>
          <li>📶 Socket.IO-powered instant message delivery</li>
          <li>📱 Responsive design for mobile and desktop</li>
        </ul>
      </div>

      <div className="tech-stack">
        <h2>🛠️ Tech Stack:</h2>
        <p>
          <strong>Frontend:</strong> React, Context API, CSS <br />
          <strong>Backend:</strong> Node.js, Express.js <br />
          <strong>Database:</strong> MongoDB with Mongoose <br />
          <strong>Real-Time:</strong> Socket.IO <br />
          <strong>Storage:</strong> Cloudinary (for images)
        </p>
      </div>

      <div className="footer">
        <p>Built with ❤️ by Sai V</p>
      </div>
    </div>
  );
};

export default About;
