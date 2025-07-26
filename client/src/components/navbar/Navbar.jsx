import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  const handleLogout = () => {
    dispatch({ type: "store", payload: { key: "user", data: null } });
    localStorage.removeItem("user", "token");
  };
  return (
    <nav className="nav nav-bg  justify-content-center sticky-top p-2 ">
      <Link
        className="mx-2 nav-link text-white fw-bold py-1 px-0 active"
        aria-current="page"
        to="/"
      >
        Home
      </Link>
      <Link
        className="mx-2 nav-link text-white fw-bold py-1 px-0"
        to="/features"
      >
        Features
      </Link>
      <Link
        className="mx-2 nav-link text-white fw-bold py-1 px-0"
        to="/contact"
      >
        Contact
      </Link>

      <div className="text-end  d-flex">
        {store.user && (
          <Link
            className="mx-2 nav-link text-white fw-bold py-1 px-0 position-relative"
            to="/cart"
          >
            <span className="fa-solid fa-xl fa-cart-shopping"></span>
            {store.user.cart.CartItems.length > 0 && (
              <span className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-primary">
                {store.user.cart.CartItems.length}
                <span className="visually-hidden">items</span>
              </span>
            )}
          </Link>
        )}
        <Link
          className="mx-2 nav-link text-white fw-bold py-1 px-0"
          to={store.user ? "/band_manager" : "/auth"}
        >
          <span className="fa-regular fa-xl fa-circle-user"></span>
        </Link>
      </div>
    </nav>
  );
};
