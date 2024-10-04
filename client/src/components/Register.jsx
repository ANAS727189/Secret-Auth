import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import { register } from '../api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await register(formData.username, formData.email, formData.password);
      if (response.success) {
        navigate('/login'); // Redirect to login page on successful registration
      }
    } catch (err) {
      setError(err.msg || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
            <div className="flex items-center border rounded-md mt-1 p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaUserAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border rounded-md mt-1 p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full outline-none text-gray-700"
                required
              />
              {formData.email.endsWith('@iiitdwd.ac.in') && (
                <span className="text-xs text-green-600 ml-2">Admin account</span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border rounded-md mt-1 p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center border rounded-md mt-1 p-2 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold text-white ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } rounded-md transition-colors mt-6`}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;