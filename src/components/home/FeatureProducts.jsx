import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import products from "../shop/product"; // adjust path if needed

const FeaturedProducts = () => {
  
  const { currentUser } = useAuth();

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      alert("Please sign in to add to cart");
      return;
    }

    const itemRef = doc(db, "carts", currentUser.uid, "items", product.id);
    await setDoc(itemRef, {
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    alert("Added to cart");
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-warning fw-bold">Featured Products</h2>
        <div className="row">
          {products.slice(0, 6).map((product) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{product.name}</h5>
                  <p className="card-text text-muted mb-2">{product.price}</p>

                  <button
                    className="btn btn-warning text-white fw-semibold mb-2"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-outline-warning btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
