import { useState } from "react";
import { Link } from "react-router-dom"; 
import logo from '../../assets/logo.png' // Replace with your logo

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            width="80"
            height="50"
            className="rounded-circle border border-2 border-warning"
          />
          <span className="fw-bold fs-4 text-warning">JewelsAura</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`} id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item">
              <Link to="/" className="nav-link active text-dark fw-semibold">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shop" className="nav-link text-dark fw-semibold">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link text-dark fw-semibold">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link text-dark fw-semibold">
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
            <Link to="/signin" className="btn btn-outline-warning px-4 fw-semibold">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-warning px-4 fw-semibold text-white">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
