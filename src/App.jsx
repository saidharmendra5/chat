import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chatapp from '../pages/Chatapp'
import NavBar from '../pages/NavBar'
import Add from '../pages/Add'
import UserAuth from '../components/UserAuth'
import { UserDetails } from '../contex/IsLoggedIn'
import Profile from '../pages/Profile'

import ChatContainer from '../pages/ChatContainer'


function App() {
  const [loggeduser , setLoggedUser] = useState([]);
  const [onlineUserslist , setOnlineUsersList] = useState([]);
  const [selecteduser , setSelecteduser] = useState(null);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='app' element={<UserAuth><NavBar /></UserAuth> } >
        <Route path='chat' element={<ChatContainer />} />
        <Route path='add' element={<Add />} />
        
        <Route path='profile' element={<Profile />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
    <UserDetails.Provider value={{loggeduser , setLoggedUser ,onlineUserslist , setOnlineUsersList , selecteduser , setSelecteduser}}>
    <RouterProvider router={router} />
    </UserDetails.Provider>
    </>
  )
}

export default App
