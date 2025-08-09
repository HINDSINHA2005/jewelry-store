// // import { Link } from "react-router-dom";

// // import necklace from '../../assets/Necklace/Necklace1.jpg'
// // import bracelets from '../../assets/Bracelets/bracelet1.jpg'
// // import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg';
// // import pendant from '../../assets/Pendants/pd1.jpg';
// // import RAKHI1 from '../../assets/Rakhi/RAKHI26.jpg';
// // import BANGLE7 from '../../assets/Bangles/BANGLE7.jpg';
// // import KADHA8 from '../../assets/Kadha/KADHA8.jpg';
// // import bracelet2 from '../../assets/Rajvadi Bracelet/bracelet2.jpg';
// // import oxidised1 from '../../assets/Oxidised Necklaces/oxidised1.jpg';
// // import mod1 from '../../assets/Modern Mangalsutra/1.jpg';
// // import ear1 from '../../assets/earrings/e1.jpg';
// // import sp1 from '../../assets/Special Collection/sp1.jpg'
// // const categories = [
// //   {
// //     name: "Mangalsutra",
// //     image: mangalsutra,
// //     slug: "Mangalsutra",
// //   },
// //   {
// //     name: "Necklaces",
// //     image: necklace,
// //     slug: "Necklaces",
// //   },
// //   {
// //     name: "Pendants",
// //     image: pendant,
// //     slug: "Pendants",
// //   },
// //   {
// //     name:"Bangles",
// //     image:BANGLE7,
// //     slug:"Bangles",
// //   },
// //   {
// //     name: "Bracelets",
// //     image: bracelets,
// //     slug: "Bracelets",
// //   },
// //   {
// //     name: "KADA",
// //     image: KADHA8,
// //     slug: "Kada",
// //   },
// //   {
// //     name:"Rakhi",
// //     image:RAKHI1,
// //     slug:"Rakhi",
// //   },
// //   {
// //     name:"Rajvadhi Bracelet",
// //     image:bracelet2,
// //     slug:"Rajvadhi Bracelet",
// //   },
// //   {
// //     name:"Oxidised Necklaces",
// //     image:oxidised1,
// //     slug:"Oxidised Necklaces",
// //   },
// //   {
// //     name:"Modern Mangalsutra ",
// //     image:mod1,
// //     slug:"Modern Mangalsutra "

// //   },
// //   {
// //     name:"Special Collection ",
// //     image:sp1,
// //     slug:"Special Collection "

// //   },
// //   {
// //     name:"Earrings ",
// //     image:ear1,
// //     slug:"Earrings "

// //   },


  
// // ];

// // const CategoryShowcase = () => {
// //   return (
// //     <section className="py-5 bg-light">
// //       <div className="container">
// //         <h2 className="text-center mb-5 fw-bold text-warning">Shop by Category</h2>
// //         <div className="row g-4">
// //           {categories.map((category, index) => (
// //             <div className="col-12 col-sm-6 col-md-3" key={index}>
// //               <Link to={`/shop?category=${category.slug}`} className="text-decoration-none">
// //                 <div className="card border-0 shadow-sm h-100 hover-zoom">
// //                   <img
// //                     src={category.image}
// //                     alt={category.name}
// //                     className="card-img-top"
// //                     style={{ height: "200px", objectFit: "cover" }}
// //                   />
// //                   <div className="card-body text-center">
// //                     <h5 className="card-title text-dark fw-semibold">{category.name}</h5>
// //                     <h6 className="card-title text-warning fw-semibold">Click to see products </h6>
// //                   </div>
// //                 </div>
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CategoryShowcase;


// // import { Link } from "react-router-dom";
// // import './CategoryShowcase.css';

// // // It's a good practice to create a separate file for data (e.g., data/categories.js)
// // // But for this example, we'll keep it here.
// // import necklace from '../../assets/Necklace/Necklace1.jpg';
// // import bracelets from '../../assets/Bracelets/bracelet1.jpg';
// // import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg';
// // import pendant from '../../assets/Pendants/pd1.jpg';
// // import RAKHI1 from '../../assets/Rakhi/RAKHI26.jpg';
// // import BANGLE7 from '../../assets/Bangles/BANGLE7.jpg';
// // import KADHA8 from '../../assets/Kadha/KADHA8.jpg';
// // import bracelet2 from '../../assets/Rajvadi Bracelet/bracelet2.jpg';
// // import oxidised1 from '../../assets/Oxidised Necklaces/oxidised1.jpg';
// // import mod1 from '../../assets/Modern Mangalsutra/1.jpg';
// // import ear1 from '../../assets/earrings/e1.jpg';
// // import sp1 from '../../assets/Special Collection/sp1.jpg';

