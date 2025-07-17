import React, { useState } from "react";

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    language: "English",
    price: "",
    url: "",
  });

  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (
    !formData.title ||
    !formData.author ||
    !formData.desc ||
    !formData.language ||
    !formData.price ||
    !formData.url
  ) {
    setError("⚠️ Please fill out all fields.");
    return;
  }

  setError("");
  setIsLoading(true); // start loading

  // Simulate a delay like an API call
  setTimeout(() => {
    console.log("✅ Book added:", formData);
    setShowDialog(true);
    setIsLoading(false); // stop loading

    setFormData({
      title: "",
      author: "",
      desc: "",
      language: "English",
      price: "",
      url: "",
    });
  }, 1500); // 1.5s delay
};


  return (
    <div className="min-h-[88vh] bg-zinc-950 text-white px-4 sm:px-6 py-10 relative font-sans">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-400 drop-shadow">
          📘 Add New Book
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800/90 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-5 border border-zinc-700"
        >
          {error && (
            <p className="text-red-400 text-sm text-center -mt-3">{error}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="title"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="author"
              placeholder="Author Name"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Marathi">Marathi</option>
              <option value="Spanish">Spanish</option>
            </select>

            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <textarea
            name="desc"
            placeholder="Book Description"
            value={formData.desc}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="url"
            placeholder="Image URL"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow transition-all duration-200 ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-600'
                }`}
                >
                {isLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isLoading ? "Adding..." : "Add Book"}
            </button>

        </form>
      </div>

      {/* ✅ Enhanced Celebration Dialog */}
        {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-blue-800/80 to-zinc-900/90 p-8 rounded-2xl shadow-2xl text-center border border-blue-600 animate-cone-pop">
                <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                    🎉 Book Added!
                </h2>
                <p className="text-zinc-300 text-sm mb-6">
                    Your book has been successfully added to the collection.
                </p>
                <button
                    onClick={() => setShowDialog(false)}
                    className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 transition delay-100"
                >
                    OK
                </button>
                </div>
            </div>
        )}

      {/* ✨ Scale Animation */}
      <style>
        {`
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        `}
      </style>
    </div>
  );
};

export default AddBook;
