import React, { useContext, useEffect, useState } from 'react';
import './ChatList.css';
import { UserDetails } from '../contex/IsLoggedIn';

const ChatList = () => {
  const [friends, setFriends] = useState([]);
  const { onlineUserslist, selecteduser, setSelecteduser } = useContext(UserDetails);

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

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="chatlist-container">
      <h2 className="chatlist-title">
        <i className="fas fa-users"></i>
        Friends ({friends.length})
      </h2>
      
      <div className="chatlist-buttons">
        {friends.length === 0 ? (
          <div className="chatlist-empty">
            <div className="chatlist-empty-icon">👥</div>
            <div className="chatlist-empty-text">No friends yet</div>
            <div className="chatlist-empty-subtitle">Add some friends to start chatting!</div>
          </div>
        ) : (
          friends.map((friend, index) => {
            const isOnline = onlineUserslist.includes(friend._id);
            const isSelected = selecteduser && selecteduser._id === friend._id;

            return (
              <button 
                key={index} 
                onClick={() => {
                  setSelecteduser({ 
                    _id: friend._id, 
                    fullname: friend.fullname, 
                    email: friend.email 
                  });
                }} 
                className={`chatlist-button ${isSelected ? 'selected' : ''}`}
              >
                <div className="user-avatar">
                  {getInitials(friend.fullname)}
                  <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
                </div>
                
                <div className="user-info">
                  <div className="username">
                    {friend.fullname}
                    {isOnline && <i className="fas fa-circle" style={{ color: 'var(--success)', fontSize: '0.5rem' }}></i>}
                  </div>
                  <div className="email">{friend.email}</div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
