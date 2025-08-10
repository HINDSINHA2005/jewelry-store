// // import { Link } from "react-router-dom";
// // import { useAuth } from "../../context/AuthContext";
// // import { db } from "../../firebase";
// // import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// // import products from "../shop/product"; // adjust if needed

// // const categories = ["Mangalsutra", "Necklaces", "Pendants", "Bracelets", "Rakhi", "Bangles","earrings","Special Collection",,"KADA","Modern Mangalsutra","Oxidised Necklaces","Modern Mangalsutra ","Rajvadhi Bracelet"];
// // const PRODUCTS_PER_CATEGORY = 3; 

// // const getFeaturedProducts = () => {
// //   const featured = [];
// //   categories.forEach((cat) => {
// //     const byCategory = products.filter(p => p.category === cat).slice(0, PRODUCTS_PER_CATEGORY);
// //     featured.push(...byCategory);
// //   });
// //   return featured;
// // };

// // const FeaturedProducts = () => {
// //   const { currentUser } = useAuth();
// //   const featuredProducts = getFeaturedProducts();

// //   const handleAddToCart = async (product) => {
// //     if (!currentUser) {
// //       alert("Please sign in to add items to cart.");
// //       return;
// //     }

// //     const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

// //     try {
// //       const existing = await getDoc(cartItemRef);

// //       if (existing.exists()) {
// //         await updateDoc(cartItemRef, {
// //           quantity: existing.data().quantity + 1,
// //         });
// //       } else {
// //         await setDoc(cartItemRef, {
// //           productId: product.id,
// //           name: product.name,
// //           price: product.price,
// //           image: product.image, // include image for cart display
// //           quantity: 1,
// //         });
// //       }

// //       alert("Added to cart!");
// //     } catch (err) {
// //       console.error("Error adding to cart:", err);
// //       alert("Something went wrong while adding to cart.");
// //     }
// //   };

// //   return (
// //     <section className="py-5 bg-light">
// //       <div className="container">
// //         <h2 className="text-center mb-4 text-warning fw-bold">Featured Products</h2>
// //         <div className="row">
// //           {featuredProducts.map((product) => (
// //             <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
// //               <div className="card h-100 shadow-sm border-0">
// //                 <img
// //                   src={product.image}
// //                   className="card-img-top"
// //                   alt={product.name}
// //                   style={{
// //                     height: "200px",
// //                     objectFit: "cover",
// //                     width: "100%",
// //                   }}
// //                 />
// //                 <div className="card-body d-flex flex-column">
// //                   <h5 className="card-title fw-semibold">{product.name}</h5>
// //                   <p className="card-text text-muted mb-2">{product.price}</p>

// //                   <button
// //                     className="btn btn-warning text-white fw-semibold mb-2"
// //                     onClick={() => handleAddToCart(product)}
// //                   >
// //                     Add to Cart
// //                   </button>

// //                   <Link
// //                     to={`/product/${product.id}`}
// //                     className="btn btn-outline-warning btn-sm"
// //                   >
// //                     View Details
// //                   </Link>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FeaturedProducts;


// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { db } from "../../firebase";
// import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
// import products from "../shop/product"; // adjust if needed

// const categories = [
//   "Mangalsutra", "Necklaces", "Pendants", "Bracelets", "Rakhi", "Bangles",
//   "earrings", "Special Collection", "KADA", "Modern Mangalsutra", 
//   "Oxidised Necklaces", "Rajvadhi Bracelet"
// ];

// const PRODUCTS_PER_CATEGORY = 3;

// const getFeaturedProducts = () => {
//   const featured = [];
//   categories.forEach((cat) => {
//     const byCategory = products
//       .filter(p => p.category === cat)
//       .slice(0, PRODUCTS_PER_CATEGORY);
//     featured.push(...byCategory);
//   });
//   return featured;
// };

// const FeaturedProducts = () => {
//   const { currentUser } = useAuth();
//   const featuredProducts = getFeaturedProducts();

//   const handleAddToCart = async (product) => {
//     if (!currentUser) {
//       alert("Please sign in to add items to cart.");
//       return;
//     }

//     const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

//     try {
//       const existing = await getDoc(cartItemRef);

//       if (existing.exists()) {
//         await updateDoc(cartItemRef, {
//           quantity: existing.data().quantity + 1,
//         });
//       } else {
//         await setDoc(cartItemRef, {
//           productId: product.id,
//           name: product.name,
//           price: product.price,
//           image: product.image,
//           quantity: 1,
//         });
//       }

//       alert("Added to cart!");
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       alert("Something went wrong while adding to cart.");
//     }
//   };

//   return (
//     <section className="py-5" style={{ backgroundColor: "#fdf8f4" }}>
//       <div className="container">
//         <h2 className="text-center mb-5 fw-bold" style={{
//           color: "#b8860b",
//           fontFamily: "'Playfair Display', serif",
//           fontSize: "2.5rem",
//         }}>
//           ✨ Featured Collections ✨
//         </h2>

