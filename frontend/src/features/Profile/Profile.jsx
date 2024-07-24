import React from 'react';
import "./Profile.css"
import defaultPicture from '../../assets/background.jpg'
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../auth/authSlice';

const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  }
  return (
    <div className="main-container">
      <div className='profile-heading'>
        <h2>Profile Information</h2>
      </div>
      <div className="profile-picture">
        <img src={ user.profile } alt="profile picture" />
      </div>
      <div className="info-container">
        <div className="info-div">
          <div className="profile-field">
            <p className="f1">First Name </p>
            <p className="f2">{user.firstname}</p>
          </div>
          <div className="profile-field">
            <p className="f1">Phone Number </p>
            <p className="f2">{user.phone}</p>
          </div>
          <div className="profile-field">
            <p className="f1">Gender </p>
            <p className="f2">{user.gender}</p>
          </div>
        </div>
        <div className="info-div">
          <div className="profile-field">
            <p className="f1">Last Name </p>
            <p className="f2">{user.lastname}</p>
          </div>
          <div className="profile-field">
            <p className="f1">Email </p>
            <p className="f2">{user.email}</p>
          </div>
          <div className="profile-field">
            <p className="f1">Address </p>
            <p className="f2">{user.address}</p>
          </div>
        </div>
      </div>
      <div className="edit-button">
        <button type="button">
          <img src={ assets.edit_icon } alt="" />
          <p>Edit</p>
        </button>
        <button type="button" onClick={handleLogout}>
          <img src={ assets.logout_icon } alt="" />
          <p>Logout</p>
        </button>
      </div>
      
    </div>
  );
};

export default Profile;
