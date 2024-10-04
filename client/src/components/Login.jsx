import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { login } from '../api';
import { useAuth } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData.username, formData.password);
      console.log("API response: ", response);
      if (response.success) {
        authLogin(response.user); // Update auth context
        navigate('/secret'); // Redirect to secret page on successful login
      } else {
        setError(response.msg || 'Login failed');
      }
    } catch (err) {
      console.error("Login error: ", err); 
      setError(err.msg || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Welcome Back</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-1">
              Username
            </label>
            <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 transition duration-150">
              <FaUserAlt className="text-gray-400 mr-2" />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full outline-none text-gray-700"
                required
                autoFocus
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-md p-2 focus-within:ring-2 focus-within:ring-blue-500 transition duration-150">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full outline-none text-gray-700"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 text-lg font-semibold text-white rounded-md transition duration-150 ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>

            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.637-1.34-2.222-.248-4.556-1.113-4.556-4.946 0-1.092.39-1.988 1.031-2.688-.104-.25-.447-1.25.099-2.605 0 0 .84-.269 2.75 1.021A9.53 9.53 0 0110 2.69a9.56 9.56 0 012.5.337c1.91-1.291 2.75-1.021 2.75-1.021.546 1.355.203 2.355.1 2.605.64.699 1.031 1.596 1.031 2.688 0 3.846-2.337 4.692-4.561 4.935.36.308.681.917.681 1.848 0 1.335-.012 2.416-.012 2.743 0 .27.18.581.688.483A10.038 10.038 0 0020 10.017C20 4.484 15.523 0 10 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
