import React, { useEffect, useState } from 'react';
import './ChatList.css';

const ChatList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await fetch("http://localhost:8000/chat/getfriendslist", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log("Chat list result:", result);

        if (response.ok && result.userfriendslist) {
          setFriends(result.userfriendslist);
        } else {
          console.error("Error loading friends list:", result.message);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    getFriends();
  }, []);

  return (
    <div className="chatlist-container">
      <h2 className="chatlist-title">Friends</h2>
      <div className="chatlist-buttons">
        {friends.map((val, index) => (
          <button key={index} className="chatlist-button">
    {val.fullname}
    <span className="email">{val.email}</span>
  </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
