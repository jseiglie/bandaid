import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "./App";
import { Home } from "./pages/home";
import { Test } from "./pages/test";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" index element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="*" element={<h1>Not found!</h1>} />
    </Route>
  )
);
