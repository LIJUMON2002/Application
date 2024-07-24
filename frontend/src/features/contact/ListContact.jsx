import React from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import List from '../List/List';
import "./Contact.css"

const ListContact = () => {

  return (
    <div className='contact-container'>
      <Sidebar/>
      <div className="main">
        <Navbar/>
        <List/>
      </div>
    </div>
  );
};

export default ListContact;
