import Loader from "./Loader";

export default function StatusMessage({ loading, error, empty, children }) {
  if (loading) return <Loader />;
  if (error) return <p className="status-error">{error}</p>;
  if (empty) return <p className="status-empty">No books found.</p>;
  return <>{children}</>;
}