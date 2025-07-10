import { useState } from "react";
import { BandManagerCard } from "../components/bandManagerCard/BandManagerCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";

export const BandManagerDashboard = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleClick = async () => {
    const response = await userServices.logout();
    if (response.success) {
      dispatch({ type: "logout" });
      return navigate("/");
    }
    setError(response.message || "Error logging out");
    setTimeout(() => {
      setError(null);
    }, 3000)
  };

  return (
    <section
      className="bandManagerDashboard__container text-white vh-100"
      id="bandManagerDashboard"
    >
      <h2 className="bandManagerDashboard__title mt-5">
        Band Manager Dashboard
      </h2>
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-danger" onClick={handleClick}>
        logout
      </button>
      <div className="bandManagerDashboard__cardsContainer">
        {store.user?.bands?.map((band) => (
          <BandManagerCard
            key={band.id}
            bandName={band.name}
            img={band.logo}
            upcomingLives={band.nextLive}
          />
        ))}
      </div>
    </section>
  );
};
