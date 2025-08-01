import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import './Chatapp.css';
import ChatList from './ChatList';
import { UserDetails } from '../contex/IsLoggedIn';

const Chatapp = () => {
  const { loggeduser ,onlineUserslist , setOnlineUsersList , selecteduser } = useContext(UserDetails);
  const socket = useRef(null);
  const [messagelist, setMessageList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  // Connect socket once user is logged in
  useEffect(() => {
    if (loggeduser && !socket.current) {
      socket.current = io('http://localhost:8000' , {
        query:{
          userId : loggeduser._id
        }
      });
      console.log("socket is connected");

      // Listen for messages
      socket.current.on('message', (msg) => {
        setMessageList((prev) => [...prev, msg]);
      });

      socket.current.on('getOnlineUsers' , (onlineusers) => {
        console.log("online users : " , onlineusers);
        setOnlineUsersList(onlineusers);
      })
      
    }

    // Cleanup function - only runs when component unmounts or dependencies change
    return () => {
      if (socket.current) {
        socket.current.disconnect();
        socket.current = null;
        console.log("socket is disconnected");
      }
    };
  }, [loggeduser]); // Add loggeduser as dependency

  const onSubmit = (data) => {
    if (socket.current && socket.current.connected) {
      socket.current.emit('new-message', data.msgtosend);
      console.log("message is sent through socket", socket.current.id, "to server.");
    } else {
      console.log("socket is not connected");
    }
  };

  return (
    
      
      <div className="big">
        <div className="chat-header">
  <h3>{selecteduser.fullname}</h3>
  <p>{selecteduser.email}</p>
</div>

        <div className="chat-area">
          {messagelist.map((msg, i) => (
            <div key={i}>{msg}</div>
          ))}
        </div>

        <div className="send-msg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("msgtosend", { required: true })}
              placeholder="Type your message..."
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    
  );
};

export default Chatapp;
