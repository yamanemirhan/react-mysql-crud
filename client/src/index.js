import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AddBook from "./pages/AddBook";
import UpdateBook from "./pages/UpdateBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add-book",
    element: <AddBook />,
  },
  {
    path: "/update-book/:id",
    element: <UpdateBook />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
