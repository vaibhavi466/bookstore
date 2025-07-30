import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateBook = () => {
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
  const [isFetching, setIsFetching] = useState(true); // New loading state for fetch
  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Prefill the form with existing book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`/api/books/${id}`);
        if (res.data) {
          setFormData({
            title: res.data.title || "",
            author: res.data.author || "",
            desc: res.data.desc || "",
            language: res.data.language || "English",
            price: res.data.price || "",
            url: res.data.url || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch book:", err);
        setError("❌ Failed to load book data.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, desc, language, price, url } = formData;
    if (!title || !author || !desc || !language || !price || !url) {
      setError("⚠️ Please fill out all fields.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await axios.put(`/api/books/${id}`, formData);
      setShowDialog(true);
      

    } catch (error) {
      console.error("Failed to update book:", error);
      setError("❌ Failed to update book. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] bg-zinc-950 text-white px-4 sm:px-6 py-10 relative font-sans">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-400 drop-shadow">
          📘 Update Book
        </h2>

        {/* ⏳ Show loading while fetching book data */}
        {isFetching ? (
          <p className="text-center text-gray-400">Loading book data...</p>
        ) : (
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
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-600"
              }`}
            >
              {isLoading && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {isLoading ? "Updating..." : "Update Book"}
            </button>
          </form>
        )}
      </div>

      {/* ✅ Confirmation Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-800/80 to-zinc-900/90 p-8 rounded-2xl shadow-2xl text-center border border-blue-600 animate-cone-pop">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
              ✅ Book Updated!
            </h2>
            <p className="text-zinc-300 text-sm mb-6">
              The book details have been successfully updated.
            </p>
            <button
              onClick={() => {
                setShowDialog(false);
                navigate("/all-books");
              }}
              className="px-6 py-2 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-blue-100 transition delay-100"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
