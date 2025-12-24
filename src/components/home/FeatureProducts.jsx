


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

//   const handleAddToCart = async (product, e) => {
//     e.stopPropagation(); // prevent triggering link click
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
//         <h2
//           className="text-center mb-5 fw-bold"
//           style={{
//             color: "#b8860b",
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "2.5rem",
//           }}
//         >
//           ✨Featured Collections✨
//         </h2>

//       <div className="row g-3">
//   {featuredProducts.map((product) => (
//     <div className="col-6 col-sm-4 col-md-3 col-lg-2" key={product.id}>
//       <Link
//         to={`/product/${product.id}`}
//         className="text-decoration-none"
//         style={{ color: "inherit", display: "block", height: "100%" }}
//       >
//         <div
//           className="card h-100 border-0 shadow-sm"
//           style={{
//             transition: "transform 0.3s ease, box-shadow 0.3s ease",
//             borderRadius: "15px",
//             overflow: "hidden",
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.transform = "translateY(-8px)";
//             e.currentTarget.style.boxShadow =
//               "0 10px 25px rgba(0,0,0,0.15)";
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.transform = "translateY(0)";
//             e.currentTarget.style.boxShadow =
//               "0 4px 15px rgba(0,0,0,0.1)";
//           }}
//         >
//           <img
//             src={product.image}
//             alt={product.name}
//             style={{
//               height: "200px",
//               objectFit: "cover",
//               width: "100%",
//             }}
//           />

//           <div
//             className="card-body d-flex flex-column"
//             style={{ padding: "1rem" }}
//           >
//             <h5
//               className="fw-bold mb-2"
//               style={{
//                 fontFamily: "'Playfair Display', serif",
//                 fontSize: "1rem",
//                 color: "#333",
//               }}
//             >
//               {product.name}
//             </h5>

//             <p
//               className="fw-semibold mb-3"
//               style={{
//                 fontSize: "1rem",
//                 color: "#b8860b",
//                 fontWeight: "600",
//               }}
//             >
//               {product.price}
//             </p>

//             <button
//               className="fw-semibold mt-auto"
//               style={{
//                 background: "linear-gradient(135deg, #d4af37, #b8860b)",
//                 border: "none",
//                 color: "white",
//                 padding: "0.5rem 1rem",
//                 borderRadius: "25px",
//                 fontSize: "0.85rem",
//                 transition: "all 0.3s ease",
//               }}
//               onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
//               onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
//               onClick={(e) => handleAddToCart(product, e)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </Link>
//     </div>
//   ))}


//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { db } from "../../firebase";
// import {
//   collection,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";

// const FeaturedProducts = () => {
//   const { currentUser } = useAuth();
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         // 1️⃣ Fetch only visible & in-stock products
//         const q = query(
//           collection(db, "dynamic_products"),
//           where("visible", "==", true),
//           where("stock", ">", 0)
//         );

//         const snapshot = await getDocs(q);
//         const products = snapshot.docs.map((doc) => ({
//           firestoreId: doc.id,
//           ...doc.data(),
//         }));

//         // 2️⃣ Pick ONE product per category (dynamic)
//         const categoryMap = {};
//         products.forEach((product) => {
//           if (!categoryMap[product.category]) {
//             categoryMap[product.category] = product;
//           }
//         });

//         // 3️⃣ Convert map → array
//         setFeaturedProducts(Object.values(categoryMap));
//       } catch (error) {
//         console.error("Error fetching featured products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   if (loading || featuredProducts.length === 0) return null;

//   return (
//     <section className="py-5" style={{ backgroundColor: "#fdf8f4" }}>
//       <div className="container">
//         <h2
//           className="text-center mb-5 fw-bold"
//           style={{
//             color: "#b8860b",
//             fontFamily: "'Playfair Display', serif",
//             fontSize: "2.5rem",
//           }}
//         >
//           ✨ Featured Collections ✨
//         </h2>

//         <div className="row g-3">
//           {featuredProducts.map((product) => (
//             <div
//               className="col-6 col-sm-4 col-md-3 col-lg-2"
//               key={product.firestoreId}
//             >
//               <Link
//                 to={`/product/${product.id}`}
//                 className="text-decoration-none"
//                 style={{ color: "inherit" }}
//               >
//                 <div className="card h-100 border-0 shadow-sm rounded-4">
//                   <img
//                     src={product.imageUrl}
//                     alt={product.name}
//                     style={{
//                       height: "200px",
//                       objectFit: "cover",
//                       width: "100%",
//                     }}
//                   />

//                   <div className="card-body d-flex flex-column">
//                     <h6 className="fw-bold mb-2">{product.name}</h6>

//                     <p className="fw-semibold text-warning mb-3">
//                       ₹{product.price}
//                     </p>

//                     <button
//                       className="btn btn-warning text-white mt-auto"
//                       disabled={product.stock <= 0}
//                     >
//                       {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
//                     </button>
//                   </div>
//                 </div>
//               </Link>
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
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const { currentUser } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  // 🔥 ONLY LOGIC CHANGE STARTS HERE
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(
          collection(db, "dynamic_products"),
          where("visible", "==", true),
          where("stock", ">", 0)
        );

        const snapshot = await getDocs(q);
        const products = snapshot.docs.map((doc) => ({
          firestoreId: doc.id,
          ...doc.data(),
        }));

        // ✅ pick ONE product per category (no hardcoding)
        const categoryMap = {};
        products.forEach((p) => {
          if (!categoryMap[p.category]) {
            categoryMap[p.category] = p;
          }
        });

        setFeaturedProducts(Object.values(categoryMap));
      } catch (err) {
        console.error("Featured fetch error:", err);
      }
    };

    fetchFeaturedProducts();
  }, []);
  // 🔥 ONLY LOGIC CHANGE ENDS HERE

  const handleAddToCart = async (product, e) => {
    e.stopPropagation();
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
          image: product.imageUrl, // 🔑 Firestore field
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
                    src={product.imageUrl}
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
                      ₹{product.price}
                    </p>

                    <button
                      className="fw-semibold mt-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, #d4af37, #b8860b)",
                        border: "none",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "25px",
                        fontSize: "0.85rem",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.9")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
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
