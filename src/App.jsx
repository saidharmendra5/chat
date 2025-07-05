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


function App() {
  const [loggeduser , setLoggedUser] = useState([]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='app' element={<UserAuth><NavBar /></UserAuth> } >
        <Route path='chat' element={<Chatapp />} />
        <Route path='add' element={<Add />} />
        <Route path='profile' element={<Profile />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
    <UserDetails.Provider value={{loggeduser , setLoggedUser}}>
    <RouterProvider router={router} />
    </UserDetails.Provider>
    </>
  )
}

export default App
