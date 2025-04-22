import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export const Navbar = () => {
  return (
    <nav className="nav nav-masthead nav-bg  justify-content-center float-md-end sticky-top p-2">
      <Link
        className="mx-2 nav-link text-white fw-bold py-1 px-0 active"
        aria-current="page"
        to="/"
      >
        Home
      </Link>
      <Link className="mx-2 nav-link text-white fw-bold py-1 px-0" to="/features">
        Features
      </Link>
      <Link className="mx-2 nav-link text-white fw-bold py-1 px-0" to="/contact">
        Contact
      </Link>
      <Link className="mx-2 nav-link text-white fw-bold py-1 px-0" to="/login">
      <span className="fa-regular fa-xl fa-circle-user"></span>
      </Link>
    </nav>
  );
};
