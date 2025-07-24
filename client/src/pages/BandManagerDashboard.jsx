import { useState } from "react";
import { BandManagerCard } from "../components/bandManagerCard/BandManagerCard";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";
import userServices from "../services/userServices";
import { DashboardStart } from "../components/clientDashboard/dashboardStart/DashboardStart";
import { DashboardProfile } from "../components/clientDashboard/dashboardPorfile/DashboardProfile";
import { DashboardSettings } from "../components/clientDashboard/dashboardSettings/DashboardSettings";
import { DashboardBandProfile } from "../components/clientDashboard/dashboardBandProfile/DashboardBandProfile";

export const BandManagerDashboard = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const response = await userServices.logout();
    if (response.success) {
      dispatch({ type: "logout" });
      return navigate("/");
    }
    setError(response.message || "Error logging out");
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <section
      className="bandManagerDashboard__container vh-100"
      id="bandManagerDashboard"
    >
      <h2 className="bandManagerDashboard__title mt-5">Dashboard</h2>
      {error && <p className="text-danger">{error}</p>}

      <div className="d-flex  ">
        <div
          className="nav flex-column nav-pills me-3"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="p-3 fs-5 nav-link active text-start"
            id="v-pills-start-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-start"
            type="button"
            role="tab"
            aria-controls="v-pills-start"
            aria-selected="true"
          >
            <span className="fa-solid fa-house"></span> Start
          </button>
          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-profile-band-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile-band"
            type="button"
            role="tab"
            aria-controls="v-pills-profile-band"
            aria-selected="false"
          >
            <span className="fa-solid fa-users-rectangle"></span> Band Profile
          </button>
          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            <span className="fa-solid fa-address-card"></span> Profile
          </button>
          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-merchandise-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-merchandise"
            type="button"
            role="tab"
            aria-controls="v-pills-merchandise"
            aria-selected="false"
            disabled
          >
            <span className="fa-solid fa-store"></span> Merchandise
          </button>
          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
            disabled
          >
            <span className="fa-solid fa-envelope"></span> Messages
          </button>
          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            <span className="fa-solid fa-gear"></span> Settings
          </button>
          <button
            className="p-3 fs-5 nav-link text-danger text-start"
            id="v-pills-logout-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-logout"
            type="button"
            role="tab"
            aria-controls="v-pills-logout"
            aria-selected="false"
            onClick={handleLogout}
          >
            <span className="fa-solid fa-arrow-right-from-bracket"></span>{" "}
            Logout
          </button>
        </div>
        <div className="tab-content mx-auto" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active "
            id="v-pills-start"
            role="tabpanel"
            aria-labelledby="v-pills-start-tab"
            tabindex="0"
          >
            <DashboardStart />
          </div>

          <div
            className="tab-pane fade"
            id="v-pills-profile-band"
            role="tabpanel"
            aria-labelledby="v-pills-profile-band-tab"
            tabindex="0"
          >
            <DashboardBandProfile />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
            tabindex="0"
          >
            <DashboardProfile/>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-merchandise"
            role="tabpanel"
            aria-labelledby="v-pills-merchandise-tab"
            tabindex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
            tabindex="0"
            
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
            tabindex="0"
          >
            <DashboardSettings />
          </div>
        </div>
      </div>
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
