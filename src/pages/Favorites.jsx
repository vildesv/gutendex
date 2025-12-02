import useLocalStorage from "../hooks/useLocalStorage.js";
import StatusMessage from "../components/StatusMessage.jsx";
import { FaTrash } from "react-icons/fa"; // icon for remove-btn

export default function Favorites() {
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter((b) => b.id !== id));
  };

  // BookCard med remove-knapp
  const FavoriteBookCard = ({ book }) => (
    <div className="book-card">
      {book.formats["image/jpeg"] ? (
        <img src={book.formats["image/jpeg"]} alt={book.title} />
      ) : (
        <div className="book-cover-placeholder">No picture</div>
      )}
      <h3>{book.title}</h3>
      <p>{book.authors?.map((a) => a.name).join(", ") || "Unknown"}</p>
      <button
        className="remove-fav-btn"
        onClick={() => removeFavorite(book.id)}
        title="Remove from favorites"
      >
        <FaTrash />
      </button>
    </div>
  );

  return (
    <div>
      <h2>Favorites</h2>
      <StatusMessage
        loading={false}
        error={null}
        empty={favorites.length === 0}
      >
        <div className="book-list">
          {favorites.map((book) => (
            <FavoriteBookCard key={book.id} book={book} />
          ))}
        </div>
      </StatusMessage>
    </div>
  );
}