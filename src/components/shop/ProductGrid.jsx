


import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../shop/getAllProduct"; // Merges local + Firebase

const ProductGrid = ({ category, searchTerm = "",sortOrder="" }) => {
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

useEffect(() => {
  getAllProducts().then((merged) => {
    const normalized = merged.map((p) => {
      // Remove any non-digit characters from price/salePrice
      const cleanPrice = p.price ? Number(String(p.price).replace(/[^\d.]/g, "")) : 0;
      const cleanSale = p.salePrice ? Number(String(p.salePrice).replace(/[^\d.]/g, "")) : null;

      return {
        ...p,
        price: cleanPrice,
        salePrice: cleanSale,
      };
    });

    setAllProducts(normalized);
  });
}, []); // <-- dependency array (run once on mount)




useEffect(() => {
  let filtered = allProducts.filter((product) => {
    const matchCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchCategory && matchSearch;
  });

  if (sortOrder === "asc") {
    filtered = [...filtered].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortOrder === "desc") {
    filtered = [...filtered].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  }

  setVisibleProducts(filtered);
}, [allProducts, category, searchTerm, sortOrder]);

  return (
    <>
      <style>{`
        /* Fade-in animation for product cards */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation-fill-mode: forwards;
          animation-name: fadeInUp;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Card hover scale */
        .card-hover:hover {
          transform: scale(1.04);
          box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          z-index: 10;
          cursor: pointer;
        }

        /* Fix button width */
        .btn-view-details {
          max-width: 140px;
          margin: 0 auto;
        }
      `}</style>

      <div className="row g-4">
        {visibleProducts.map((prod, index) => (
          <div
            key={prod.id || index}
            className="col-md-4 col-sm-6 col-6 fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card border-0 shadow-sm h-100 d-flex flex-column overflow-hidden card-hover">
              <Link to={`/product/${prod.id || index}`} className="text-decoration-none text-dark">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="card-img-top"
                 
                  style={{
                    height: "250px",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.3s ease",
                    borderRadius: "0.25rem 0.25rem 0 0",
                  }}
                />
              </Link>
              <div className="card-body text-center p-4 d-flex flex-column justify-content-between">
                <Link
                  to={`/product/${prod.id || index}`}
                  className="text-decoration-none text-dark fw-bold mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  {prod.name}
                </Link>

                {prod.salePrice ? (
                  <p className="fw-semibold mb-3" style={{ fontSize: "1.25rem" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                        marginRight: "8px",
                        fontSize: "1rem",
                      }}
                    >
                      {prod.price}
                    </span>
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      {prod.salePrice}
                    </span>
                  </p>
                ) : (
                  <p className="fw-semibold mb-3" style={{ color: "#110e14ff", fontSize: "1.25rem" }}>
                    {prod.price}
                  </p>
                )}

                <Link
                  to={`/product/${prod.id || index}`}
                  className="btn btn-warning btn-sm mt-auto px-3 fw-semibold btn-view-details"
                  style={{ transition: "background-color 0.3s ease" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#e7f755ff")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {visibleProducts.length === 0 && (
          <div className="text-center text-muted mt-4 fs-5">No products found.</div>
        )}
      </div>
    </>
  );
};

export default ProductGrid;