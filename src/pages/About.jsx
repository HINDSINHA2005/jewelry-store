import React from "react";
import logo from "../assets/logo1.png"

const About = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold text-warning mb-4">About JewelsHub</h2>
      <div className="row align-items-center g-5">
        <div className="col-md-4">
          <img
            src={logo} // Replace with a beautiful jewelry image
            className="img-fluid rounded shadow"
            alt="About Us"
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            At <strong>JewelsAURA</strong>, we celebrate tradition and innovation. Our mission is to bring you the finest handcrafted jewelry that reflects your personality and style.
          </p>
          <p>
            We work with India’s most skilled artisans to design unique gold, diamond, and silver pieces that blend elegance with authenticity.
          </p>
          <p>
            <strong>Why Choose Us?</strong>
            <ul>
              <li>✔️ 100% Hallmarked Jewelry</li>
              <li>✔️ Transparent Pricing</li>
              <li>✔️ Fast Delivery & Easy Returns</li>
              <li>✔️ Trusted by 10,000+ Customers</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
