import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client'
import './Chatapp.css';

//set the url for sockets:
// ✅ Correct socket URL
const socket = io('http://localhost:9000');

const Chatapp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const [messagelist, setMessageList] = useState(["hi", "hello!!"]);

  useEffect(() => {
    // ✅ Listen for incoming messages from server
    socket.on('message', (msg) => {
      setMessageList((prev) => [...prev, msg]);
    });

    // ✅ Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  const onSubmit = (data) => {
    console.log("Message to be sent:", data.msgtosend);

    // ✅ Emit message to server
    socket.emit('new-message', data.msgtosend);
  };

  return (
    <div className='big'>
      <h2>Messenger</h2>
      <div className='chat-area'>
        {messagelist.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}

        <div className='send-msg'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("msgtosend", { required: true })}
            />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatapp;