import React, { useContext } from 'react';
import { UserDetails } from '../contex/IsLoggedIn';
import './Profile.css';

const Profile = () => {
  const { loggeduser } = useContext(UserDetails);

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
    </div>
  );
};

export default Profile;
