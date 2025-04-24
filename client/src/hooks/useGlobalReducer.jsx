import { useContext, useReducer, createContext, useEffect } from "react";
import storeReducer, { initialStore } from "../state/store";
import setListServices from "../services/setListServices";
import bandServices from "../services/bandServices";
import liveServices from "../services/liveServices";
import songServices from "../services/songServices";
import userServices from "../services/userServices";
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

    bandServices.getBands().then((data) => {
      dispatch({ type: "store", payload: { key: "bands", data } });
    });

    setListServices.getSetLists().then((data) => {
      dispatch({ type: "store", payload: { key: "setLists", data } });
    });
    liveServices.getLives().then((data) => {
      dispatch({ type: "store", payload: { key: "lives", data } });
    });
    songServices.getSongs().then((data) => {
      dispatch({ type: "store", payload: { key: "songs", data } });
    });
    userServices.getUsers().then((data) => {
      dispatch({ type: "store", payload: { key: "users", data } });
    });

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
