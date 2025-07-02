import React, { useState } from 'react';
import logo from '../../assets/book.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { title: 'Home', link: '/' },
    { title: 'About Us', link: '/about-us' },
    { title: 'All Books', link: '/all-books' },
    { title: 'Cart', link: '/cart' },
    { title: 'Profile', link: '/profile' },
  ];

  return (
    <div className="bg-zinc-700 text-white px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-4">
          <img className="h-12 sm:h-14" src={logo} alt="logo" />
          <h1 className="text-xl sm:text-2xl font-semibold">BookHeaven</h1>
        </Link>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Navigation + Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-base hover:text-blue-400 transition"
            >
              {item.title}
            </Link>
          ))}
          <div className="flex gap-3">
            <Link to="/LogIn" className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition">
              Sign In
            </Link>
            <Link to="/SignUp" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="mt-4 lg:hidden flex flex-col gap-4">
          {links.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-base hover:text-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2">
            <button className="px-4 py-2 border border-blue-500 text-blue-400 rounded hover:bg-blue-500 hover:text-white transition">
              Sign In
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
