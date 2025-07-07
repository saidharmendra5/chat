import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './NavBar.css'; // Import the CSS file
import { UserDetails } from '../contex/IsLoggedIn';

const NavBar = () => {
  const {loggeduser} = useContext(UserDetails);
  return (
    <div className='main-container'>
      <div className='nav-bar'>
        
        <NavLink to="chat" className="nav-link">Chat</NavLink>
        <NavLink to="add" className="nav-link">Add Friends</NavLink>
        <NavLink to="about" className="nav-link">About</NavLink>
        
        <NavLink to="profile" className="nav-link">Profile</NavLink>

      </div>
      <Outlet />
    </div>
  )
}

export default NavBar;
