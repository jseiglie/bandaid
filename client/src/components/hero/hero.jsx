import "./hero.css";
import { Link } from "react-router-dom";
import React from "react";

export const Hero = () => {
  return (
    <section className="px-3 text-center text-white hero-wrapper">
      <div className="hero-hook">
        <h1 className="fs-1">BandAid</h1>
        <p className="lead fw-bold">
          Cover is a one-page template for building simple and beautiful home
          pages. Download, edit the text, and add your own fullscreen background
          photo to make it your own.
        </p>
      </div>
      <p className="lead">
        <Link
          to="/login"
          className="btn btn-lg btn-light fw-bold border-white bg-white"
        >
          Hey ho, let's go!
        </Link>
      </p>
    </section>
  );
};
