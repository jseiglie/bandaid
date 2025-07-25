import { useState } from "react";
import useGlobalReducer from "../../../hooks/useGlobalReducer";
import { Modal } from "../../modal/modal";

export const DashboardSettings = () => {
  const { store } = useGlobalReducer();
  const [data, setData] = useState(store.user || {});
  const [edit, setEdit] = useState("");
  const [modal, setModal] = useState({ status: false, title: "", text: "" });
  const closeModal = (status) => {
    setModal((prev) => ({ ...prev, status, title: "", text: "" }));
  };
  const handleEdit = (val) => {
    if (edit === val) {
      setEdit("");
      return;
    }
    setEdit((prev) => (prev = val));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="">
      <h3 className="text-start">Settings</h3>
      <article className="">
        <form className="form-control">
          <div className="mb-3 row align-items-center">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10 d-flex align-items-center">
              <input
                type="text"
                className={
                  edit == "email" ? "form-control" : "form-control-plaintext"
                }
                id="email"
                value={data.email}
                name="email"
                onChange={handleChange}
              />
              {edit === "" && (
                <span
                  className="fa-solid fa-pen-to-square"
                  onClick={() => handleEdit("email")}
                ></span>
              )}
              {edit === "email" && (
                <>
                  <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={() => handleEdit("email")}
                  >
                    <span className="fa-solid fa-circle-check"></span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger ms-2 "
                    value="Cancel"
                    onClick={() => handleEdit("")}
                  >
                    <span className="fa-solid fa-xmark"></span>
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </article>

      <article className="border border-danger border-3 p-3 ">
        <h4 className="text-start text-danger">Danger Zone</h4>
        <div className="d-flex justify-content-center align-items-center">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-danger">Change Password</h5>
              <p className="card-text">
                Update your password to keep your account secure.
              </p>
              <button
                className="btn btn-danger"
                onClick={() =>
                  setModal({
                    status: true,
                    title: "Change Password",
                    text: "You are about to change your password",
                  })
                }
              >
                <span className="fa-solid fa-key"></span> Change Password
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-danger">Delete Account</h5>
              <p className="card-text">
                Permanently delete your account and all associated data.
              </p>
              <button className="btn btn-danger">
                <span className="fa-solid fa-trash"></span> Delete Account
              </button>
            </div>
          </div>
        </div>
      </article>
      {modal.status && (
        <Modal
          title={modal.title}
          text={modal.text}
          closeModal={closeModal}
          submitEvent={handleModalSubmit}
        />
      )}
    </section>
  );
};
