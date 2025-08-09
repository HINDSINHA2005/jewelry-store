import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import products from "../shop/product"; // adjust if needed

const categories = ["Mangalsutra", "Necklaces", "Pendants", "Bracelets", "Rakhi", "Bangles","earrings","Special Collection",,"KADA","Modern Mangalsutra","Oxidised Necklaces","Modern Mangalsutra ","Rajvadhi Bracelet"];
const PRODUCTS_PER_CATEGORY = 3; 

const getFeaturedProducts = () => {
  const featured = [];
  categories.forEach((cat) => {
    const byCategory = products.filter(p => p.category === cat).slice(0, PRODUCTS_PER_CATEGORY);
    featured.push(...byCategory);
  });
  return featured;
};

const FeaturedProducts = () => {
  const { currentUser } = useAuth();
  const featuredProducts = getFeaturedProducts();

  const handleAddToCart = async (product) => {
    if (!currentUser) {
      alert("Please sign in to add items to cart.");
      return;
    }

    const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

    try {
      const existing = await getDoc(cartItemRef);

      if (existing.exists()) {
        await updateDoc(cartItemRef, {
          quantity: existing.data().quantity + 1,
        });
      } else {
        await setDoc(cartItemRef, {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image, // include image for cart display
          quantity: 1,
        });
      }

      alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 text-warning fw-bold">Featured Products</h2>
        <div className="row">
          {featuredProducts.map((product) => (
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
