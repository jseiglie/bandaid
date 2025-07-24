import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Card } from "../card/Card";
import "./Features.css";

export const Features = () => {
  const { store } = useGlobalReducer();
  return (
    <section className="container-fluid mt-2 ">
      <h3 className="my-5">Why BandAid?</h3>
      <p className="lead my-5 border fw-bold text-white bg-dark border-2 p-5 rounded box-shadow border-dark">
        BandAid is a web application designed to help bands and musicians manage
        their setlists, songs, and live performances. It provides a
        user-friendly interface for creating and organizing setlists, adding
        songs, and managing band members. With BandAid, you can easily plan your
        performances and keep track of your music library.
      </p>
      <div className="row my-5">
        <h3 className="mb-5">Features</h3>
        {store.features.map((el, i) => (
          <Card
            key={i}
            feature={el.feature}
            use='features'
            img={el.img}
            description={el.description}
            link={el.link}
            buttonText={el.buttonText}
          />
        ))}
      </div>
    </section>
  );
};
