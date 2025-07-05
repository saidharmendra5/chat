import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './NavBar.css'; // Import the CSS file

const NavBar = () => {
  return (
    <>
      <div className='nav-bar'>
        <NavLink to="chat" className="nav-link">Chat</NavLink>
        <NavLink to="add" className="nav-link">Add Friends</NavLink>
        <NavLink to="about" className="nav-link">About</NavLink>
        <NavLink to="profile" className="nav-link">Profile</NavLink>

      </div>
      <Outlet />
    </>
  )
}

export default NavBar;
