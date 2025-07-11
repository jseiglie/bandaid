import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userServices from "../../services/userServices";

import validationUtils from "../../utils/validationUtils";
import { Spinner } from "../spinner/spinner";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const Authenticate = (props) => {
  const { store, dispatch } = useGlobalReducer();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState({
    error: null,
    message: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setError({
        error: null,
        message: null,
      });
    }, 3000);
  }, [error.error]);

  useEffect(() => {
    if (store.auth) {
      navigate("/band_manager");
    }
  }, [store.auth, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      error: null,
      message: null,
    });
    setLoading(true);
    if (!validationUtils.validateEmail(formData.identifier)) {
      setError({
        error: "Identifier",
        message: "Missing email or invalid email format",
      });
      setLoading(false);
      return;
    }
    if (!validationUtils.validatePassword(formData.password)) {
      setError({
        error: "password",
        message: `Missing password or invalid password format. Password must be between 8-16 characters, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.`,
      });
      setLoading(false);
      return;
    }
    if (error.error) {
      setLoading(false);
      return;
    }

    !error.error &&
      userServices.auth(props.login, formData).then((data) => {
        setLoading(false);
        if (!data.success) {
          setLoading(false);
          setError({ ...error, error: data.message, message: data.message });
          setSuccess(false);
          return;
        }
        setLoading(false);
        setSuccess(true);
        setError({
          error: null,
          message: null,
        });
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        console.log("data", data);
        dispatch({
          type: "store",
          payload: { key: "user", result: data.data.user },
        });
        console.log("data", data);
        dispatch({
          type: "store",
          payload: { key: "token", result: data.data.token },
        });
        dispatch({
          type: "store",
          payload: { key: "auth", result: true },
        });
        if (data.success) navigate("/band_manager");
      });
  };
  return (
    <section className="text-white">
      <h3>Login</h3>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className={`form-control ${
              error.error &&
              error.error == "identifier" &&
              "border border-2 border-danger"
            }`}
            type="text"
            name="identifier"
            id="identifier"
            onChange={handleChange}
            value={formData.identifier}
            placeholder="email or username"
          />
          <label htmlFor="floatingInput">Email or Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            name="password"
            id="password"
            className={`form-control ${
              error.error &&
              error.error == "password" &&
              "border border-2 border-danger"
            }`}
            type="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="password"
          />
          <label htmlFor="floatingInput">password</label>
        </div>
        <input
          type="submit"
          readOnly={(loading && <Spinner />) || "Login"}
          disabled={loading}
          className={`btn border border-2 ${success && "border-success"} ${
            error.error && "border-danger"
          }`}
        />
      </form>
      <div
        className="alert alert-danger"
        hidden={error.error == null}
        role="alert"
      >
        {error.message}
      </div>
    </section>
  );
};

Authenticate.defaultProps = {
  login: true,
};

Authenticate.propTypes = {
  login: PropTypes.bool,
};
