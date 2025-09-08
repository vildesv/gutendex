// App.jsx
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>
        <p className="footer-text">© {new Date().getFullYear()} Gutendex by Vilde Svenkesen</p>
      </footer>
    </div>
  );
}

export default App;