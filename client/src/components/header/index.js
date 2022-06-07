import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles.css";

export default function Header({ setLoggedIn }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    toast.info('Logout successful');
    // window.location.reload();
  }

  return (
    <nav className="navigation">
      <Link to="/" className="brand-name">
        Financepeer
      </Link>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from Heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
          height={24}
          width={24}
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
            <li>
                <Link to="/" className="nav-link">
                    Home
                </Link>
            </li>
            <li>
                <Link to="/upload" className="nav-link">
                    Upload
                </Link>
            </li>
            <li>
                <Link to="/login" className="nav-link">
                    <div onClick={handleLogout}>
                      Logout
                    </div>
                </Link>
            </li>     
        </ul>
      </div>
    </nav>
  );
}