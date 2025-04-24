import React from "react";
import { Hero } from "../components/hero/hero";
import { Features } from "../components/features/Features";
import { RegisteredBands } from "../components/registered_bands/RegisteredBands";
export const Home = () => {
  return (
    <main className=" d-flex w-100 h-100 mx-auto flex-column  justify-content-center">
     

      <Hero />
      <Features/>

      <RegisteredBands />
    </main>
  );
};
