import React, { useContext, useEffect, useState } from 'react';
import './ChatList.css';
import { UserDetails } from '../contex/IsLoggedIn';

const ChatList = () => {
  const [friends, setFriends] = useState([]);
  const{onlineUserslist} = useContext(UserDetails);

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
        {friends.map((val, index) => {
  const isOnline = onlineUserslist.includes(val._id);

  return (
    <button key={index} className="chatlist-button">
      <div className="user-info">
        <span className="username">
  {val.fullname}
  {isOnline && <span className="status-dot green" title="Online"></span>}
</span>

        <span className="email">{val.email}</span>
      </div>
    </button>
  );
})}


      </div>
    </div>
  );
};

export default ChatList;