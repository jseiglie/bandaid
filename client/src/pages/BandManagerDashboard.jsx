import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!store.user) {
      if (localStorage.getItem("token")) {
        userServices.getUserInfo().then((data) => {
          if (data.success) {
            dispatch({
              type: "store",
              payload: { key: "user", result: data.data },
            });
            localStorage.setItem("user", JSON.stringify(data.data));
          }
        });
      } else {
        navigate("/");
      }
    }
  }, [store.user, navigate]);

  return (
    <section
      className="bandManagerDashboard__container "
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
            id="v-pills-songs-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-songs"
            type="button"
            role="tab"
            aria-controls="v-pills-songs"
            aria-selected="false"
          >
            <span className="fa-solid fa-music"></span> Songs
          </button>

          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-setLists-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-setLists"
            type="button"
            role="tab"
            aria-controls="v-pills-setLists"
            aria-selected="false"
          >
            <span className="fa-solid fa-bars-staggered"></span> Setlists
          </button>

          <button
            className="p-3 fs-5 nav-link text-start"
            id="v-pills-lives-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-lives"
            type="button"
            role="tab"
            aria-controls="v-pills-lives"
            aria-selected="false"
          >
            <span className="fa-solid fa-guitar"></span> Lives
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
            className="p-3 fs-5 nav-link  text-start"
            id="v-pills-cart-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-cart"
            type="button"
            role="tab"
            aria-controls="v-pills-cart"
            aria-selected="false"
          >
            <span className="fa-solid fa-cart-shopping"></span> Cart
            {store.user.cart.CartItems.length > 0 && (
              <span className="ms-2 translate-middle badge rounded-pill bg-primary">
                {store.user.cart.CartItems.length}
                <span className="visually-hidden">items</span>
              </span>
            )}
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
        <div className="tab-content mx-auto w-75" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active "
            id="v-pills-start"
            role="tabpanel"
            aria-labelledby="v-pills-start-tab"
            tabIndex="0"
          >
            <DashboardStart />
          </div>

          <div
            className="tab-pane fade"
            id="v-pills-profile-band"
            role="tabpanel"
            aria-labelledby="v-pills-profile-band-tab"
            tabIndex="0"
          >
            <DashboardBandProfile />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
            tabIndex="0"
          >
            <DashboardProfile />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-songs"
            role="tabpanel"
            aria-labelledby="v-pills-songs-tab"
            tabIndex="0"
          >
            <p>Songs management will be here soon!</p>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-setLists"
            role="tabpanel"
            aria-labelledby="v-pills-setLists-tab"
            tabIndex="0"
          >
            <p>Setlists management will be here soon!</p>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-lives"
            role="tabpanel"
            aria-labelledby="v-pills-lives-tab"
            tabIndex="0"
          >
            <p>Lives management will be here soon!</p>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-merchandise"
            role="tabpanel"
            aria-labelledby="v-pills-merchandise-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
            tabIndex="0"
          >
            ...
          </div>
          <div
            className="tab-pane fade "
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
            tabIndex="0"
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
