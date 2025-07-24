import { Hero } from "../components/hero/hero";
import { Features } from "../components/features/Features";
import { RegisteredBands } from "../components/registered_bands/RegisteredBands";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <main className=" ">
      <Hero />
      <Features/>

      <RegisteredBands />
    </main>
  );
};
