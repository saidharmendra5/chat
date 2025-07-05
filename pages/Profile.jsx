import React, { useContext } from 'react';
import { UserDetails } from '../contex/IsLoggedIn';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { loggeduser } = useContext(UserDetails);
  const navigate = useNavigate();

const Logout = async () => {
  try {
    const res = await fetch('http://localhost:8000/chat/logout', {
      method: 'POST',
      credentials: 'include', // Important to send cookies
    });

    if (res.ok) {
      console.log('Logged out successfully');
      navigate('/');
    } else {
      console.error('Logout failed');
    }
  } catch (err) {
    console.error('Error during logout:', err);
  }
};
  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>

      <div className="profile-field">
        <label>Full Name</label>
        <input type="text" value={loggeduser.fullname} readOnly />
      </div>

      <div className="profile-field">
        <label>Email</label>
        <input type="email" value={loggeduser.email} readOnly />
      </div>

      <p className="profile-meta">
        Account created on <strong>{new Date(loggeduser.createdAt).toLocaleDateString()}</strong>
      </p>
      <div className="logout-wrapper">
  <button className="logout-button" onClick={Logout}>Logout</button>
</div>


    </div>
  );
};

export default Profile;
