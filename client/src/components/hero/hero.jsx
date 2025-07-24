import "./hero.css";
import { Link } from "react-router-dom";
import React from "react";

export const Hero = () => {
  return (
    <section className="p-3 text-center text-white hero-wrapper">
      <div className="hero-hook p-3">
        <h1 className="fs-1">BandAid</h1>
        <p className="lead fw-bold">
          Your own personal manager for all things band-related and your one-stop solution for finding and connecting with local bands.
        </p>
      </div>
      <p className="lead my-3">
        <Link
          to="/login"
          className="btn btn-lg hero-btn bg-dark fw-bold  text-white border-3 "
        >
          Hey ho, let's go!
        </Link>
      </p>
    </section>
  );
};
