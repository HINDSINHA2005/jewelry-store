

// import products from "../shop/product"; // adjust path
// import "../home/TrendingCarousel.css";

// const TrendingCarousel = () => {
//   // pick only trending products
//   const trendingProducts = products.filter(p => p.trending);

//   if (trendingProducts.length === 0) return null;

//   return (
//     <section className="py-5" style={{ backgroundColor: "#fffaf3" }}>
//       <div className="container">
//         <h2
//           className="text-center fw-bold mb-4"
//           style={{
//             color: "#b8860b",
//             fontFamily: "'Playfair Display', serif",
//           }}
//         >
//           Trending Jewelry
//         </h2>

//         <div
//           id="trendingCarousel"
//           className="carousel slide"
//           data-bs-ride="carousel"
//         >
//           <div
//             className="carousel-inner rounded-4 shadow-lg overflow-hidden"
//             style={{ border: "3px solid #f4e1b6" }}
//           >
//             {trendingProducts.map((product, index) => (
//               <div
//                 key={product.id}
//                 className={`carousel-item ${index === 0 ? "active" : ""}`}
//               >
//                 <img
//                   src={product.image}
//                   className="d-block w-100 carousel-img"
//                   alt={product.name}
//                 />

//                 <div className="carousel-caption custom-caption glassy-bg p-3 rounded">
//                   <h5 className="text-warning fw-bold fs-5">
//                     {product.name}
//                   </h5>

//                   {product.stock === 0 ? (
//                     <span className="badge bg-danger">Out of Stock</span>
//                   ) : product.stock <= 5 ? (
//                     <span className="badge bg-warning text-dark">
//                       Only {product.stock} left
//                     </span>
//                   ) : (
//                     <span className="badge bg-success">In Stock</span>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Controls */}
//           <button
//             className="carousel-control-prev"
//             type="button"
//             data-bs-target="#trendingCarousel"
//             data-bs-slide="prev"
//           >
//             <span className="carousel-control-prev-icon custom-arrow" />
//           </button>

//           <button
//             className="carousel-control-next"
//             type="button"
//             data-bs-target="#trendingCarousel"
//             data-bs-slide="next"
//           >
//             <span className="carousel-control-next-icon custom-arrow" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TrendingCarousel;
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import "../home/TrendingCarousel.css";

const TrendingCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const q = query(
          collection(db, "dynamic_products"),
          where("trending", "==", true),
          where("visible", "==", true)
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({
          firestoreId: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
      } catch (err) {
        console.error("Trending fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading || products.length === 0) return null;

  return (
    <section className="py-5" style={{ backgroundColor: "#fffaf3" }}>
      <div className="container">
        <h2
          className="text-center fw-bold mb-4"
          style={{
            color: "#b8860b",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Trending Jewelry
        </h2>

        <div
          id="trendingCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
            {products.map((product, index) => (
              <div
                key={product.firestoreId}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={product.imageUrl}
                  className="d-block w-100 carousel-img"
                  alt={product.name}
                />

                <div className="carousel-caption custom-caption glassy-bg p-3 rounded">
                  <h5 className="text-warning fw-bold fs-5">
                    {product.name}
                  </h5>

                  {product.stock === 0 ? (
                    <span className="badge bg-danger">Out of Stock</span>
                  ) : product.stock <= 5 ? (
                    <span className="badge bg-warning text-dark">
                      Only {product.stock} left
                    </span>
                  ) : (
                    <span className="badge bg-success">In Stock</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#trendingCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon custom-arrow" />
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#trendingCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon custom-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingCarousel;
