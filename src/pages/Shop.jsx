
import CategoryGrid from "../components/shop/CategoryGrid";
import ProductGrid from "../components/shop/ProductGrid";

const Shop = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold text-center text-warning mb-4">Shop by Category</h2>
      <CategoryGrid />

      <hr className="my-5" />

      <h2 className="fw-bold text-center text-warning mb-4">Our Products</h2>
      <ProductGrid />
    </div>
  );
};

export default Shop;
