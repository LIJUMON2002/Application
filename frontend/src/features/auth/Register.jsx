import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from './authSlice';
import "./AuthStyle.css"

const Register = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profile, setProfile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const handleSubmit = (e) => {

    if(password === confirmpassword) {
      const formData = new FormData();
      formData.append('file', profile);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('dob', dob);
      formData.append('gender', gender);
      formData.append('phone', phone);
      formData.append('address', address);
      e.preventDefault();
      dispatch(register(formData)).then((result) => {
        if (register.fulfilled.match(result)) {
          navigate('/login');
        }
      });
    } else {
      alert("Passwords doesn't match");
      e.preventDefault();
    }
  };
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className='reg-container'>
      <h1>Create Account</h1>
      <p>Please Enter Your Information</p>
      <form onSubmit={handleSubmit}>

        <div className='reg-form-container'>

          <div className='sub-reg-container'>
            <div className='input-reg-group'>
              <label>First Name</label>
              <input type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)} required/>
            </div>
            <div className='input-reg-group'>
              <label>Last Name</label>
              <input type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)} required/>
            </div>
          </div>

          <div className='sub-reg-container'>
            <div className='input-reg-group'>
              <label>Email</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className='input-reg-group'>
              <label>Phone Number</label>
              <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
            </div>
          </div>

          <div className='sub-reg-container'>
            <div className='input-reg-group'>
              <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className='input-reg-group'>
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            </div>
          </div>

          <div className='sub-reg-container'>
            <div className='input-reg-group'>
              <label>Gender</label>
              <input type="text" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} required/>
            </div>
            <div className='input-reg-group'>
              <label>Address</label>
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required/>
            </div>
          </div>

          <div className='sub-reg-container'>
            <div className='input-reg-group'>
              <label>Date of Birth</label>
              <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDOB(e.target.value)} required/>
            </div>
            <div className='input-reg-group'>
              <label>Profile Picture</label>
              <input type="file" accept="image/*" onChange={(e) => setProfile(e.target.files[0])} required/>
            </div>
          </div>

        </div>
        
        <div className='button-reg-group'>
          <button className='reg-button' type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <div className='error-msg'>{error}</div>}
          <p>Already have an account</p>
          <button className='reg-button' type="submit" onClick={handleLogin}>
            Login here
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
