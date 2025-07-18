import { useParams } from "react-router-dom";
import products from "../components/shop/product.js";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown"; // ✨ For rich text descriptions
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate(); 
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [dynamicProduct, setDynamicProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const localProduct = products.find((p) => String(p.id) === id);

  useEffect(() => {
    const fetchDynamicProduct = async () => {
      if (localProduct) {
        setDynamicProduct(null);
        setLoading(false);
        return;
      }
      try {
        const prodRef = doc(db, "dynamic_products", id);
        const docSnap = await getDoc(prodRef);
        if (docSnap.exists()) {
          setDynamicProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDynamicProduct();
  }, [id, localProduct]);

  const product = localProduct || dynamicProduct;

  const handleAddToCart = async () => {
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
          quantity: 1,
        });
      }

      //alert("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  if (loading) {
    return <div className="container py-5 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="container py-5 text-center">Product not found.</div>;
  }
  const goToCheckout = () => {
  navigate("/checkout", { state: { product } });
};


  return (
    <div className="container py-5">
      <div className="row align-items-start g-5">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <div
            className="mb-4"
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <ReactMarkdown>
              {product.description }
            </ReactMarkdown>
          </div>
          <h4 className="text-warning fw-bold mb-3">{product.price}</h4>

          <button className="btn btn-warning px-4 py-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
            <button className="btn btn-success px-6 py-2 ms-3" onClick={goToCheckout}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
