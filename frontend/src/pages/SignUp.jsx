import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl text-center">Sign Up</p>

        {/* Username */}
        <div className="mt-4">
          <label htmlFor="username" className="text-zinc-400">Username</label>
          <input
            type="text"
            name="username"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label htmlFor="email" className="text-zinc-400">Email</label>
          <input
            type="email"
            name="email"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="xyz@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password" className="text-zinc-400">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Register Button */}
        <div className="mt-6 text-center">
          <button className="bg-yellow-100 text-zinc-900 px-6 py-2 rounded font-semibold hover:bg-yellow-200 transition">
            Register
          </button>
        </div>

        {/* Login Redirect */}
        <p className="text-zinc-400 text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-100 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
