import React, { useEffect, useState } from 'react'
import './Add.css'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { addContact, editContact } from '../contact/contactSlice'

const Add = () => {

  const [firstname,setFirstName] = useState('')
  const [lastname,setLastName] = useState('')
  const [address,setAddress] = useState('')
  const [company,setCompany] = useState('')
  const [phonenumber,setPhoneNumber] = useState('')
  const { loading,message,status } = useSelector((state) => state.contact)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const {user} = location.state || {};

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setAddress(user.address);
      setCompany(user.company);
      setPhoneNumber(user.phone_number);
    }
  }, [user]);



  const handleAddContact = (e) => {
    e.preventDefault(); 
    dispatch(addContact({ firstname, lastname, address, company, phonenumber }));
    if(message === 'Added Successfully') {
      navigate('/contact');
    }
  };

  const handleEditContact = (e) => {
    e.preventDefault(); 
    dispatch(editContact({ firstname, lastname, address, company, phonenumber ,user}));
    if(message === 'Edited Successfully') {
      navigate('/contact');
    }
  };

  return (
    <div className="main-container">
      <div>
        {status && <p className='message'>{status}</p>}
      </div>
      <div className="heading">
        <h2>Add/Edit Contact Details</h2>
      </div>
      <div className="contact-details">
        <div className="contact-field">
            <label>First Name</label>
            <input type="text" placeholder='First Name' value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="contact-field">
            <label>Last Name</label>
            <input type="text" placeholder='Last Name' value={lastname} onChange={(e) => setLastName(e.target.value)}/>
        </div>
        <div className="contact-field">
            <label>Address</label>
            <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="contact-field">
            <label>Company</label>
            <input type="text" placeholder='Company' value={company} onChange={(e) => setCompany(e.target.value)}/>
        </div>
        <div className="contact-field">
            <label>Phone Number</label>
            <input type="tel" placeholder='Phone Number' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
        </div>
        <div className="add-button">
            <button type="button" onClick={handleAddContact}>
              {loading ? 'Adding...' : 'Add'}
            </button>
            <button type="button" onClick={handleEditContact}>
              {loading ? 'Editing...' : 'Edit'}
            </button>
        </div>
      </div>
    </div>
  )
}

export default Add;
