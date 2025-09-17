import { useSearchParams } from "react-router-dom"; 
import BookList from "../components/BookList.jsx";
import usePaginatedBooks from "../hooks/usePaginatedBooks.js";
import StatusMessage from "../components/StatusMessage.jsx";
import { fetchBooks } from "../api.js";

export default function Home() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";

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

        <div className="pagination-container">
          {page > 1 ? (
            <button onClick={prevPage}>← Previous</button>
          ) : (
            <div className="pagination-placeholder"></div>
          )}

          <span>Page {page}</span>

          {hasNext ? (
            <button onClick={nextPage}>Next →</button>
          ) : (
            <div className="pagination-placeholder"></div>
          )}
        </div>
      </StatusMessage>
    </div>
  );
}
