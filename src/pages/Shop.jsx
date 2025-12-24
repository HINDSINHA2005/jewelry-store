



// import { useLocation } from "react-router-dom";
// import { useState } from "react";
// import { Search } from "lucide-react";

// import ProductGrid from "../components/shop/ProductGrid";
// import CategoryShowcase from "../components/home/CategoryShowcase";

// const Shop = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const category = query.get("category");

//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOrder, setSortOrder] = useState(""); // "asc" | "desc" | ""

//   return (
//     <section className="py-4" style={{ backgroundColor: "#f8f9fa" }}>
//       <div className="container px-4">
//         <div className="text-center mb-3 pb-3">
//           <h2 className="category-section-title">
//             {category ? `${category} Collection` : "All Products"}
//           </h2>
//         </div>

//         {/* 🔍 Search Input */}
//         <style>{`
//           .search-container {
//             position: relative;
//             width: 100%;
//             max-width: 400px;
//           }
//           .search-input {
//             padding-left: 38px;
//             border-radius: 25px;
//             box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//             font-size: 1rem;
//             transition: box-shadow 0.3s ease;
//           }
//           .search-input:focus {
//             box-shadow: 0 0 8px #f8c146;
//             border-color: #f8c146;
//             outline: none;
//           }
//           .search-icon {
//             position: absolute;
//             top: 50%;
//             left: 12px;
//             transform: translateY(-50%);
//             color: #f8c146;
//             pointer-events: none;
//           }
//         `}</style>

//         <div className="row mb-4 justify-content-center">
//           <div className="col-md-6 d-flex justify-content-center mb-2">
//             <div className="search-container">
//               <Search size={20} className="search-icon" />
//               <input
//                 type="text"
//                 placeholder="Double Tap to Search products..."
//                 className="form-control search-input"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           {/* 🏷 Sort Dropdown */}
//           <div className="col-md-3 d-flex justify-content-center">
//             <select
//               className="form-select"
//               value={sortOrder}
//               onChange={(e) => setSortOrder(e.target.value)}
//             >
//               <option value="">Sort by Price</option>
//               <option value="asc">Low to High</option>
//               <option value="desc">High to Low</option>
//             </select>
//           </div>
//         </div>

//         {!category && <hr className="my-4" />}

//         {/* 🛒 Product List */}
//         <ProductGrid category={category} searchTerm={searchTerm} sortOrder={sortOrder} />

//         {/* 🧭 Category Showcase */}
//         <CategoryShowcase />
//       </div>
//     </section>
//   );
// };

// export default Shop;



import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

import ProductGrid from "../components/shop/ProductGrid";
import CategoryShowcase from "../components/home/CategoryShowcase";
import FeaturedProducts from "../components/home/FeatureProducts";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  // 🔹 normalize category (important)
  const rawCategory = query.get("category");
  const category = rawCategory
    ? decodeURIComponent(rawCategory)
    : null;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  return (
    <section className="py-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container px-4">
        <div className="text-center mb-3 pb-3">
          <h2 className="category-section-title">
            {category ? `${category} Collection` : "All Products"}
          </h2>
        </div>

        {/* 🔍 Search Input */}
        <style>{`
          .search-container {
            position: relative;
            width: 100%;
            max-width: 400px;
          }
          .search-input {
            padding-left: 38px;
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

        <div className="row mb-4 justify-content-center">
          <div className="col-md-6 d-flex justify-content-center mb-2">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Double Tap to Search products..."
                className="form-control search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* 🏷 Sort Dropdown */}
          <div className="col-md-3 d-flex justify-content-center">
            <select
              className="form-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Sort by Price</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        {!category && <hr className="my-4" />}

        {/* 🛒 Product List */}
        <ProductGrid
          category={category}
          searchTerm={searchTerm}
          sortOrder={sortOrder}
        />

        {/* 🧭 Category Showcase (only on All Products) */}
        {/* {!category && <CategoryShowcase />} */}
        <FeaturedProducts/>
      </div>
    </section>
  );
};

export default Shop;
