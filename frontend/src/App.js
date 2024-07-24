import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import ListContact from './features/contact/ListContact';
import AddContact from './features/contact/AddContact';
import ProfileInfo from './features/contact/ProfileInfo';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/contact" element={<ListContact />} />
        <Route path="/add" element={<AddContact />} />
      </Routes>
    </div>
  );
};

export default App;
