import React, { useContext } from 'react';
import { UserDetails } from '../contex/IsLoggedIn';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../src/assets/avatar.png';

const Profile = () => {
  const { loggeduser } = useContext(UserDetails);
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      const res = await fetch('http://localhost:8000/chat/logout', {
        method: 'POST',
        credentials: 'include',
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

  if (!loggeduser) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profile</h2>

      <div className="avatar-container">
  <img src={avatarImg} alt="Avatar" className="profile-avatar" />
  <label htmlFor='upload-img' ><i className="fa-solid fa-camera camera-icon"></i></label>
</div>
<input type="file" accept='image/*' id="upload-img" hidden/>


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
