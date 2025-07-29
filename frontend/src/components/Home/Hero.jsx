import React from 'react';
import hero from '../../assets/hero.png';
import RecentlyAdded from './RecentlyAdded';

const Hero = () => {
  return (
    <>
      <div className="min-h-[75vh] flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 py-10 bg-gradient-to-br from-zinc-900 to-zinc-800 gap-10">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-yellow-100 leading-tight">
            Discover your next Great Read
          </h1>
          <p className="mt-4 text-base md:text-lg lg:text-xl text-zinc-300">
            Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books!
          </p>
          <button className="inline-block mt-6 text-yellow-100 text-lg md:text-xl font-semibold border border-yellow-100 px-6 md:px-8 py-2 hover:bg-yellow-100 hover:text-zinc-900 transition rounded-full cursor-pointer">
            Discover Books
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <img
            src={hero}
            alt="Hero Illustration"
            className="w-[80%] md:w-[70%] lg:w-[90%] max-w-[500px] object-contain"
          />
        </div>
      </div>

      {/* ✅ ADD THIS — RecentlyAdded Component Rendered Below Hero */}
      <RecentlyAdded />
    </>
  );
};

export default Hero;