//         <div className="row">
//           {featuredProducts.map((product) => (
//             <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
//               <div 
//                 className="card h-100 border-0 shadow-sm"
//                 style={{
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   borderRadius: "15px",
//                   overflow: "hidden",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-8px)";
//                   e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";
//                 }}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   style={{
//                     height: "240px",
//                     objectFit: "cover",
//                     width: "100%",
//                   }}
//                 />

//                 <div className="card-body d-flex flex-column" style={{ padding: "1.2rem" }}>
//                   <h5 
//                     className="fw-bold mb-2"
//                     style={{
//                       fontFamily: "'Playfair Display', serif",
//                       fontSize: "1.1rem",
//                       color: "#333",
//                     }}
//                   >
//                     {product.name}
//                   </h5>

//                   <p 
//                     className="fw-semibold mb-3"
//                     style={{
//                       fontSize: "1.05rem",
//                       color: "#b8860b",
//                       fontWeight: "600",
//                     }}
//                   >
//                     ₹{product.price}
//                   </p>

//                   <button
//                     className="mb-2 fw-semibold"
//                     style={{
//                       background: "linear-gradient(135deg, #d4af37, #b8860b)",
//                       border: "none",
//                       color: "white",
//                       padding: "0.5rem 1rem",
//                       borderRadius: "25px",
//                       fontSize: "0.9rem",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
//                     onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
//                     onClick={() => handleAddToCart(product)}
//                   >
//                     Add to Cart
//                   </button>

//                   <Link
//                     to={`/product/${product.id}`}
//                     style={{
//                       border: "2px solid #b8860b",
//                       borderRadius: "25px",
//                       padding: "0.4rem 1rem",
//                       fontSize: "0.85rem",
//                       color: "#b8860b",
//                       textAlign: "center",
//                       textDecoration: "none",
//                       transition: "all 0.3s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.backgroundColor = "#b8860b";
//                       e.currentTarget.style.color = "white";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.backgroundColor = "transparent";
//                       e.currentTarget.style.color = "#b8860b";
//                     }}
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;


import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import products from "../shop/product"; // adjust if needed

const categories = [
  "Mangalsutra", "Necklaces", "Pendants", "Bracelets", "Rakhi", "Bangles",
  "earrings", "Special Collection", "KADA", "Modern Mangalsutra",
  "Oxidised Necklaces", "Rajvadhi Bracelet"
];

const PRODUCTS_PER_CATEGORY = 3;

const getFeaturedProducts = () => {
  const featured = [];
  categories.forEach((cat) => {
    const byCategory = products
      .filter(p => p.category === cat)
      .slice(0, PRODUCTS_PER_CATEGORY);
    featured.push(...byCategory);
  });
  return featured;
};

const FeaturedProducts = () => {
  const { currentUser } = useAuth();
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = async (product, e) => {
    e.stopPropagation(); // prevent triggering link click
    if (!currentUser) {
      alert("Please sign in to add items to cart.");
      return;
    }

    const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

    try {
      const existing = await getDoc(cartItemRef);

      if (existing.exists()) {
        await updateDoc(cartItemRef, {
          quantity: existing.data().quantity + 1,
        });
      } else {
        await setDoc(cartItemRef, {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }

      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#fdf8f4" }}>
      <div className="container">
        <h2
          className="text-center mb-5 fw-bold"
          style={{
            color: "#b8860b",
            fontFamily: "'Playfair Display', serif",
            fontSize: "2.5rem",
          }}
        >
          ✨Featured Collections✨
        </h2>

      <div className="row g-3">
  {featuredProducts.map((product) => (
    <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={product.id}>
      <Link
        to={`/product/${product.id}`}
        className="text-decoration-none"
        style={{ color: "inherit", display: "block", height: "100%" }}
      >
        <div
          className="card h-100 border-0 shadow-sm"
          style={{
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            borderRadius: "15px",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow =
              "0 10px 25px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(0,0,0,0.1)";
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              height: "200px",
              objectFit: "cover",
              width: "100%",
            }}
          />

          <div
            className="card-body d-flex flex-column"
            style={{ padding: "1rem" }}
          >
            <h5
              className="fw-bold mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
                color: "#333",
              }}
            >
              {product.name}
            </h5>

            <p
              className="fw-semibold mb-3"
              style={{
                fontSize: "1rem",
                color: "#b8860b",
                fontWeight: "600",
              }}
            >
              {product.price}
            </p>

            <button
              className="fw-semibold mt-auto"
              style={{
                background: "linear-gradient(135deg, #d4af37, #b8860b)",
                border: "none",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "25px",
                fontSize: "0.85rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              onClick={(e) => handleAddToCart(product, e)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  ))}


        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
