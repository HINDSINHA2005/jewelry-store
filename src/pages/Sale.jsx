import ProductGrid from "../components/shop/ProductGrid";

const Sale = () => {
  return (
    <section className="py-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container px-4">
        {/* 🔥 Title */}
        <div className="text-center mb-3 pb-3">
          <h2 className="category-section-title">🔥 Sale Collection</h2>
        </div>

        <hr className="my-4" />

        {/* 🛒 Show only products with category = "Sale" */}
        <ProductGrid category="Sale" />
      </div>
    </section>
  );
};

export default Sale;
