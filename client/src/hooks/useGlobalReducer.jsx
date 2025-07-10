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
      const result = data.data;
      dispatch({ type: "store", payload: { key: "bands", result } });
    });

    store.user?.bands?.map((el) =>
      setListServices.getSetLists(el.id).then((data) => {
        const result = data.data;
        dispatch({ type: "store", payload: { key: "setLists", result } });
      })
    );

    liveServices.getLives().then((data) => {
      const result = data.data;
      dispatch({ type: "store", payload: { key: "lives", result } });
    });
    songServices.getSongs().then((data) => {
      const result = data.data;
      dispatch({ type: "store", payload: { key: "songs", result } });
    });
    userServices.getUsers().then((data) => {
      const result = data.data;
      dispatch({ type: "store", payload: { key: "users", result } });
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
