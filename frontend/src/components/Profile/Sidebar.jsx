import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // ✅ Required for dispatch
import { FaArrowRightFromBracket, FaBars } from 'react-icons/fa6';
import { authActions } from '../../store/auth'; // ✅ Adjust the path if needed

const Sidebar = ({ data }) => {
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch(); // ✅ Required to dispatch logout actions
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
      <div className="flex flex-col items-center px-4 mt-[-50px]">
        {/* Avatar */}
        {!isCollapsed && (
          <div className="bg-zinc-800 flex flex-col items-center mb-10">
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

        {/* Navigation Links */}
        {role === "user" && 
        <div className="w-full flex flex-col gap-2 mt-2">
          {[
            { to: '/profile', label: 'Favourites' },
            { to: '/profile/orderHistory', label: 'Order History' },
            { to: '/profile/settings', label: 'Settings' },
          ].map((link) => (
            <NavLink
                key={link.to}
                to={link.to}
                end // ✅ THIS ensures only exact path is matched
                className={({ isActive }) =>
                  `block w-full text-center py-2 rounded font-semibold transition-all
                  ${isActive 
                      ? 'bg-zinc-900 text-white' 
                      : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white'}
                  ${isCollapsed ? 'text-xs px-2' : ''}`
                }
              >
                {isCollapsed ? link.label[0] : link.label}
            </NavLink>
          ))}
        </div>}
      </div>

      {role === "admin" && 
      <div className="w-full flex flex-col gap-2 mt-2">
          {[
            { to: '/profile', label: 'All Orders' },
            { to: '/profile/add-book', label: 'Add Book' },
            
          ].map((link) => (
            <NavLink
                key={link.to}
                to={link.to}
                end // ✅ THIS ensures only exact path is matched
                className={({ isActive }) =>
                  `block w-full text-center py-2 rounded font-semibold transition-all
                  ${isActive 
                      ? 'bg-zinc-900 text-white' 
                      : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white'}
                  ${isCollapsed ? 'text-xs px-2' : ''}`
                }
              >
                {isCollapsed ? link.label[0] : link.label}
            </NavLink>
          ))}
        </div>}






      {/* Logout Button */}
      <div className="px-4 py-6">
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="w-full py-2 px-4 flex items-center justify-center gap-2 bg-zinc-700 text-zinc-100 hover:bg-zinc-900 rounded-lg font-semibold transition-all"
        >
          {!isCollapsed && 'Logout'} <FaArrowRightFromBracket />
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
                onClick={() => {
                  dispatch(authActions.logout()); // ✅ Logs out
                  dispatch(authActions.changeRole("user")); // ✅ Optional role reset
                  localStorage.removeItem("id"); // ✅ Correct way to clear keys
                  localStorage.removeItem("token");
                  localStorage.removeItem("role");
                  history("/"); // ✅ Corrected from history()
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition flex items-center gap-2"
              >
                Logout <FaArrowRightFromBracket />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
