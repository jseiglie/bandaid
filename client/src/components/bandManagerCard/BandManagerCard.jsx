import "./BandManagerCard.css";
import { useNavigate } from "react-router-dom";
import { removeSpace } from "../../utils/spaceRemover";

export const BandManagerCard = (props) => {
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate("/band_manager/" + removeSpace(props.bandName));

  return (
    <article className="p-4">
      <div className="bandManagerCard__container p-4 d-flex  align-items-center justify-content-center  bg-dark text-center border border-2">
        <div className="bandManagerCard__imgContainer ">
          <figure className="cursor-pointer" onClick={handleNavigate}>
            <img
              src={props.img}
              alt={props.name}
              loading="lazy"
              width="400px"
              height="400px"
              className="bandManagerCard__img img-fluid"
            />
            <h3 className="d-block  bandManagerCard__name">{props.bandName}</h3>
          </figure>
        </div>
        <div className="bandManagerCard__textContainer d-flex flex-column justify-content-center align-items-center">
          <p className="bandManagerCard__upcomingLives text-white">Upcoming!</p>
          {props.upcomingLives ? (
            <article
              key={props.upcomingLives.id}
              className="bandManagerCard__liveContainer card bg-warning text-center border border-2 p-4 mx-2"
            >
              <p className="bandManagerCard__liveDate">
                {new Date(props.upcomingLives.date_time)
                  .toISOString()
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("/")}
              </p>
              <p className="bandManagerCard__liveLocation">
                {props.upcomingLives.venue}
              </p>
              <p>
                {props.upcomingLives.location} - {props.upcomingLives.city}
              </p>
            </article>
          ) : (
            <p className="bandManagerCard__noUpcomingLives text-white">
              No upcoming lives
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

BandManagerCard.propTypes = {};
