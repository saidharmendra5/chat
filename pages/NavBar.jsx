import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './NavBar.css'; // Import the CSS file
import { UserDetails } from '../contex/IsLoggedIn';

const NavBar = () => {
  const {loggeduser} = useContext(UserDetails);
  return (
    <>
      <div className='nav-bar'>
        <div className="nav-content">
          <div className="nav-logo">
            <div className="nav-logo-icon">💬</div>
            <span>ChatSphere</span>
          </div>
          
          <div className="nav-links">
            <NavLink to="chat" className="nav-link">
              <i className="fas fa-comments"></i>
              Chat
            </NavLink>
            <NavLink to="add" className="nav-link">
              <i className="fas fa-user-plus"></i>
              Add Friends
            </NavLink>
            <NavLink to="profile" className="nav-link">
              <i className="fas fa-user"></i>
              Profile
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default NavBar;
