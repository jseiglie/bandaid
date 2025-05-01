import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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

  console.log(band);

  return (
    <section className=" card bg-dark border-2 container text-white vh-100 d-flex flex-column justify-content-center align-items-center">
      <p className="container bg-danger text-xl text-black">
        This is a private view. You can see how your band profile will look,
        update and commit changes
      </p>
      <div className="row  container d-flex justify-content-center align-items-center">
        <div className="col-sm-12 col-md-12 col-lg-4 ">
          <figure>
            <img
              src={band.logo}
              alt="Band logo"
              className="rounded-circle bandPrivate__logo"
              width={400}
              height={400}
            />
            <figcaption hidden className="text-center bandPrivate__logoCaption">
              {band.name} logo
            </figcaption>
          </figure>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-xl my-5">{band.name}</h2>
            <q className="text-xl mb-3">{band.description}</q>
            <p className="text-xl ">Genre: {band.genre}</p>
            <p className="text-xl ">Locattion: {band.location}</p>

            <p className="text-xl ">{band.socialMedia}</p>
            <p className="text-xl ">{band.contact}</p>
          </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h4 className="text-xl my-5">Social Media</h4>
            {/* {band.socialMedia.map((social) => (
                <a
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary m-2"
                >
                  {social.name}
                </a>
              ))} */}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <h4>Upcoming live</h4>

            <div className="card m-2">
              <p className="text-xl">{band.nextLive.venue}</p>
              <p>
                {band.nextLive.location}-{band.nextLive.city}
              </p>
              <p>{new Date(band.nextLive.date_time).toLocaleDateString()}</p>
              <Link
                to={`/live/${band.nextLive.id}`}
                className="btn btn-primary"
              >
                View live
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h4 className="text-xl ">Members</h4>
          <div className="row d-flex justify-content-center align-items-center">
            {band.bandMembers.map((member) => (
              <div
                key={member.id}
                className="col-sm-12 col-md-6 col-lg-4 card align-items-center bandPrivate__card m-2"
              >
                <img
                  src={member.avatar}
                  alt={member.username}
                  className="rounded-circle bandPrivate__logo"
                  width={150}
                  height={150}
                />
                <p className="text-xl ">{member.username}</p>
                <p className="text-xl ">{member.role}</p>
                <Link
                  to={"/member/" + member.username}
                  className="btn btn-primary"
                >
                  Lern more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
