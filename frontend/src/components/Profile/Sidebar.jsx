import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaBars, FaHeart, FaShoppingBag, FaCog } from 'react-icons/fa';


const Sidebar = ({ data }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const links = [
    { to: '/profile', label: 'Favourites', icon: <FaHeart /> },
    { to: '/profile/orderHistory', label: 'Order History', icon: <FaShoppingBag /> },
    { to: '/profile/settings', label: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div
      className={`bg-zinc-800 text-white flex flex-col justify-between shadow-lg transition-all duration-300 
        ${isCollapsed ? 'w-[72px]' : 'w-full md:w-[240px]'} min-h-[88vh] overflow-hidden`}
    >
      {/* Collapse Toggle */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-zinc-400 hover:text-white transition"
        >
          <FaBars />
        </button>
      </div>

      {/* Top Section */}
      <div className="flex flex-col items-center px-4 mt-[-50px] ">
        {/* Avatar */}
        {!isCollapsed && (
          <div className='bg-zinc-800 flex flex-col items-center mb-10'>
            <img
              src={data.avatar}
              alt="Avatar"
              className="h-[12vh] w-[12vh] rounded-full object-cover border-4 border-zinc-600"
            />
            <p className="mt-4 text-xl font-semibold text-center">
              {data.username}
            </p>
            <p className="text-sm text-zinc-400 text-center truncate max-w-[180px] mt-1">
              {data.email}
            </p>
            <div className="w-full mt-6 mb-4 h-px bg-zinc-600" />
          </div>
        )}

        {/* Navigation Links with Icons */}
        <div className="w-full flex flex-col gap-2 mt-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded font-semibold transition-all ${
                  isActive
                    ? 'bg-zinc-700 text-white hover:bg-zinc-900'
                    : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-700'
                } ${isCollapsed ? 'justify-center px-2' : ''}`
              }
            >
              <span className="text-lg">{link.icon}</span>
              {!isCollapsed && <span>{link.label}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 py-6">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-2 px-4 flex items-center justify-center gap-2 bg-zinc-700 text-zinc-100 hover:bg-zinc-900 rounded-lg font-semibold transition-all"
        >
          {!isCollapsed && 'Logout'} <FaSignOutAlt />
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-zinc-900 text-white p-6 rounded-lg shadow-lg w-[300px]">
            <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-sm text-zinc-300">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
