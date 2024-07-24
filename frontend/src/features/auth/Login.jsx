import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authSlice';
import { useNavigate } from 'react-router-dom';
import "./AuthStyle.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (token && user) {
      navigate('/contact');
    }
  }, [token, navigate,user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email,password}));
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className='login-container'>
      <h1>Welcome Back!</h1>
      <p>Sign in to your Account</p>
      <form onSubmit={handleSubmit}>
        <div className='login-form-container'>
          <div className='input-login-group'>
            <label>Email</label>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className='input-login-group'>
            <label>Password</label>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
        </div>
        <div className='button-login-group'>
          <button className='login-button' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className='error-msg'>{error}</div>}
          <p>Don't have an account</p>
          <button className='login-button' type="submit" onClick={handleRegister}>
            Sign up for free
          </button>
        </div>
        
        
      </form>
    </div>
  );
};

export default Login;