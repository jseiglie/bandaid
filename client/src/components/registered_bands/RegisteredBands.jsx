import React from "react";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Card } from "../card/Card";

export const RegisteredBands = () => {
  const { store } = useGlobalReducer();
  const randomBands = store.bands?.sort(() => Math.random() - 0.5).slice(0, 5);
  return (
    <article className="container-fluid text-white">
      <h1 className="text-center">Join our bands and start managing like a pro</h1>
      <div className="overflow-x-auto d-flex flex-row flex-nowrap justify-content-center align-items-center">
        {randomBands?.map((el) => (
          <Card
            use={"band"}
            key={el.id}
            feature={el.name}
            img={el.img}
            link={`/bands/${el.name}`}
          />
        ))}
      </div>
    </article>
  );
};
