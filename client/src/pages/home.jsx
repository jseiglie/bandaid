import { Hero } from "../components/hero/hero";
import { Features } from "../components/features/Features";
import { RegisteredBands } from "../components/registered_bands/RegisteredBands";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <main className=" d-flex w-100 h-100 mx-auto flex-column  justify-content-center">
     <Link to="/subscribe" className="btn btn-primary mb-3">
        Testing
        </Link>
      <Hero />
      <Features/>

      <RegisteredBands />
    </main>
  );
};
