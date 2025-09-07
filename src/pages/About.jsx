

import React from "react";
import logo from "../assets/jewelora.jpg";
import CategoryShowcase from "../components/home/CategoryShowcase";
import { FaInstagram, FaCheckCircle, FaUsers, FaSyncAlt, FaTags, FaFacebook } from "react-icons/fa";

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-warning mb-5">About Jewelora</h2>
      <div className="row align-items-center g-5">
        <div className="col-md-5 text-center">
          <img
            src={logo}
            className="img-fluid rounded shadow-lg"
            alt="About Jewelora"
            style={{ maxHeight: "320px" }}
          />
        </div>

        <div className="col-md-7">
          <p className="lead text-dark">
            Welcome to <strong className="text-warning">Jewelora</strong> – where tradition meets trend.
            We craft premium-quality handcrafted jewelry that tells your story.
          </p>

          <p className="text-muted">
            Each piece is designed by India’s finest artisans and blends elegance with authenticity. 
            From classic styles to contemporary fashion, we offer jewelry that fits every mood and moment.
          </p>

          <div className="row g-3">
            <div className="col-6">
             
              <p className="mb-1"><FaTags className="text-primary me-2" />Transparent Pricing</p>
            </div>
            <div className="col-6">
              <p className="mb-1"><FaSyncAlt className="text-info me-2" />Fast Delivery & Easy Returns</p>
              <p className="mb-1"><FaUsers className="text-danger me-2" />Trusted by 500+ Customers</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="fw-semibold">
              📸 Follow us on Instagram:
              <a
                href="https://instagram.com/jew_elora"
                className="ms-2 text-decoration-none text-warning"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="me-1" /> @jew_elora
              </a>
            </p>
            <p className="fw-semibold">
              📸 Follow us on Facebook:
              <a
                href="https://www.facebook.com/people/Jewelora-Artificial-Jewells/pfbid0a2B39JvcggZadBbCFHDnHHc5NiAHYpdn6xSVcTNJUYeGFDdcScMmnkvZe5itLVuol/?mibextid=wwXIfr&rdid=hF4pxIgvaay2AjfH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CcdEpJRH4%2F"
                className="ms-2 text-decoration-none text-warning"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="me-1" /> Jewelora Artificial Jewells 
              </a>
            </p>
          </div>
        </div>
      </div>
       <CategoryShowcase />
    </div>
   
  );
};

export default About;
