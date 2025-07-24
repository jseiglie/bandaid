import { Link } from "react-router-dom";
import logo from "../../assets/images/bandaid.png";
export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-3">
      <div className="container ">
        <div className="d-flex  justify-content-between align-items-center">
          <Link className="text-white  nav-link " to="/">
            <img src={logo} alt="BandAid Logo" />
          </Link>
          <div className="d-flex flex-column flex-md-row flex-sm-row ">
            <ul className="list-group list-group-flush ">
              <li className="list-group-item bg-dark border border-0 rounded-0  ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark border border-0 rounded-0  ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/privacy"
                >
                  Cookie Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark border border-0 rounded-0  ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/privacy"
                >
                  Use Policy
                </Link>
              </li>
            </ul>

            <ul className="list-group list-group-flush ms-3">
              <li className="list-group-item bg-dark border border-0 rounded-0  ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/privacy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="list-group-item bg-dark border border-0 rounded-0">
                <Link className="text-white nav-link border-bottom" to="/terms">
                  Legal Disclaimer
                </Link>
              </li>
              <li className="list-group-item bg-dark border border-0 rounded-0  ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/privacy"
                >
                  Terms of use
                </Link>
              </li>
            </ul>

            <ul className="list-group   border border-0 rounded-0 ">
              <li className="list-group-item bg-dark border border-0 rounded-0 ">
                <Link
                  className="text-white nav-link border-bottom"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>
              <li className="list-group-item bg-dark border border-0 rounded-0 ">
                <Link className="text-white nav-link border-bottom" to="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-5 mb-1">
          <p className="text-center">© 2025 BandAid. All rights reserved.</p>
          <p className="text-center">Made with ❤️ by the BandAid team</p>
        </div>
      </div>
    </footer>
  );
};
