
import mangalsutra from '../assets/Mangalsutra/mangalsutra4'
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  // Temporary static data (replace with actual fetch logic later)
  const product = {
    id,
    name: "Gold Necklace",
    image: mangalsutra,
    description: "Elegant handcrafted gold necklace with modern finish.",
    price: "₹12,000",
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid rounded shadow" style={{ maxWidth: '400px', height: 'auto' }} />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-warning fw-bold">{product.price}</h4>
          <button className="btn btn-warning mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
