import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      home
      <Link to={"/test"}>test</Link>
    </div>
  );
};