// // // Cleaned up slugs for better URL structure
// // const categories = [
// //   { name: "Mangalsutra", image: mangalsutra, slug: "Mangalsutra" },
// //   { name: "Necklaces", image: necklace, slug: "Necklaces" },
// //   { name: "Pendants", image: pendant, slug: "Pendants" },
// //   { name: "Bangles", image: BANGLE7, slug: "Bangles" },
// //   { name: "Bracelets", image: bracelets, slug: "Bracelets" },
// //   { name: "Kada", image: KADHA8, slug: "Kada" },
// //   { name: "Rakhi", image: RAKHI1, slug: "Rakhi" },
// //   { name: "Rajwadi Bracelet", image: bracelet2, slug: "Rajwadi-Bracelet" },
// //   { name: "Oxidised Necklaces", image: oxidised1, slug: "Oxidised-Necklaces" },
// //   { name: "Modern Mangalsutra", image: mod1, slug: "Modern-Mangalsutra" },
// //   { name: "Special Collection", image: sp1, slug: "Special-Collection" },
// //   { name: "Earrings", image: ear1, slug: "Earrings" },
// // ];

// // const CategoryShowcase = () => {
// //   return (
// //     <section className="category-showcase py-5">
// //       <div className="container">
// //         <h2 className="text-center mb-5">Shop Our Collections</h2>
// //         <div className="row g-4">
// //           {categories.map((category) => (
// //             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={category.slug}>
// //               <Link to={`/shop?category=${category.slug}`} className="category-card">
// //                 <img
// //                   src={category.image}
// //                   alt={category.name}
// //                   className="category-card__image"
// //                 />
// //                 <div className="category-card__overlay">
// //                   <h5 className="category-card__title">{category.name}</h5>
// //                   <p className="category-card__cta">Shop Now</p>
// //                 </div>
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default CategoryShowcase;




// import { Link } from "react-router-dom";

// // Import category images
// import necklace from '../../assets/Necklace/Necklace1.jpg';
// import bracelets from '../../assets/Bracelets/bracelet1.jpg';
// import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg';
// import pendant from '../../assets/Pendants/pd1.jpg';
// import RAKHI1 from '../../assets/Rakhi/RAKHI26.jpg';
// import BANGLE7 from '../../assets/Bangles/BANGLE7.jpg';
// import KADHA8 from '../../assets/Kadha/KADHA8.jpg';
// import bracelet2 from '../../assets/Rajvadi Bracelet/bracelet2.jpg';
// import oxidised1 from '../../assets/Oxidised Necklaces/oxidised1.jpg';
// import mod1 from '../../assets/Modern Mangalsutra/1.jpg';
// import ear1 from '../../assets/earrings/e1.jpg';
// import sp1 from '../../assets/Special Collection/sp1.jpg';

// const categories = [
//   { name: "Mangalsutra", image: mangalsutra, slug: "Mangalsutra" },
//   { name: "Necklaces", image: necklace, slug: "Necklaces" },
//   { name: "Pendants", image: pendant, slug: "Pendants" },
//   { name: "Bangles", image: BANGLE7, slug: "Bangles" },
//   { name: "Bracelets", image: bracelets, slug: "Bracelets" },
//   { name: "KADA", image: KADHA8, slug: "Kada" },
//   { name: "Rakhi", image: RAKHI1, slug: "Rakhi" },
//   { name: "Rajvadhi Bracelet", image: bracelet2, slug: "Rajvadhi Bracelet" },
//   { name: "Oxidised Necklaces", image: oxidised1, slug: "Oxidised Necklaces" },
//   { name: "Modern Mangalsutra", image: mod1, slug: "Modern Mangalsutra" },
//   { name: "Special Collection", image: sp1, slug: "Special Collection" },
//   { name: "Earrings", image: ear1, slug: "Earrings" },
// ];

// const CategoryShowcase = () => {
//   return (
//     <section className="py-5 bg-light">
//       <div className="container">
//         <h2 className="text-center mb-5 fw-bold text-warning display-5">
//           Shop by Category
//         </h2>
//         <div className="row g-4">
//           {categories.map((category, index) => (
//             <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
//               <Link
//                 to={`/shop?category=${category.slug}`}
//                 className="text-decoration-none"
//               >
//                 <div className="card border-0 shadow-sm h-100 category-card rounded-4 overflow-hidden position-relative">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="card-img-top img-fluid category-img"
//                   />
//                   <div className="category-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3">
//                     <h5 className="text-white fw-bold mb-1">
//                       {category.name}
//                     </h5>
//                     <span className="text-light small">Click to explore</span>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Custom CSS */}
//       <style>{`
//         .category-card {
//           transition: transform 0.3s ease;
//         }

//         .category-card:hover {
//           transform: scale(1.03);
//         }

//         .category-img {
//           height: 250px;
//           object-fit: cover;
//           transition: filter 0.3s ease;
//         }

//         .category-card:hover .category-img {
//           filter: brightness(70%);
//         }

//         .category-overlay {
//           background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%);
//           transition: background 0.3s ease;
//         }

