import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/HomePage';
import Login from './components/Login'; // Example login page
import Register from './components/Register'; // Example register page
import Admin from './components/Admin';
import Secret from './components/Secret';
import { AuthProvider } from './context/UserContext';


function App() {
  return (
   <AuthProvider>
     <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
        <Route path="/admin-panel" element={<Admin />} />
      </Routes>
    </Router>
   </AuthProvider>
  );
}

export default App;
