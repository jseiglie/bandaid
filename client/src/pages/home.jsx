import React from "react";
import { Hero } from "../components/hero/hero";
import { Features } from "../components/features/Features";
export const Home = () => {
  return (
    <main className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column  justify-content-center">
     

      <Hero />
      <Features/>
    </main>
  );
};
