import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="nav nav-masthead justify-content-center float-md-end">
      <Link
        className="mx-2 nav-link text-white fw-bold py-1 px-0 active"
        aria-current="page"
        to="#"
      >
        Home
      </Link>
      <Link className="mx-2 nav-link text-white fw-bold py-1 px-0" to="#">
        Features
      </Link>
      <Link className="mx-2 nav-link text-white fw-bold py-1 px-0" to="#">
        Contact
      </Link>
    </nav>
  );
};
