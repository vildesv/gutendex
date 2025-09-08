const BASE_URL = "https://gutendex.com/books";

export async function fetchBooks(query = "", page = 1) {
  const url = query
    ? `${BASE_URL}?search=${encodeURIComponent(query)}&page=${page}`
    : `${BASE_URL}?page=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching books");
  return res.json();
}

/**
 * Henter bøker basert på kategori (subjects)
 */
export async function fetchBooksByCategory(category, page = 1) {
  // API-et bruker "subjects" i stedet for "topic"
  const url = `${BASE_URL}?subjects=${encodeURIComponent(category.toLowerCase())}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error fetching books by category");
  return res.json();
}

export async function fetchBookDetails(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Could not fetch book details");
  return res.json();
}
