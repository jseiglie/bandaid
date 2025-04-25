import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import userServices from "../../services/userServices";
import validationUtils from "../../utils/validationUtils";
export const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
   
    validationUtils.validateEmail(formData.email) ||
      setError({ error: 'email', message: "Invalid email format" });

    validationUtils.validatePassword(formData.password) ||
      setError({ error: 'password', message: "Invalid password format" });

    

    userServices.login(formData).then((data) => {
      console.log(data);

      setLoading(false);
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setSuccess(true);
        setError(null);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/band_manager");
      }
    });
  };
  return (
    <section className="text-white">
      <h3>Login</h3>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="user@example.com"
          />
          <label htmlFor="floatingInput">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="password"
          />
          <label htmlFor="floatingInput">password</label>
        </div>
        <input
          type="submit"
          readOnly={"Login"}
          className={`btn border border-2 ${success && "border-success"} ${
            error && "border-danger"
          }`}
        />
      </form>
    </section>
  );
};
