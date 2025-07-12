import { useLocation } from "react-router-dom";
import { useState } from "react";

import ProductGrid from "../components/shop/ProductGrid";
import CategoryShowcase from "../components/home/CategoryShowcase";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center text-warning mb-4">
        {category ? `${category} Collection` : "Our Products"}
      </h2>

      {/* 🔍 Search Bar */}
      <div className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          placeholder="Search products..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!category && <hr className="my-5" />}

      {/* 🛒 Product List */}
      <ProductGrid category={category} searchTerm={searchTerm} />

      {/* 🧭 Category Showcase */}
      <CategoryShowcase />
    </div>
  );
};

export default Shop;
