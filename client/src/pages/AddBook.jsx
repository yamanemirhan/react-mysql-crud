import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page ">
      <h1 className="header">Add a New Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        className="input"
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
        className="input"
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
        className="input"
        min={0}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
        className="input"
      />
      <button className="mt-3" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default AddBook;
