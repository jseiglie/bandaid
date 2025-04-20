import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

function App() {

  console.log(process.env.VITE_APP_API_URL);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
