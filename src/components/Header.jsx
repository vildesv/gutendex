import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/gutendex-logo.png";

export default function Header() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Philosophy",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(search ? `/?search=${encodeURIComponent(search)}` : "/");
    setSearch("");
  };

  return (
    <header>
      <img src={logo} alt="Gutendex logo" className="logo" />
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        {categories.map((cat) => (
          <NavLink key={cat} to={`/category/${cat.toLowerCase()}`}>
            {cat}
          </NavLink>
        ))}

        {/* Search field with icon */}
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for books..."
          />
          <button type="submit">
            <FiSearch size={16} />
          </button>
        </form>
      </nav>
    </header>
  );
}
