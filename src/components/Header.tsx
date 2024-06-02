import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header>
      <h1>
        <img src=".\accept.jpg" alt="Admission Compass Logo" className="logo" />
        <Link to="/" className="home-link">
          Admission Compass
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/search"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Search
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Student Upload"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              Student Upload
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "nav-link active-link" : "nav-link"
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
