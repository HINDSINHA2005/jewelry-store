import { useLocation } from "react-router-dom";

import ProductGrid from "../components/shop/ProductGrid";
import CategoryShowcase from "../components/home/CategoryShowcase";

const Shop = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center text-warning mb-4">
        {category ? `${category} Collection` : "Our Products"}
      </h2>

      {!category && (
        <>
          
          
          <hr className="my-5" />
        </>
      )}

      <ProductGrid category={category} />
      <CategoryShowcase/>
    </div>
  );
};

export default Shop;
