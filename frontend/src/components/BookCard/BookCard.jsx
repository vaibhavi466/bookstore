import React from 'react';

const BookCard = ({ data }) => {
  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-xl transition-transform hover:scale-105 duration-300">
      
      {/* Book Image */}
      <div className="bg-zinc-900 rounded-md flex items-center justify-center h-[25vh] w-full overflow-hidden">
        <img
          src={data.url}
          alt={data.title}
          className="h-full w-auto object-contain"
        />
      </div>

      {/* Book Title */}
      <h2 className="mt-4 text-lg text-white font-semibold text-center line-clamp-2">
        {data.title}
      </h2>

      {/* Author */}
      <p className="text-zinc-400 text-sm mt-1 text-center">
        by {data.author || 'Unknown Author'}
      </p>

      {/* Price */}
      <p className="text-yellow-100 font-bold mt-2 text-lg">
        ₹ {data.price || 'N/A'}
      </p>
    </div>
  );
};

export default BookCard;
