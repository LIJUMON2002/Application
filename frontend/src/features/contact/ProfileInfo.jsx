import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar'
import Profile from '../Profile/Profile';
import "./Contact.css"

const ProfileInfo = () => {

  return (
    <div className='contact-container'>
      <Sidebar/>
      <div className="main">
        <Navbar/>
        <Profile/>
      </div>
    </div>
  );
};

export default ProfileInfo;
