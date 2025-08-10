// import { useParams } from "react-router-dom";
// import products from "../components/shop/product.js";
// import { useAuth } from "../context/AuthContext";
// import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown"; // ✨ For rich text descriptions
// import { useNavigate } from "react-router-dom";

// const ProductDetail = () => {
//   const navigate = useNavigate(); 
//   const { currentUser } = useAuth();
//   const { id } = useParams();
//   const [dynamicProduct, setDynamicProduct] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const localProduct = products.find((p) => String(p.id) === id);

//   useEffect(() => {
//     const fetchDynamicProduct = async () => {
//       if (localProduct) {
//         setDynamicProduct(null);
//         setLoading(false);
//         return;
//       }
//       try {
//         const prodRef = doc(db, "dynamic_products", id);
//         const docSnap = await getDoc(prodRef);
//         if (docSnap.exists()) {
//           setDynamicProduct({ id: docSnap.id, ...docSnap.data() });
//         }
//       } catch (err) {
//         console.error("Error fetching product:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDynamicProduct();
//   }, [id, localProduct]);

//   const product = localProduct || dynamicProduct;

//   const handleAddToCart = async () => {
//     if (!currentUser) {
//       alert("Please sign in to add items to cart.");
//       return;
//     }

//     const cartItemRef = doc(db, "carts", currentUser.uid, "items", product.id);

//     try {
//       const existing = await getDoc(cartItemRef);

//       if (existing.exists()) {
//         await updateDoc(cartItemRef, {
//           quantity: existing.data().quantity + 1,
//         });
//       } else {
//         await setDoc(cartItemRef, {
//           productId: product.id,
//           name: product.name,
//           price: product.price,
//           quantity: 1,
//         });
//       }

//       //alert("Added to cart!");
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       alert("Something went wrong while adding to cart.");
//     }
//   };

//   if (loading) {
//     return <div className="container py-5 text-center">Loading product...</div>;
//   }

//   if (!product) {
//     return <div className="container py-5 text-center">Product not found.</div>;
//   }
//   const goToCheckout = () => {
//   navigate("/checkout", { state: { product } });
// };


//   return (
//     <div className="container py-5">
//       <div className="row align-items-start g-5">
//         <div className="col-md-6 text-center">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="img-fluid rounded shadow"
//             style={{
//               maxWidth: "100%",
//               height: "auto",
//               objectFit: "contain",
//             }}
//           />
//         </div>
//         <div className="col-md-6">
//           <h2 className="fw-bold mb-3">{product.name}</h2>
//           <div
//             className="mb-4"
//             style={{
//               fontSize: "1rem",
//               lineHeight: "1.6",
//               fontFamily: "'Roboto', sans-serif",
//             }}
//           >
//             <ReactMarkdown>
//               {product.description }
//             </ReactMarkdown>
//           </div>
//           <h4 className="text-warning fw-bold mb-3">{product.price}</h4>

//           <button className="btn btn-warning px-4 py-2" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//             <button className="btn btn-success px-6 py-2 ms-3" onClick={goToCheckout}>
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import { useParams, useNavigate } from "react-router-dom";
import products from "../components/shop/product.js";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

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
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Something went wrong while adding to cart.");
    }
  };

  const goToCheckout = () => {
    navigate("/checkout", { state: { product } });
  };

  if (loading) {
    return <div className="container py-5 text-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="container py-5 text-center">Product not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row align-items-start g-5">
        {/* Product Image */}
        <div className="col-md-6 text-center">
          <div
            className="shadow rounded p-3 bg-white"
            style={{ border: "1px solid #f2f2f2" }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            {product.name}
          </h1>

          <div
            className="mb-4 text-secondary"
            style={{
              fontSize: "1.05rem",
              lineHeight: "1.8",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            <ReactMarkdown>{product.description}</ReactMarkdown>
          </div>

          <h3 className="text-warning fw-bold mb-4" style={{ fontSize: "1.8rem" }}>
            {product.price}
          </h3>

          <div className="d-flex gap-3">
            <button
              className="btn btn-warning fw-semibold px-4 py-2 shadow-sm"
              style={{
                borderRadius: "30px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>

            <button
              className="btn btn-success fw-semibold px-4 py-2 shadow-sm"
              style={{
                borderRadius: "30px",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onClick={goToCheckout}
            >
              💎 Buy Now
            </button>
          </div>

          <p className="mt-4 text-muted small">
            ✨ Free Shipping on orders above ₹999 | Easy Returns
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
