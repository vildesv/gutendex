import { useSearchParams } from "react-router-dom";
import BookList from "../components/BookList.jsx";
import usePaginatedBooks from "../hooks/usePaginatedBooks.js";
import StatusMessage from "../components/StatusMessage.jsx";
import { fetchBooks } from "../api.js";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

  // Bruk hooken med søk
  const { books, loading, error, page, hasNext, nextPage, prevPage } =
    usePaginatedBooks(fetchBooks, query);

  return (
    <div>
      <h2>{query ? `Search results for "${query}"` : "Popular books"}</h2>

      <StatusMessage
        loading={loading}
        error={error}
        empty={!loading && !error && books.length === 0}
      >
        <BookList books={books} />

        <div className="pagination-container" style={{ marginTop: "1rem" }}>
          <button onClick={prevPage} disabled={page === 1}>
            ← Previous
          </button>
          <span style={{ margin: "0 1rem" }}>Page {page}</span>
          <button onClick={nextPage} disabled={!hasNext}>
            Next →
          </button>
        </div>
      </StatusMessage>
    </div>
  );
}
