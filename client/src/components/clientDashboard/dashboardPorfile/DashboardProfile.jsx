import { useState } from "react";
import { Link } from "react-router-dom";
import "./DashboardProfile.css";
export const DashboardProfile = () => {
  const [data, setData] = useState({
    id: 1,
    username: "rockstar1",
    email: "user1@ex.com",
    admin: false,
    avatar: null,
    avatar_public_id: null,
    has_subscription: true,
    active_subscription_id: null,
    address: "123 Rock St, NYC",
    phone: null,
    city: null,
    country: null,
    state: null,
    zip_code: null,
    is_active: true,
    createdAt: "2025-07-25T11:03:13.000Z",
    updatedAt: "2025-07-25T11:03:13.000Z",
    profile: {
      id: 1,
      bio: "Experienced guitarist.",
      instruments: "Guitar",
      genres: "Rock",
      experience: "10 years",
      social_links: {
        instagram: "https://instagram.com/user1",
      },
    },
    bands: [
      {
        id: 1,
        role: "Guitarist",
        createdAt: "2025-07-25T11:03:13.000Z",
        updatedAt: "2025-07-25T11:03:13.000Z",
        Band: {
          id: 1,
          name: "Band A",
          band_admin: null,
          description: "Rock band",
          genre: "Rock",
          location: "NYC",
          website: null,
          logo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1&ipt=4d20faa39f989336905b6721f7dba99b693a340d1df470aed77958d3f02a72ef",
          cover_photo: null,
          logo_public_id: null,
          cover_photo_public_id: null,
          contact_email: null,
          contact_phone: null,
          contact_person: null,
          established_year: null,
          members_count: null,
          is_active: true,
          social_media:
            '[{"name":"Instagram","link":"https://instagram.com/bandA"}]',
          createdAt: "2025-07-25T11:03:13.000Z",
        },
      },
    ],
    cart: [
      {
        id: 1,
        user_id: 1,
        createdAt: "2025-07-25T11:03:13.000Z",
        updatedAt: "2025-07-25T11:03:13.000Z",
        CartItems: [
          {
            id: 1,
            cart_id: 1,
            merchandise_id: 1,
            quantity: 2,
            createdAt: "2025-07-25T11:03:13.000Z",
            updatedAt: "2025-07-25T11:03:13.000Z",
          },
          {
            id: 2,
            cart_id: 1,
            merchandise_id: 2,
            quantity: 1,
            createdAt: "2025-07-25T11:03:13.000Z",
            updatedAt: "2025-07-25T11:03:13.000Z",
          },
          {
            id: 5,
            cart_id: 1,
            merchandise_id: 5,
            quantity: 2,
            createdAt: "2025-07-25T11:03:13.000Z",
            updatedAt: "2025-07-25T11:03:13.000Z",
          },
        ],
      },
    ],
  });

  return (
    <section className="dashboard-profile">
      <h2>Profile</h2>
      <div className="profile-info">
        <form>
          <div className="row gx-3 gy-2 align-items-center p-3">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <img
                width={150}
                height={130}
                src={
                  data.avatar ||
                  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffreepngimg.com%2Fthumb%2Fband%2F26223-1-band-photos.png&f=1&nofb=1"
                }
                alt="User Avatar"
                className="avatar rounded-circle"
              />
              <div>
                <label htmlFor="avatar" className="form-label">
                  Change Avatar
                </label>
                <input
                  className="form-control"
                  type="file"
                  name="avatar"
                  id="avatar"
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  id="address"
                  defaultValue={data.address}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  id="phone"
                  defaultValue={data.phone || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  id="city"
                  defaultValue={data.city || ""}
                />
              </div>
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  Country:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  id="country"
                  defaultValue={data.country || ""}
                />
              </div>

              <div className="form-group row gx-3 gy-2 align-items-center">
                <div className="col">
                  <label htmlFor="state" className="form-label">
                    State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    id="state"
                    defaultValue={data.state || ""}
                  />
                </div>
                <div className="col">
                  <label htmlFor="zip" className="form-label">
                    Zip Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="zip"
                    id="zip"
                    defaultValue={data.zip || ""}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <div className="form-group">
                <label htmlFor="bio" className="form-label">
                  Biography:
                </label>
                <textarea
                  className="form-control"
                  name="bio"
                  id="bio"
                  rows="3"
                  defaultValue={data.profile.bio}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="instruments" className="form-label">
                  Instruments:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="instruments"
                  id="instruments"
                  defaultValue={data.profile.instruments}
                />
              </div>
              <div className="form-group">
                <label htmlFor="genres" className="form-label">
                  Genres:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="genres"
                  id="genres"
                  defaultValue={data.profile.genres}
                />
              </div>
              <div className="form-group">
                <label htmlFor="experience" className="form-label">
                  Experience:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="experience"
                  id="experience"
                  defaultValue={data.profile.experience}
                />
              </div>
            </div>
          </div>

          <p>
            <strong>Username:</strong> {data.username}
          </p>
          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Social Links:</strong> {data.profile.social_links.instagram}
          </p>
        </form>
      </div>
      <div className="bands-info">
        <h3>My Bands</h3>
        {data.bands.map((band) => (
          <div
            key={band.id}
            className="card card-band"
            style={{
              backgroundImage: `url(${
                band.Band.cover_photo || band.Band.logo || black
              })`,
            }}
          >
            <div className="card-band-name-wrapper">
              <h4 className="card-band-name ">
                {band.Band.name} - {band.role}
              </h4>
            </div>

            <Link to={`/bands/${band.Band.id}`} className="btn btn-primary">
              View Band
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};
