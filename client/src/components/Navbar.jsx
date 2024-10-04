import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  console.log("Current user in Navbar: ", user);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">MyApp</Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
          <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
            <span className="mr-2">👋</span> {/* Optional emoji for a friendly touch */}
            <span>Welcome, {user.username}</span>
        </button>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Register
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;