import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { StoreProvider } from "./hooks/useGlobalReducer.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";

const Main = () => {
  return (
    <StrictMode>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<Main />);