import { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from '../layout/RootLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Chatapp from '../pages/Chatapp'


function App() {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='msg' element={<Chatapp />} />
      </Route>
    )
  )

  return (
    <>
    <RouterProvider router={router} />
      
    </>
  )
}

export default App
