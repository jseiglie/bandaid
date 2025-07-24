import validationUtils from "../../utils/validationUtils";
import "./modal.css";
import { useState } from "react";
export const Modal = (props) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const passwordChange =
    props.title.includes("Change Password") ||
    props.text.includes("Change Password");
  const deleteAccount =
    props.title.includes("Delete Account") ||
    props.text.includes("Delete Account");

  const handleClose = (e) => {
    e.stopPropagation();
    props.closeModal();
  };

  const clearError = () => {
    setTimeout(() => {
      setError({});
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Modal submitted with data:", data);
    const currentPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const confirmPassword = data.confirmPassword;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError({
        error: "form",
        message: "All fields are required",
      });
      clearError();
      return;
    }

    if (currentPassword == newPassword || currentPassword == confirmPassword) {
      setError({
        error: "password",
        message: "New password cannot be the same as the current password.",
      });
      clearError();
      return;
    }

    if (!validationUtils.validatePassword(newPassword)) {
      setError({
        error: "password",
        message: `Missing password or invalid password format. Password must be between 8-16 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
      });
      clearError();
      return;
    }

    if (!validationUtils.passwordMatch(newPassword, confirmPassword)) {
      setError({
        error: "password",
        message: `Passwords do not match`,
      });
      clearError();
      return;
    }

    console.log("Password changed");

    props.closeModal();
  };

  return (
    <div className="modal-wrapper">
      <div
        className={`${
          (passwordChange || deleteAccount) &&
          "text-danger border border-3 border-danger"
        } modal-standard`}
        aria-labelledby="modal-standard"
      >
        <div className="modal-content">
          <div className="modal-header my-3">
            <h1
              className={`${
                (passwordChange || deleteAccount) && "text-danger "
              } modal-title fs-5`}
              id="modal-standard-title"
            >
              {props.title || "Atention!"}
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body my-3">
            <p>{props.text || "There should be a message here?"}</p>
            {passwordChange && (
              <form className="form-control" onSubmit={handleSubmit}>
                <label htmlFor="passwordCurrent" className="form-label">
                  Current password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordCurrent"
                  placeholder="Enter current password"
                  onChange={(e) =>
                    setData({ ...data, currentPassword: e.target.value })
                  }
                  value={data.currentPassword || ""}
                />
                <label htmlFor="passwordNew" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordNew"
                  placeholder="Enter new password"
                  onChange={(e) =>
                    setData({ ...data, newPassword: e.target.value })
                  }
                  value={data.newPassword || ""}
                />
                <label htmlFor="passwordConfirm" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="passwordConfirm"
                  placeholder="Confirm new password"
                  onChange={(e) =>
                    setData({ ...data, confirmPassword: e.target.value })
                  }
                  value={data.confirmPassword || ""}
                />
                {error && <p className="text-danger my-2">{error.message}</p>}

                <div className="modal-footer gap-2 my-3">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Update Password"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
