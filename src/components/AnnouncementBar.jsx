// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const AnnouncementBar = () => {
//   const offers = [
//     "Limited Time Offer : Buy 2 Bangle, Get 1 FREE",
//     "Limited Time Offer : Buy 1 Pendant, Get 1 FREE",
//     "Free Shipping on Orders Above Rs. 699",
//     "Free Shipping on Prepaid Orders Above Rs. 499",
//     "Extra 10% Off on First Purchase - Use Code WELCOME10",
//     "Follow Us on Instagram for Exclusive Offers",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const prevOffer = () => {
//     setCurrentIndex((prev) => (prev === 0 ? offers.length - 1 : prev - 1));
//   };

//   const nextOffer = () => {
//     setCurrentIndex((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
//   };

//   return (
//     <div className="announcement-bar d-flex align-items-center justify-content-center">
//       <button className="arrow-btn" onClick={prevOffer}>
//         <ChevronLeft size={18} />
//       </button>
//       <span className="offer-text">{offers[currentIndex]}</span>
//       <button className="arrow-btn" onClick={nextOffer}>
//         <ChevronRight size={18} />
//       </button>
//     </div>
//   );
// };

// export default AnnouncementBar;


import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AnnouncementBar = () => {
  const offers = [
    "Buy 2 Bangle, Get 1 FREE",
   " Buy 1 Pendant, Get 1 FREE",
   "Free Shipping on Orders Above Rs.699",
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

