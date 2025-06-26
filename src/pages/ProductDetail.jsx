import { useParams } from "react-router-dom";
import products from '../components/shop/product.js';
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // You must export `db` from firebase.js


const ProductDetail = () => {
  const { currentUser } = useAuth();
const handleAddToCart = async () => {
  if (!currentUser) {
    alert("Please sign in to add items to cart.");
    return;
  }

  const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

  try {
    const existing = await getDoc(cartItemRef);

    if (existing.exists()) {
      // Product already in cart → increase quantity
      const currentQty = existing.data().quantity || 1;
      await updateDoc(cartItemRef, {
        quantity: currentQty + 1,
      });
    } else {
      // New product → add to cart
      await setDoc(cartItemRef, {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    alert("Added to cart!");
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Something went wrong while adding to cart.");
  }
};

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
          
          <button className="btn btn-warning mt-3" onClick={handleAddToCart}>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
