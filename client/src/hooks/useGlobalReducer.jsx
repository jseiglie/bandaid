import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../state/store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  useEffect(() => {
    // Initialize the store with data from localStorage if available.
    const storedData = localStorage.getItem("store");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch({ type: "init", payload: parsedData });
    }
    fetch("http://localhost:3000/api/band/bands")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // Handle the response data as needed.
      })
      .catch((err) => console.error(err));
    dispatch({ type: "test", payload: { ok: true } });
  }, []);
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook to access the global state and dispatch function.
export default function useGlobalReducer() {
  const { dispatch, store } = useContext(StoreContext);
  return { dispatch, store };
}
