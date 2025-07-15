import { Link } from 'react-router-dom';

const AllBooks = () => {
  const books = [
    {
      id: 'book1',
      title: 'Atomic Habits',
      author: 'James Clear',
      url: 'https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg',
    },
    {
      id: 'book2',
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      url: 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UF1000,1000_QL80_.jpg',
    },
  ];

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {books.map((book) => {
        console.log("Book link generated for:", book.id);
        return (
          <div key={book.id} className="bg-zinc-700 p-4 rounded">
            <img
              src={book.url}
              alt={book.title}
              className="h-48 w-full object-cover rounded"
            />
            <h2 className="text-xl mt-2">{book.title}</h2>
            <p className="text-zinc-400">by {book.author}</p>

            <Link
              to={`/view-book-details/${book.id}`}
              className="mt-4 inline-block text-blue-400 hover:underline"
            >
              View Details
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default AllBooks;
