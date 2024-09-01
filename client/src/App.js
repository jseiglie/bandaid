import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./views/home.jsx";

function App() {
  const basename = process.env.REACT_APP_BASENAME || "";

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
