import React, { useState } from "react";
import { Authenticate } from "../components/authenticate/authenticate";

export const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <section className="vh-100 text-primary">
      <Authenticate login={login} />
      <div className="d-flex justify-content-center align-items-center">
        <p className="text-white d-flex align-items-center">
          {" "}
          {login ? "In need of an account? " : "Already have an account? "}
          <span
            className="btn btn-outline text-white fw-bolder"
            onClick={() => setLogin(!login)}
          >
            {login ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </section>
  );
};
