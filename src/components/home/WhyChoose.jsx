import React from "react";
import { ShieldCheck, Gem, Truck } from "lucide-react";

const features = [
  {
    icon: <Gem size={32} className="text-warning" />,
    title: "Premium Quality",
    description: "Crafted with the finest materials for long-lasting beauty.",
  },
  {
    icon: <ShieldCheck size={32} className="text-warning" />,
    title: "Authenticity Guaranteed",
    description: "Every piece is certified and 100% genuine.",
  },
  {
    icon: <Truck size={32} className="text-warning" />,
    title: "Fast & Free Delivery",
    description: "Get your orders quickly with our free express shipping.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold text-warning mb-4">Why Choose Jewelora?</h2>
        <p className="mb-5 text-muted">
          Experience elegance, quality, and trust with every purchase.
        </p>
        <div className="row">
          {features.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="bg-white p-4 shadow-sm rounded h-100">
                <div className="mb-3">{item.icon}</div>
                <h5 className="fw-semibold">{item.title}</h5>
                <p className="text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
