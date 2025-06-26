import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImg1 from "../../assets/hero.jpg";
import heroImg2 from "../../assets/hero4.jpg";
import heroImg3 from "../../assets/hero3.webp";
import heroImg4 from "../../assets/hero2.png";

const images = [heroImg1, heroImg2, heroImg3, heroImg4];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="text-white d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
        position: "relative",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {currentImageIndex === 0 && (
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
          <Link
            to="/shop"
            className="btn btn-warning btn-lg px-4 mt-4 fw-semibold animate__animated animate__fadeInUp"
          >
            Shop Now
          </Link>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
