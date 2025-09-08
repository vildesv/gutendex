import { Link } from "react-router-dom";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { Heart, HeartFill } from "react-bootstrap-icons"; // npm install react-bootstrap-icons

export default function BookCard({ book }) {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [isFav, setIsFav] = useState(favorites.some((f) => f.id === book.id));

  const toggleFavorite = () => {
    if (isFav) {
      setFavorites(favorites.filter((f) => f.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
    setIsFav(!isFav);
  };

  const title = book.title.length > 30 ? book.title.slice(0, 30) + "..." : book.title;
  const authors = book.authors?.map((a) => a.name).join(", ") || "Unknown";

  return (
    <div className="book-card">
      <Link to={`/book/${book.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        {book.formats["image/jpeg"] ? (
          <img src={book.formats["image/jpeg"]} alt={book.title} />
        ) : (
          <div
            style={{
              height: "240px",
              background: "#555",
              borderRadius: "8px",
              marginBottom: "0.5rem",
            }}
          />
        )}
        <h3>{title}</h3>
        <p>{authors}</p>
      </Link>

      <div className="favorite-icon" onClick={toggleFavorite}>
        {isFav ? <HeartFill color="#ff6b6b" /> : <Heart color="#ff6b6b" />}
      </div>
    </div>
  );
}
