import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import Favorites from "./pages/Favorites.jsx";
import BookDetails from "./pages/BookDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> }, // "/" → Home
      { path: "category/:topic", element: <Category /> },
      { path: "favorites", element: <Favorites /> },
      { path: "book/:id", element: <BookDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);