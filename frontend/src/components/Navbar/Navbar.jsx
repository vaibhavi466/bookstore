import React, { useState } from 'react';
import logo from '../../assets/book.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn ?? false);
  const role = useSelector((state) => state.auth?.role ?? '');

  // Common and Role-based links
  const commonLinks = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
    { title: 'About Us', link: '/about-us' },
  ];

  const userLinks = [
    { title: 'Cart', link: '/cart' },
    { title: 'Profile', link: '/profile' },
  ];

  const adminLinks = [
    { title: 'Admin Profile', link: '/profile' },
  ];

  let filteredLinks = [...commonLinks];
  if (isLoggedIn && role === 'user') {
    filteredLinks = [...filteredLinks, ...userLinks];
  } else if (isLoggedIn && role === 'admin') {
    filteredLinks = [...filteredLinks, ...adminLinks];
  }

  return (
    <div className="bg-zinc-700 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img className="h-12 sm:h-14" src={logo} alt="logo" />
          <h1 className="text-xl sm:text-2xl font-semibold">BookHeaven</h1>
        </div>

        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {filteredLinks.map((item, i) => (
            <Link key={i} to={item.link} className="hover:text-blue-400">
              {item.title}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-white"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 lg:hidden flex flex-col gap-4">
          {filteredLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              onClick={() => setMenuOpen(false)}
              className="text-base hover:text-blue-400 transition"
            >
              {item.title}
            </Link>
          ))}

          {!isLoggedIn && (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                to="/login"
                className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
