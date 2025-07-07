import React, { useContext } from 'react'
import ChatList from './ChatList'
import Chatapp from './Chatapp'
import  './ChatContainer.css';
import { UserDetails } from '../contex/IsLoggedIn'
import NoSelectedChat from '../components/NoSelectedChat'

const ChatContainer = () => {
    const {selecteduser} = useContext(UserDetails);
  return (
    <div className='chat-container'>
        <ChatList />
        {selecteduser ? <Chatapp /> : <NoSelectedChat />}
    </div>
  )
}

export default ChatContainer