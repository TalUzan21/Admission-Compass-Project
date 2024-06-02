import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
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
    </footer>
  );
};

export default Footer;
