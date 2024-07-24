import React, {useState} from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'
import { useDispatch } from 'react-redux';
import { listContacts } from '../contact/contactSlice';
import { logout } from '../auth/authSlice';

const Sidebar = () => {

    const [extend,setExtend] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleProfile = () => {
        navigate('/profile');
    }
    const handleContact = () => {
        dispatch(listContacts());
        navigate('/contact');
    }
    const handleAddContact = () => {
        navigate('/add');
    }
    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }


  return (
    <div className='sidebar'>
        <div className="top">
            <img className='menu' src={assets.menu_icon} alt="" onClick={()=> setExtend(!extend)} />
            <div className="add-contact" onClick={handleAddContact}>
                <img src={assets.add_icon} alt="" />
                {extend ? <p>Add Contact</p> : null }
            </div>
            <div className="add-contact" onClick={handleContact}>
                <img src={assets.contact_icon} alt="" />
                {extend ? <p>List Contacts</p> : null }
            </div>
        </div>
        <div className="bottom">
            <div className="bottom-item icons">
                <img src={assets.question_icon} alt="" />
                {extend ? <p>Help</p> : null }
            </div>
            <div className="bottom-item icons" onClick={handleProfile}>
                <img src={assets.profile_icon} alt="" />
                {extend ? <p>Profile</p> : null }
                
            </div>
            <div className="bottom-item icons">
                <img src={assets.setting_icon} alt="" />
                {extend ? <p>Settings</p> : null }
                
            </div>
            <div className="bottom-item icons">
                <img src={assets.logout_icon} alt="" onClick={handleLogout}/>
                {extend ? <p>Logout</p> : null }
                
            </div>
        </div>
    </div>
  )
}

export default Sidebar;
