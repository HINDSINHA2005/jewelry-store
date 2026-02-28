

// import { Link } from "react-router-dom";
// import React from 'react';

// // Import category images (same as before)
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
 
 
//   { name: "Earrings", image: ear1, slug: "Earrings" },
//   { name: "Rakhi", image: RAKHI1, slug: "Rakhi" },
  
// ];


// const CategoryShowcasePolished = () => {
//   return (
//     <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
//       <div className="container px-4">
//         <div className="text-center mb-5 pb-3">
//           <h2 className="category-section-title">Shop By Category</h2>
//         </div>

        
//         <div className="row g-4 g-lg-5">
//           {categories.map((category) => (
//             <div className="col-6 col-md-4 col-lg-3" key={category.slug}>
//               <Link to={`/shop?category=${category.slug}`} className="text-decoration-none">
//                 <div className="category-card-wrapper">
//                   <div className="category-image-container rounded-3 overflow-hidden shadow-sm">
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="category-image"
//                     />
//                     <div className="category-hover-overlay">
//                       <span className="shop-now-text">Shop Now</span>
//                     </div>
//                   </div>
//                   <div className="category-info text-center mt-3">
//                     <h5 className="category-name">{category.name}</h5>
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>{`
//         .category-section-title {
//           font-size: 2.5rem;
//           font-weight: 600;
//           color: #2c3e50;
//           position: relative;
//           display: inline-block;
//           padding-bottom: 10px;
//         }

//         .category-section-title::after {
//           content: '';
//           position: absolute;
//           bottom: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 70px;
//           height: 3px;
//           background-color: #c5a47e; /* Gold accent color */
//         }
        
//         .category-card-wrapper {
//           transition: transform 0.3s ease;
//         }
        
//         .category-card-wrapper:hover {
//           transform: translateY(-8px);
//         }
        
//         .category-image-container {
//           position: relative;
//           aspect-ratio: 1 / 1; /* Enforces a perfect square */
//           cursor: pointer;
//           transition: box-shadow 0.3s ease;
//         }
        
//         .category-card-wrapper:hover .category-image-container {
//             box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
//         }

//         .category-image {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           transition: transform 0.4s ease;
//         }
        
//         .category-card-wrapper:hover .category-image {
//             transform: scale(1.1);
//         }

//         .category-hover-overlay {
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.5);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           opacity: 0;
//           transition: opacity 0.4s ease;
//         }

//         .category-card-wrapper:hover .category-hover-overlay {
//           opacity: 1;
//         }

//         .shop-now-text {
//           color: #fff;
//           font-weight: 600;
//           font-size: 1rem;
//           border: 2px solid #fff;
//           padding: 8px 20px;
//           border-radius: 50px;
//           transform: translateY(10px);
//           opacity: 0;
//           transition: transform 0.3s ease 0.1s, opacity 0.3s ease 0.1s;
//         }
        
//         .category-card-wrapper:hover .shop-now-text {
//             transform: translateY(0);
//             opacity: 1;
//         }

//         .category-name {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #34495e;
//           transition: color 0.3s ease;
//         }
        
//         .category-card-wrapper:hover .category-name {
//           color: #c5a47e;
//         }
        
//         /* Responsive Font Size for the title */
//         @media (max-width: 768px) {
//           .category-section-title {
//             font-size: 2rem;
//           }
//           .category-name {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategoryShowcasePolished;



import { Link } from "react-router-dom";
import React from "react";

const categories = [
  {
    name: "Mangalsutra",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766602914/h2gvmvrs1dhkws5l54fv.jpg",
    slug: "Mangalsutra",
  },
  {
    name: "Necklaces",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766602799/o91ndinkixpvdaiglfms.jpg",
    slug: "Necklaces",
  },
  {
    name: "Pendants",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766569169/g2uieic9vsiq6wufqqfy.jpg",
    slug: "Pendants",
  },
  {
    name: "Bangles",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766573932/gf7fm3ltynknxx5v7ezj.jpg",
    slug: "Bangles",
  },
  {
    name: "Bracelets",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766664915/prikhjwwayexdj02m2mj.jpg",
    slug: "Bracelets",
  },
  {
    name: "Earrings",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1766605977/xciabxz0eoiqflshoh5q.jpg",
    slug: "Earrings",
  },
  {
    name: "Rakhi",
    image:
      "https://res.cloudinary.com/dvxaztwnz/image/upload/v1772303416/RAKHI1_e9kgld.jpg",
    slug: "Rakhi",
  },
];

const CategoryShowcasePolished = () => {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container px-4">
        <div className="text-center mb-5 pb-3">
          <h2 className="category-section-title">Shop By Category</h2>
        </div>

        <div className="row g-4 g-lg-5">
          {categories.map((category) => (
            <div className="col-6 col-md-4 col-lg-3" key={category.slug}>
              <Link
                to={`/shop?category=${category.slug}`}
                className="text-decoration-none"
              >
                <div className="category-card-wrapper">
                  <div className="category-image-container rounded-3 overflow-hidden shadow-sm">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                      loading="lazy"
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
          background-color: #c5a47e;
        }

        .category-card-wrapper {
          transition: transform 0.3s ease;
        }

        .category-card-wrapper:hover {
          transform: translateY(-8px);
        }

        .category-image-container {
          position: relative;
          aspect-ratio: 1 / 1;
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