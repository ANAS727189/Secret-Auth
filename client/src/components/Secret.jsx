import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { secret } from '../api';
import { useAuth } from '../context/UserContext';
import { Shield, User, Mail, Key, Loader } from 'lucide-react';
import Admin from './Admin';

const Secret = () => {
  
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchSecret = async () => {
      try {
        const response = await secret();
        setData(response);
      } catch (err) {
        if (err.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError(err.msg || 'An error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSecret();
  }, [navigate, logout]);


  const handleAdminRedirect = () => {
    console.log(user.isAdmin);
    navigate('/admin-panel');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Protected Content</h1>
        {data && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
              <p className="text-white text-lg font-semibold">{data.msg}</p>
            </div>
            {data.user && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">User Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <User className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium mr-2">Username:</span>
                    {user.username}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                    <span className="font-medium mr-2">Email:</span>
                    {user.email}
                  </div>
                  {user.isAdmin && (
                    <div className="flex items-center text-green-600">
                      <Key className="w-5 h-5 mr-3" />
                      <span className="font-semibold">Admin User</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {user?.isAdmin && (
        <button 
          onClick={handleAdminRedirect}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go to Admin Panel
        </button>
      )}
    </div>
  );
};

export default Secret;