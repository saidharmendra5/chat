import React from 'react';
import './NoSelectedChat.css';

const NoSelectedChat = () => {
  return (
    <div className="nochat-container">
      <div className="nochat-content">
        <div className="nochat-emoji">💬</div>
        <h2>No Chat Selected</h2>
        <p>Select a friend from the list to start a conversation.</p>
      </div>
    </div>
  );
};

export default NoSelectedChat;
