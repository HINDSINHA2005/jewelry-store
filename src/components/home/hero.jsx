
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const images = [

//   "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero_kccogq.jpg",
//   "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero2_yeb0am.jpg",
//   "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero3_nownv3.jpg",
//   "https://res.cloudinary.com/dvxaztwnz/image/upload/f_auto,q_auto,w_1600/hero0_eeqrbo.jpg",
  
// ];

// const Hero = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     // Preload images
//     images.forEach((src) => {
//       const img = new Image();
//       img.src = src;
//     });
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section
//       className="text-white d-flex align-items-center justify-content-center"
//       style={{
//         backgroundImage: `url(${images[currentImageIndex]})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//         minHeight: "100vh",
//         width: "100%",
//         transition: "background-image 1s ease-in-out",
//         position: "relative",
//       }}
//     >
//       <div
//         className="container text-center"
//         style={{
//           backgroundColor: "rgba(0,0,0,0.4)",
//           padding: "40px",
//           borderRadius: "15px",
//         }}
//       >
//         <h1 className="display-5 fw-bold animate__animated animate__fadeInDown">
//           Discover Elegance in Every Piece
//         </h1>
//         <p className="lead mt-3 animate__animated animate__fadeInUp">
//           Explore our exclusive handcrafted jewelry collection that defines your style.
//         </p>
//         <Link
//           to="/shop"
//           className="btn btn-warning btn-lg px-4 mt-4 fw-semibold animate__animated animate__fadeInUp"
//         >
//           Shop Now
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase";

// const Hero = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const q = query(
//           collection(db, "dynamic_products"),
//           where("visible", "==", true),
//           where("stock", ">", 0),
//           where("trending", "==", true) // 🔥 only trending
//         );

//         const snapshot = await getDocs(q);

//         let data = snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           firestoreId: doc.id,
//           price: Number(doc.data().price) || 0,
//           salePrice: doc.data().salePrice
//             ? Number(doc.data().salePrice)
//             : null,
//         }));

//         // 🔥 Emerald Noor ko first me lao agar trending me ho
//         data.sort((a, b) => {
//           if (a.name === "Emerald Noor Bridal Kundan Necklace Set")
//             return -1;
//           if (b.name === "Emerald Noor Bridal Kundan Necklace Set")
//             return 1;
//           return 0;
//         });

//         setProducts(data);
//       } catch (err) {
//         console.error("Hero fetch error:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (products.length === 0) return null;

//   return (
//     <div
//       id="productHeroCarousel"
//       className="carousel slide"
//       data-bs-ride="carousel"
//       data-bs-interval="3000"
//     >
//       <div className="carousel-inner">
//         {products.map((prod, index) => (
//           <div
//             key={prod.firestoreId}
//             className={`carousel-item ${index === 0 ? "active" : ""}`}
//             style={{
//               height: "55vh",
//               backgroundColor: "#000",
//             }}
//           >
//             <div
//               style={{
//                 height: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 src={prod.imageUrl}
//                 alt={prod.name}
//                 style={{
//                   maxHeight: "100%",
//                   maxWidth: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             </div>

//             <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100" style={{ color: "#FF8C00" }}>
//               <h2 className="fw-bold">{prod.name}</h2>

//               {prod.salePrice ? (
//                 <p className="fs-5 mt-2">
//                   <span
//                     style={{
//                       textDecoration: "line-through",
//                       marginRight: "8px",
//                       color: "#070305",
//                     }}
//                   >
//                     ₹{prod.price}
//                   </span>
//                   <span className="text-warning fw-bold">
//                     ₹{prod.salePrice}
//                   </span>
//                 </p>
//               ) : (
//                 <p className="fs-5 mt-2 fw-semibold">
//                   ₹{prod.price}
//                 </p>
//               )}

//               <Link
//                 to={`/product/${prod.firestoreId}`}
//                 className="btn btn-warning mt-3 px-4 fw-semibold"
//               >
//                 Shop Now
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button
//         className="carousel-control-prev"
//         type="button"
//         data-bs-target="#productHeroCarousel"
//         data-bs-slide="prev"
//       >
//         <span className="carousel-control-prev-icon"></span>
//       </button>

//       <button
//         className="carousel-control-next"
//         type="button"
//         data-bs-target="#productHeroCarousel"
//         data-bs-slide="next"
//       >
//         <span className="carousel-control-next-icon"></span>
//       </button>
//     </div>
//   );
// };

// export default Hero;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const Hero = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, "dynamic_products"),
          where("visible", "==", true),
          where("stock", ">", 0),
          where("trending", "==", true)
        );

        const snapshot = await getDocs(q);

        let data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          firestoreId: doc.id,
          price: Number(doc.data().price) || 0,
          salePrice: doc.data().salePrice
            ? Number(doc.data().salePrice)
            : null,
        }));

        data.sort((a, b) => {
          if (a.name === "Emerald Noor Bridal Kundan Necklace Set") return -1;
          if (b.name === "Emerald Noor Bridal Kundan Necklace Set") return 1;
          return 0;
        });

        setProducts(data);
      } catch (err) {
        console.error("Hero fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          height: "55vh",
          background: "#f3f3f3",
        }}
      />
    );
  }

  if (products.length === 0) return null;

  return (
    <div
      id="productHeroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3500"
    >
      <div className="carousel-inner">

        {products.map((prod, index) => (
          <div
            key={prod.firestoreId}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{
              height: "55vh",
              backgroundColor: "#000",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <img
                src={prod.imageUrl}
                alt={prod.name}
                loading={index === 0 ? "eager" : "lazy"} // 🔥 main fix
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />

            </div>

            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center h-100" style={{ color: "#FF8C00" }}>
              <h2 className="fw-bold">{prod.name}</h2>

              {prod.salePrice ? (
                <p className="fs-5 mt-2">
                  <span
                    style={{
                      textDecoration: "line-through",
                      marginRight: "8px",
                      color: "#070305",
                    }}
                  >
                    ₹{prod.price}
                  </span>

                  <span className="text-warning fw-bold">
                    ₹{prod.salePrice}
                  </span>
                </p>
              ) : (
                <p className="fs-5 mt-2 fw-semibold">
                  ₹{prod.price}
                </p>
              )}

              <Link
                to={`/product/${prod.firestoreId}`}
                className="btn btn-warning mt-3 px-4 fw-semibold"
              >
                Shop Now
              </Link>

            </div>
          </div>
        ))}

      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#productHeroCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#productHeroCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>

    </div>
  );
};

export default Hero;