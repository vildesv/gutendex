import BookCard from "./BookCard.jsx";

export default function BookList({ books }) {
  if (!books || books.length === 0) return null;

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}