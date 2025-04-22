import useGlobalReducer from "../../hooks/useGlobalReducer";
import { Card } from "../card/Card";
import "./Features.css";

export const Features = () => {
  const { store, dispatch } = useGlobalReducer();
  return (
    <section className="text-white mt-5">
      <h3 className="my-5">Why BandAid?</h3>
      <p className="lead my-5 border border-2 p-5 rounded">
        BandAid is a web application designed to help bands and musicians manage
        their setlists, songs, and live performances. It provides a
        user-friendly interface for creating and organizing setlists, adding
        songs, and managing band members. With BandAid, you can easily plan your
        performances and keep track of your music library.
      </p>
      <div className="row my-5">
        {store.features.map((el, i) => (
          <Card
            key={i}
            feature={el.feature}
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
