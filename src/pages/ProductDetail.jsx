import { useParams } from "react-router-dom";
import products from '../components/shop/product.js';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="container py-5 text-center">Product not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxWidth: "400px", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description || "Beautiful handcrafted jewelry."}</p>
          <h4 className="text-warning fw-bold">{product.price}</h4>
          <button className="btn btn-warning mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
