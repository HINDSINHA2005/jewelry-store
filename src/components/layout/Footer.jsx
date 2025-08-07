import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../../assets/logt.jpg"; // Use your logo image

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* Logo & Description */}
          <div className="col-md-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={logo}
                alt="Logo"
                width="40"
                height="40"
                className="me-2 rounded-circle border border-warning"
              />
              <h5 className="text-warning mb-0">Jewelora</h5>
            </div>
            <p className="text-muted">
              Discover timeless elegance. Premium crafted jewelry just for you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4">
            <h6 className="text-warning mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link
                  to="/"
                  className="text-white text-decoration-none d-block py-1"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="text-white text-decoration-none d-block py-1"
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-white text-decoration-none d-block py-1"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white text-decoration-none d-block py-1"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white text-decoration-none d-block py-1"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://collaboration.payment.jewelora.in"
                  className="text-white text-decoration-none d-block py-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Collaboration 
                </a>
              </li>
              <li>
                <a
                  href="https://tambola.jewelora.in"
                  className="text-white text-decoration-none d-block py-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Participate in Tambola
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h6 className="text-warning mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a
                href="https://www.instagram.com/jew_elora?igsh=MWt6aGZ2ejhmbTFtMg%3D%3D&utm_source=qr"
                className="text-white fs-5"
              >
                <Facebook />
              </a>
              <a
                href="https://www.instagram.com/jew_elora?igsh=MWt6aGZ2ejhmbTFtMg%3D%3D&utm_source=qr"
                className="text-white fs-5"
              >
                <Instagram />
              </a>
              <a
                href="https://www.instagram.com/jew_elora?igsh=MWt6aGZ2ejhmbTFtMg%3D%3D&utm_source=qr"
                className="text-white fs-5"
              >
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        <hr className="text-secondary my-4" />

        <div className="text-center small text-muted">
          &copy; {new Date().getFullYear()} JewelsAURA. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
