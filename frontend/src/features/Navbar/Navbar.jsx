import React from 'react'
import { assets } from '../../assets/assets'
import './Navbar.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listContacts } from '../contact/contactSlice';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.user.profile);

  const handleProfile = () => {
    navigate('/profile');
  }
  const handleAdd = () => {
    navigate('/add');
  }
  const handleContact = () => {
    dispatch(listContacts());
    navigate('/contact');
  }
  return (
      <div className="main-nav">
        <div className='main-nav-sub'>
          <img src={assets.app} alt=''/>
          <p>ContactBase</p>
        </div>
        <div className="home-button">
          <button type='button' onClick={handleContact}>Home</button>
          <button type='button' onClick={handleAdd}>Add</button>
          <img src="" alt='' onClick={handleProfile}/>
        </div>
      </div>
    )
}

export default Navbar
