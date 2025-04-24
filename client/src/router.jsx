import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home";
import { Test } from "./pages/test";
import { Login } from "./pages/Login";
import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { BandPrivate } from "./pages/BandPrivate";
import { BandPublic } from "./pages/BandPublic";
import { BandManagerDashboard } from "./pages/BandManagerDashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" index element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/profile" element={<Profile />} />
      <Route path="/band_manager" element={<BandManagerDashboard />} />
      <Route path="/band_manager/:band_name" element={<BandPrivate />} />
      <Route path="/band/:band_name" element={<BandPublic />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<h1>Not found!</h1>} />
    </Route>
  )
);
