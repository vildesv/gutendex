import { useState, useEffect } from "react";

export default function usePaginatedBooks(fetchFn, queryOrTopic) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFn(queryOrTopic, page);
        setBooks(data.results);
        setHasNext(!!data.next);
      } catch (err) {
        setError("Could not fetch books. Try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [fetchFn, queryOrTopic, page]);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  return { books, loading, error, page, hasNext, nextPage, prevPage };
}
