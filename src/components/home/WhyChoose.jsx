

import React from "react";
import { ShieldCheck, Gem, Truck } from "lucide-react";

const features = [
  {
    icon: <Gem size={40} className="text-warning" />,
    title: "Premium Quality",
    description: "Crafted with the finest materials for long-lasting beauty.",
  },
  {
    icon: <ShieldCheck size={40} className="text-warning" />,
    title: "Authenticity Guaranteed",
    description: "Every piece is certified and 100% genuine.",
  },
  {
    icon: <Truck size={40} className="text-warning" />,
    title: "Fast & Free Delivery",
    description: "Get your orders quickly with our free express shipping.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#fffaf3" }}>
      <div className="container text-center">
        <h2
          className="fw-bold mb-3"
          style={{
            color: "#b8860b",
            fontFamily: "'Playfair Display', serif",
            fontSize: "2rem",
          }}
        >
          Why Choose Jewelora?
        </h2>
        <p className="mb-5 text-muted" style={{ fontSize: "1.05rem" }}>
          Experience elegance, quality, and trust with every purchase.
        </p>
        <div className="row">
          {features.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="p-4 h-100 shadow-sm bg-white rounded"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0,0,0,0.08)";
                }}
              >
                <div className="mb-3">{item.icon}</div>
                <h5
                  className="fw-semibold mb-2"
                  style={{ color: "#333", fontSize: "1.15rem" }}
                >
                  {item.title}
                </h5>
                <p className="text-muted" style={{ fontSize: "0.95rem" }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
