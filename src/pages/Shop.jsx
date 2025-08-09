import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

import ProductGrid from "../components/shop/ProductGrid";
import CategoryShowcase from "../components/home/CategoryShowcase";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    // <div className="container py-5">
    //   <h2 className="fw-bold text-center text-warning mb-4">
    //     {category ? `${category} Collection` : "Our Products"}
    //   </h2>
<section className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container px-4">
        <div className="text-center mb-3 pb-3">
          <h2 className="category-section-title">All Products</h2>
        </div>

      {/* <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div> */}
      <style>{`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-input {
          padding-left: 38px; /* space for icon */
          border-radius: 25px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-size: 1rem;
          transition: box-shadow 0.3s ease;
        }

        .search-input:focus {
          box-shadow: 0 0 8px #f8c146;
          border-color: #f8c146;
          outline: none;
        }

        .search-icon {
          position: absolute;
          top: 50%;
          left: 12px;
          transform: translateY(-50%);
          color: #f8c146;
          pointer-events: none;
        }
      `}</style>

      <div className="mb-4 d-flex justify-content-center">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            className="form-control search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {!category && <hr className="my-4" />}

      {/* 🛒 Product List */}
      <ProductGrid category={category} searchTerm={searchTerm} />

      {/* 🧭 Category Showcase */}
      <CategoryShowcase />
    </div>
     </section>
  );
 
};

export default Shop;
