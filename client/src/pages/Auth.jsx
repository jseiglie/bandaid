import { useState } from "react";
import { Authenticate } from "../components/authenticate/authenticate";

export const Auth = () => {
  const [login, setLogin] = useState(true);
  return (
    <section className="vh-100 text-primary container d-flex flex-column justify-content-center align-items-center">
      
      <Authenticate login={login} />
      <div className="d-flex justify-content-center align-items-center">
        <p className=" d-flex align-items-center text-black">
          {" "}
          {login ? "In need of an account? " : "Already have an account? "}
          <span
            className="btn btn-outline  fw-bolder"
            onClick={() => setLogin(!login)}
          >
            {login ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </section>
  );
};
