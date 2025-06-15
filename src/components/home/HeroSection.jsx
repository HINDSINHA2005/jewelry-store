import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpg"; // Make sure this image exists

const HeroSection = () => {
  return (
    <section
      className="text-white d-flex align-items-center"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
        position: "relative",
      }}
    >
      <div
        className="container text-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "60px",
          borderRadius: "15px",
        }}
      >
        <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
          Discover Elegance in Every Piece
        </h1>
        <p className="lead mt-3 animate__animated animate__fadeInUp">
          Explore our exclusive handcrafted jewelry collection that defines your style.
        </p>
        <Link to="/shop" className="btn btn-warning btn-lg px-4 mt-4 fw-semibold animate__animated animate__fadeInUp">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
