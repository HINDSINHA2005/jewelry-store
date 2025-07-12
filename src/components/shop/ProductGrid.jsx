import { Link } from "react-router-dom";
import products from '../../components/shop/product.js';

const ProductGrid = ({ category, searchTerm = "" }) => {
  const filteredProducts = products.filter((product) => {
    const matchCategory = category
      ? product.category.toLowerCase() === category.toLowerCase()
      : true;

    const matchSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    return matchCategory && matchSearch;
  });

  return (
    <div className="row g-4">
      {filteredProducts.map((prod, index) => (
        <div className="col-md-3 col-sm-6" key={index}>
          <div className="card border-0 shadow-sm h-100 d-flex flex-column overflow-hidden">
            <img
              src={prod.image}
              alt={prod.name}
              className="card-img-top"
              style={{
                height: "250px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div className="card-body text-center p-4 d-flex flex-column justify-content-between">
              <h6 className="fw-bold text-lg mb-2">{prod.name}</h6>
              <p className="text-amber-500 fw-semibold text-xl mb-3">{prod.price}</p>
              <Link to={`/product/${prod.id || index}`} className="btn btn-outline-warning btn-sm mt-auto">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}

      {filteredProducts.length === 0 && (
        <div className="text-center text-muted mt-4">
          No products found.
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
