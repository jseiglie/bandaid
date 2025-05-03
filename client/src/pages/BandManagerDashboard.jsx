import React from "react";
import { BandManagerCard } from "../components/bandManagerCard/BandManagerCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const BandManagerDashboard = () => {
  const { store, dispatch } = useGlobalReducer();
  console.log(store.user);
  
  return (
    <section
      className="bandManagerDashboard__container text-white vh-100"
      id="bandManagerDashboard"
    >
      <h2 className="bandManagerDashboard__title mt-5">Band Manager Dashboard</h2>
      <div className="bandManagerDashboard__cardsContainer">
        {store.user?.bands?.map((band) => (
          <BandManagerCard key={band.id} bandName={band.name} img={band.logo} upcomingLives={band.nextLive} />
        ))}
      </div>
    </section>
  );
};
