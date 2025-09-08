import { useParams } from "react-router-dom";
import BookList from "../components/BookList.jsx";
import usePaginatedBooks from "../hooks/usePaginatedBooks.js";
import StatusMessage from "../components/StatusMessage.jsx";
import { fetchBooksByCategory } from "../api.js";

const TOPIC_MAP = {
  Fiction: "Fiction",
  Mystery: "Mystery",
  Thriller: "Thriller",
  Romance: "Romance",
  Fantasy: "Fantasy",
  Morality: "Morality",
  Society: "Society",
  Power: "Power",
  Justice: "Justice",
  Adventure: "Adventure",
  Tragedy: "Tragedy",
  War: "War",
  Philosophy: "Philosophy",
};

export default function Category() {
  const { topic } = useParams();
  const apiTopic = TOPIC_MAP[topic] || topic.toLowerCase();

  const { books, loading, error, page, hasNext, nextPage, prevPage } =
    usePaginatedBooks(fetchBooksByCategory, apiTopic);

  return (
    <div>
      <h2>Kategori: {topic}</h2>

      <StatusMessage
        loading={loading}
        error={error}
        empty={!loading && !error && books.length === 0}
      >
        <BookList books={books} />

        <div className="pagination-container" style={{ marginTop: "1rem" }}>
          <button onClick={prevPage} disabled={page === 1}>
            ← Forrige
          </button>
          <span style={{ margin: "0 1rem" }}>Side {page}</span>
          <button onClick={nextPage} disabled={!hasNext}>
            Neste →
          </button>
        </div>
      </StatusMessage>
    </div>
  );
}
