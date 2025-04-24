import "./Card.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import defaultImgFeatures from "../../assets/images/img-placeholder-700x300.svg";
import defaultImgBands from "../../assets/images/img-placeholder-400.svg";

export const Card = (props) => {
  const defaultImg =
    props.use !== "band" ? defaultImgFeatures : defaultImgBands;

  return (
    <div
      className={`col-sm-12 col-md-12 col-lg-4 mb-4 ${
        props.use == "band" && "mx-3"
      } `}
    >
      <article className="card feature-card bg-dark text-white d-flex flex-column justify-content-between">
        <div className="card-body p-0">
          <h5 className="feature-card-title">{props.feature}</h5>
          <figure>
            <img className="img-fluid" src={defaultImg} />
          </figure>
          <p className="card-text">{props.description}</p>
          {props.use !== "band" && (
            <div className="feature-card-footer">
              <Link to={props.link} className="btn btn-primary mt-auto">
                {props.buttonText}
              </Link>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

Card.defaultProps = {
  feature: "missing feature",
  img: "../../assets/images/img-placeholder-400.svg",
  description: "missing description",
  link: "missing link",
  buttonText: "missing button text",
};

Card.propTypes = {
  feature: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};
