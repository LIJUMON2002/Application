import React, { useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import List from '../List/List';
import "./Contact.css"
import { useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router-dom';

const ListContact = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const user_details = jwtDecode(token);
        const expirationTime = (user_details.exp * 1000) - Date.now();
        if (expirationTime > 0) {
          setTimeout(() => {
            dispatch(logout());
            navigate('/login');
          }, expirationTime);
        } else {
          dispatch(logout());
          navigate('/login');
        }
      } catch (error) {
        dispatch(logout());
        navigate('/login');
      }
    }
  }, [dispatch,navigate]);

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
