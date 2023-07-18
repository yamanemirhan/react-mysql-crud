import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, [books]);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page overflow-auto">
      <h1 className="header">My Book Shop</h1>
      <button className="my-1">
        <Link to="/add-book">Add a New Book</Link>
      </button>
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {books.map((book) => (
          <div
            key={book.id}
            className="w-96 border bg-slate-900 flex flex-col gap-1"
          >
            {book.cover && (
              <img
                src={book.cover}
                alt={book.title}
                className="w-72 h-80 mx-auto"
              />
            )}
            <h2 className="text-center text-xl">{book.title}</h2>
            <p className="p-1">
              {book.desc.length > 145
                ? book.desc.slice(0, 145) + "..."
                : book.desc}
            </p>
            <span className="ml-auto mr-3">{book.price} TL</span>
            <div className="mt-auto flex flex-col gap-2">
              <button
                className="text-rose-500"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
              <button className="text-indigo-400">
                <Link state={{ book: book }} to={`/update-book/${book.id}`}>
                  Update
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
