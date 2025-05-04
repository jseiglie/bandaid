import React, { useState } from "react";
import emailServices from "../services/emailServices";
import { Spinner } from "../components/spinner/spinner";
import validationUtils from "../utils/validationUtils";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: null,
    message: null,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!validationUtils.validateEmail(formData.email)) {
      setError({
        error: "email",
        message: "Missing email or invalid email format",
      });
      setLoading(false);
      return;
    }
   
    if (formData.message.length < 15) {
      setError({
        error: "message",
        message: "Message must be at least 15 characters long.",
      });
      setLoading(false);
      return;
    }

    if (error.error) {
      setLoading(false);
      return;
    }

    !error.error &&
      emailServices
        .sendEmailNotification(formData)
        .then((response) => {
          if (response.status === 200) {
            setLoading(false);
            setError(null);
            setFormData({
              name: "",
              email: "",
              message: "",
            });
          } else {
            setLoading(false);
            setError("Failed to send email. Please try again later.");
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          setLoading(false);
          setError("Failed to send email. Please try again later.");
        });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="vh-100 ">
      <h3 className="text-white pt-5 mt-5">Contact</h3>
      <p className="text-white lead">Feel free to reach out:</p>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center justify-content-center card p-4 bg-dark text-white"
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-white">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-white">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label text-white">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="10"
            cols="50"
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            maxLength={500}
            minLength={15}
          ></textarea>
          {error.error && error.error == "message" && (
            <p className="text-end">
              the message has to be over 15 characters:{" "}
              {formData.message.length}
              /15
            </p>
          )}
          <input
            className="mt-3 btn btn-primary"
            type="submit"
            value={`${loading ? <Spinner /> : "Send"}`}
            disabled={loading}
          />
        </div>
      </form>
      <div
        className="alert alert-danger"
        hidden={error.error == null}
        role="alert"
      >
        {error.error}
      </div>
    </section>
  );
};
