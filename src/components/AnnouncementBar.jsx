


import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AnnouncementBar = () => {
  const offers = [
    "Free Shipping on Prepaid Orders ",
    "Follow Us on Instagram for Exclusive Offers",
   ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevOffer = () => {
    setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
  };

  const nextOffer = () => {
    setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === offers.length - 1 ? 0 : prev + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [offers.length]);

  return (
    <div className="announcement-bar d-flex align-items-center justify-content-center">
      <button className="arrow-btn" onClick={prevOffer}>
        <ChevronLeft size={18} />
      </button>
      <span className="offer-text">{offers[currentIndex]}</span>
      <button className="arrow-btn" onClick={nextOffer}>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default AnnouncementBar;