//         .category-card:hover .category-overlay {
//           background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent 60%);
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategoryShowcase;


import { Link } from "react-router-dom";
import React from 'react';

// Import category images (same as before)
import necklace from '../../assets/Necklace/Necklace1.jpg';
import bracelets from '../../assets/Bracelets/bracelet1.jpg';
import mangalsutra from '../../assets/Mangalsutra/mangalsutra1.jpg';
import pendant from '../../assets/Pendants/pd1.jpg';
import RAKHI1 from '../../assets/Rakhi/RAKHI26.jpg';
import BANGLE7 from '../../assets/Bangles/BANGLE7.jpg';
import KADHA8 from '../../assets/Kadha/KADHA8.jpg';
import bracelet2 from '../../assets/Rajvadi Bracelet/bracelet2.jpg';
import oxidised1 from '../../assets/Oxidised Necklaces/oxidised1.jpg';
import mod1 from '../../assets/Modern Mangalsutra/1.jpg';
import ear1 from '../../assets/earrings/e1.jpg';
import sp1 from '../../assets/Special Collection/sp1.jpg';

const categories = [
  { name: "Mangalsutra", image: mangalsutra, slug: "Mangalsutra" },
  { name: "Necklaces", image: necklace, slug: "Necklaces" },
  { name: "Pendants", image: pendant, slug: "Pendants" },
  { name: "Bangles", image: BANGLE7, slug: "Bangles" },
  { name: "Bracelets", image: bracelets, slug: "Bracelets" },
  { name: "KADA", image: KADHA8, slug: "Kada" },
  { name: "Rajvadhi Bracelet", image: bracelet2, slug: "Rajvadhi Bracelet" },
  { name: "Oxidised Necklaces", image: oxidised1, slug: "Oxidised Necklaces" },
  { name: "Modern Mangalsutra", image: mod1, slug: "Modern Mangalsutra" },
  { name: "Special Collection", image: sp1, slug: "Special Collection" },
  { name: "Earrings", image: ear1, slug: "Earrings" },
  { name: "Rakhi", image: RAKHI1, slug: "Rakhi" },
];

/**
 * A polished, responsive, and professional category showcase component.
 * It builds on the clean, symmetrical grid with refined animations and styling
 * for a premium user experience.
 */
const CategoryShowcasePolished = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container px-4">
        <div className="text-center mb-5 pb-3">
          <h2 className="category-section-title">Shop By Category</h2>
        </div>

        {/* Responsive Grid Breakdown:
          - col-6: 2 columns on extra-small screens (mobile)
          - col-md-4: 3 columns on medium screens (tablet)
          - col-lg-3: 4 columns on large screens (desktop)
          The `g-4` (gap) provides consistent spacing between cards.
        */}
        <div className="row g-4 g-lg-5">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-lg-3" key={category.slug}>
              <Link to={`/shop?category=${category.slug}`} className="text-decoration-none">
                <div className="category-card-wrapper">
                  <div className="category-image-container rounded-3 overflow-hidden shadow-sm">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    <div className="category-hover-overlay">
                      <span className="shop-now-text">Shop Now</span>
                    </div>
                  </div>
                  <div className="category-info text-center mt-3">
                    <h5 className="category-name">{category.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-section-title {
          font-size: 2.5rem;
          font-weight: 600;
          color: #2c3e50;
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
        }

        .category-section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 70px;
          height: 3px;
          background-color: #c5a47e; /* Gold accent color */
        }
        
        .category-card-wrapper {
          transition: transform 0.3s ease;
        }
        
        .category-card-wrapper:hover {
          transform: translateY(-8px);
        }
        
        .category-image-container {
          position: relative;
          aspect-ratio: 1 / 1; /* Enforces a perfect square */
          cursor: pointer;
          transition: box-shadow 0.3s ease;
        }
        
        .category-card-wrapper:hover .category-image-container {
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        
        .category-card-wrapper:hover .category-image {
            transform: scale(1.1);
        }

        .category-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .category-card-wrapper:hover .category-hover-overlay {
          opacity: 1;
        }

        .shop-now-text {
          color: #fff;
          font-weight: 600;
          font-size: 1rem;
          border: 2px solid #fff;
          padding: 8px 20px;
          border-radius: 50px;
          transform: translateY(10px);
          opacity: 0;
          transition: transform 0.3s ease 0.1s, opacity 0.3s ease 0.1s;
        }
        
        .category-card-wrapper:hover .shop-now-text {
            transform: translateY(0);
            opacity: 1;
        }

        .category-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #34495e;
          transition: color 0.3s ease;
        }
        
        .category-card-wrapper:hover .category-name {
          color: #c5a47e;
        }
        
        /* Responsive Font Size for the title */
        @media (max-width: 768px) {
          .category-section-title {
            font-size: 2rem;
          }
          .category-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default CategoryShowcasePolished;