import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <ul className="list-group list-group-flush list-group-horizontal">
          <li className="list-group-item bg-dark border border-0 rounded-0  ">
            <Link className="text-white nav-link border-bottom" to="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0  ">
            <Link className="text-white nav-link border-bottom" to="/privacy">
              Cookie Policy
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0  ">
            <Link className="text-white nav-link border-bottom" to="/privacy">
              Use Policy
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0  ">
            <Link className="text-white nav-link border-bottom" to="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0">
            <Link className="text-white nav-link border-bottom" to="/terms">
              Legal Disclaimer
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0  ">
            <Link className="text-white nav-link border-bottom" to="/privacy">
              Terms of use
            </Link>
          </li>
        </ul>
        <ul className="list-group  list-group-horizontal border border-0 rounded-0 ">
          <li className="list-group-item bg-dark border border-0 rounded-0 ">
            <Link className="text-white nav-link border-bottom" to="/contact">
              Contact Us
            </Link>
          </li>
          <li className="list-group-item bg-dark border border-0 rounded-0 ">
            <Link className="text-white nav-link border-bottom" to="/about">
              About Us
            </Link>
          </li>
        </ul>
        <p className="text-center">© 2025 BandAid. All rights reserved.</p>
        <p className="text-center">Made with ❤️ by the BandAid team</p>
      </div>
    </footer>
  );
};
