import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { removeUnderscore } from "../utils/spaceRemover";

export const BandPrivate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const [band] = useState(
    store.user?.user?.bands?.find(
      (band) => band.name.toLowerCase() == removeUnderscore(params.band_name)
    )
  );

  useEffect(() => {
    if (!store.user?.user) {
      navigate("/login");
    }
    if (!band.bandMembers.filter((band) => band.id === store.user.user.id)) {
      navigate("/login");
    }
  }, []);

  return (
    <section className="container text-white vh-100 d-flex flex-column justify-content-center align-items-center">
      <p className="container bg-danger text-xl text-black">
        This is a private view. You can see how your band profile will look and
        commit changes
      </p>
      <h3 className="text-xl mt-5">{band.name}</h3>

      
    </section>
  );
};
