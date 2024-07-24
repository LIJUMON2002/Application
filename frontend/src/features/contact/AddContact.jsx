import React from 'react'
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Add from '../Add/Add';
import './Contact.css'

const AddContact = () => {
    return (
        <div className='contact-container'>
          <Sidebar/>
          <div className="main">
            <Navbar/>
            <Add/>
          </div>
        </div>
      );
}

export default AddContact;
