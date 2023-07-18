import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "<YOUR_PASSWORD>",
  database: "<YOUR_DATABASE>",
});

// GET ALL BOOKS
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(data);
  });
});
// ADD A NEW BOOK
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(201).json("Book has been created successfully.");
  });
});
// DELETE A BOOK
app.delete("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;

  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("Book has been deleted successfully.");
  });
});
// UPDATE A BOOK
app.put("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;

  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
