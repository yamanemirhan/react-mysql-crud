import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookdId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookdId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page ">
      <h1 className="header">Update the Book</h1>
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
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
        className="input"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateBook;
