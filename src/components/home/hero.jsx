
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const images = [

  "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero_kccogq.jpg",
  "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero2_yeb0am.jpg",
  "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero3_nownv3.jpg",
  "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero0_eeqrbo.jpg",
  
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Preload images
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="text-white d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        transition: "background-image 1s ease-in-out",
        position: "relative",
      }}
    >
      <div
        className="container text-center"
        style={{
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "40px",
          borderRadius: "15px",
        }}
      >
        <h1 className="display-5 fw-bold animate__animated animate__fadeInDown">
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
    </section>
  );
};

export default Hero;
