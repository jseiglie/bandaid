import "./hero.css";

import React from "react";

export const Hero = () => {
  return (
    <section className="px-3 text-center text-white hero-wrapper">
      <h1>BandAid</h1>
      <p className="lead">
        Cover is a one-page template for building simple and beautiful home
        pages. Download, edit the text, and add your own fullscreen background
        photo to make it your own.
      </p>
      <p className="lead">
        <a
          href="/login"
          className="btn btn-lg btn-light fw-bold border-white bg-white"
        >
          Hey ho, let's go!
        </a>
      </p>
    </section>
  );
};
