import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import products from "../components/shop/product"; // or wherever your static products file is

const Cart = () => {
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;

      const cartRef = collection(db, "carts", currentUser.uid, "items");
      const snapshot = await getDocs(cartRef);

      const firebaseItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Merge with product.js data
      const merged = firebaseItems.map((item) => {
        const local = products.find((p) => p.id === item.productId);
        return {
          ...item,
          image: local?.image || "",
        };
      });

      setCartItems(merged);
    };

    fetchCart();
  }, [currentUser]);

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      parseInt(item.price.toString().replace(/[^\d]/g, "")) * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm border-0">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      className="img-fluid rounded-start"
                      alt={item.name}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title fw-semibold">{item.name}</h5>
                      <p className="card-text text-muted">₹ {item.price}</p>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column align-items-center">
                    <div className="d-flex mb-2">
                      <button className="btn btn-sm btn-outline-secondary">
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center mx-2"
                        style={{ width: "50px" }}
                        value={item.quantity}
                        readOnly
                      />
                      <button className="btn btn-sm btn-outline-secondary">
                        +
                      </button>
                    </div>
                    <button className="btn btn-sm btn-danger">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-sm border-0 p-4">
              <h5 className="fw-bold mb-3">Cart Summary</h5>
              <p className="mb-1">Total Items: {cartItems.length}</p>
              <p className="mb-3">Total Price: ₹ {totalPrice}</p>
              <button
                onClick={goToCheckout}
                className="btn btn-warning w-100 fw-semibold text-white"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
