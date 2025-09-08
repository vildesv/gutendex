import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBookDetails } from "../api.js";
import useLocalStorage from "../hooks/useLocalStorage.js";
import StatusMessage from "../components/StatusMessage.jsx";
import "./BookDetails.css"; // Legger styling her

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [favorites, setFavorites] = useLocalStorage("favorites", []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isFavorite = favorites.some((f) => f.id === parseInt(id));

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchBookDetails(id);
        if (!data) throw new Error("No book found.");
        setBook(data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch book details.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const toggleFavorite = () => {
    if (!book) return;
    if (isFavorite) {
      setFavorites(favorites.filter((f) => f.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  return (
    <StatusMessage
      loading={loading}
      error={error}
      empty={!loading && !error && !book}
    >
      {book && (
        <div className="book-details">
          <h2>{book.title}</h2>

          {book.formats["image/jpeg"] ? (
            <img
              src={book.formats["image/jpeg"]}
              alt={book.title}
              className="book-cover"
            />
          ) : (
            <div className="book-cover-placeholder">No picture available</div>
          )}

          <p><strong>Author:</strong> {book.authors?.map((a) => a.name).join(", ") || "Unknown"}</p>
          <p><strong>Downloads:</strong> {book.download_count}</p>
          <p><strong>Language:</strong> {book.languages?.join(", ") || "Unknown"}</p>
          {book.subjects && book.subjects.length > 0 && (
            <p><strong>Categories:</strong> {book.subjects.join(", ")}</p>
          )}

          {book.formats["text/html"] && (
            <a
              href={book.formats["text/html"]}
              target="_blank"
              rel="noreferrer"
              className="read-link"
            >
              Read the book
            </a>
          )}

          <button className="favorite-btn" onClick={toggleFavorite}>
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </button>
        </div>
      )}
    </StatusMessage>
  );
}