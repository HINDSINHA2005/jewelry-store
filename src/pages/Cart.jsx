// import React, { useEffect, useState } from "react";
// import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
// import { db } from "../firebase";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import products from "../components/shop/product";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useAuth();
//   const [cartItems, setCartItems] = useState([]);

//   // Fetch Cart Items
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (!currentUser) return;

//       const cartRef = collection(db, "carts", currentUser.uid, "items");
//       const snapshot = await getDocs(cartRef);

//       const firebaseItems = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const merged = firebaseItems.map((item) => {
//         const local = products.find((p) => p.id === item.productId);
//         return {
//           ...item,
//           image: local?.image || "",
//         };
//       });

//       setCartItems(merged);
//     };

//     fetchCart();
//   }, [currentUser]);

//   // Increase Quantity
//   const handleIncrease = async (item) => {
//     const itemRef = doc(db, "carts", currentUser.uid, "items", item.id);
//     const newQuantity = item.quantity + 1;

//     await updateDoc(itemRef, { quantity: newQuantity });

//     setCartItems((prev) =>
//       prev.map((i) =>
//         i.id === item.id ? { ...i, quantity: newQuantity } : i
//       )
//     );
//   };

//   // Decrease Quantity
//   const handleDecrease = async (item) => {
//     if (item.quantity <= 1) return; // Prevent 0 quantity

//     const itemRef = doc(db, "carts", currentUser.uid, "items", item.id);
//     const newQuantity = item.quantity - 1;

//     await updateDoc(itemRef, { quantity: newQuantity });

//     setCartItems((prev) =>
//       prev.map((i) =>
//         i.id === item.id ? { ...i, quantity: newQuantity } : i
//       )
//     );
//   };

//   // Remove Item
//   const handleRemove = async (itemId) => {
//     const itemRef = doc(db, "carts", currentUser.uid, "items", itemId);
//     await deleteDoc(itemRef);

//     setCartItems((prev) => prev.filter((i) => i.id !== itemId));
//   };

//   const goToCheckout = () => navigate("/checkout");

//   const totalPrice = cartItems.reduce(
//     (sum, item) =>
//       sum +
//       parseInt(item.price.toString().replace(/[^\d]/g, "")) * item.quantity,
//     0
//   );

//   return (
//     <div className="container py-5">
//       <h2 className="text-warning fw-bold mb-4">Your Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className="row g-4">
//           <div className="col-lg-8">
//             {cartItems.map((item) => (
//               <div key={item.id} className="card mb-3 shadow-sm border-0">
//                 <div className="row g-0 align-items-center">
//                   <div className="col-md-3">
//                     <img
//                       src={item.image}
//                       className="img-fluid rounded-start"
//                       alt={item.name}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <div className="card-body">
//                       <h5 className="card-title fw-semibold">{item.name}</h5>
//                       <p className="card-text text-muted">₹ {item.price}</p>
//                     </div>
//                   </div>
//                   <div className="col-md-3 d-flex flex-column align-items-center">
//                     <div className="d-flex mb-2">
//                       <button
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() => handleDecrease(item)}
//                       >
//                         -
//                       </button>
//                       <input
//                         type="text"
//                         className="form-control text-center mx-2"
//                         style={{ width: "50px" }}
//                         value={item.quantity}
//                         readOnly
//                       />
//                       <button
//                         className="btn btn-sm btn-outline-secondary"
//                         onClick={() => handleIncrease(item)}
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleRemove(item.id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="col-lg-4">
//             <div className="card shadow-sm border-0 p-4">
//               <h5 className="fw-bold mb-3">Cart Summary</h5>
//               <p className="mb-1">Total Items: {cartItems.length}</p>
//               <p className="mb-3">Total Price: ₹ {totalPrice}</p>
//               <button
//                 onClick={goToCheckout}
//                 className="btn btn-warning w-100 fw-semibold text-white"
//               >
//                 Proceed to Order
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import products from "../components/shop/product";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

const Cart = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      if (!currentUser) return;

      const cartRef = collection(db, "carts", currentUser.uid, "items");
      const snapshot = await getDocs(cartRef);

      const firebaseItems = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

//       const merged = firebaseItems.map((item) => {
//         const local = products.find((p) => p.id === item.productId);
//         return {
//           ...item,
//           image: local?.image || "",
//         };
//       });


// setCartItems(merged);


    const merged = firebaseItems.map((item) => {
  const local = products.find((p) => p.id === item.productId);
  return {
    ...item,
    // Always have image set, using local image or Firestore imageUrl
    image: local?.image || item.imageUrl || item.image || "",
    name: item.name || local?.name || "Unnamed Product",
    price: item.price || local?.price || 0,
  };
});

setCartItems(merged);

    };

    fetchCart();
  }, [currentUser]);

  // Increase Quantity
  const handleIncrease = async (item) => {
    const itemRef = doc(db, "carts", currentUser.uid, "items", item.id);
    const newQuantity = item.quantity + 1;

    await updateDoc(itemRef, { quantity: newQuantity });

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  // Decrease Quantity
  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return; // Prevent 0 quantity

    const itemRef = doc(db, "carts", currentUser.uid, "items", item.id);
    const newQuantity = item.quantity - 1;

    await updateDoc(itemRef, { quantity: newQuantity });

    setCartItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  // Remove Item
  const handleRemove = async (itemId) => {
    const itemRef = doc(db, "carts", currentUser.uid, "items", itemId);
    await deleteDoc(itemRef);

    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const goToCheckout = () => navigate("/checkout");

  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      parseInt(item.price.toString().replace(/[^\d]/g, "")) * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-5 text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center fs-5 text-muted">Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-4 shadow-lg border-0 rounded-4"
                style={{ overflow: "hidden" }}
              >
                <div className="row g-0 align-items-center">
                  <div className="col-md-4 p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-4 shadow"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "180px",
                        borderRadius: "1rem",
                      }}
                    />
                  </div>
                  <div className="col-md-5 px-4">
                    <div className="card-body">
                      <h5 className="card-title fw-bold text-dark">{item.name}</h5>
                      <p className="card-text text-secondary fs-5 fw-semibold">
                         {item.price}
                      </p>
                      <p className="text-muted small">Beautifully crafted jewelry piece.</p>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex flex-column align-items-center px-3 py-4">
                    <div className="d-flex align-items-center mb-3 rounded-3 border border-warning px-2 py-1 shadow-sm" style={{backgroundColor: "#fff8e1"}}>
                      <button
                        className="btn btn-link p-0 me-3 text-warning"
                        onClick={() => handleDecrease(item)}
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={22} />
                      </button>
                      <input
                        type="text"
                        className="form-control text-center fw-semibold"
                        style={{ width: "55px", fontSize: "1.1rem", backgroundColor: "#fff8e1", border: "none", pointerEvents: "none" }}
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-link p-0 ms-3 text-warning"
                        onClick={() => handleIncrease(item)}
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={22} />
                      </button>
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm mt-auto w-100 fw-semibold d-flex align-items-center justify-content-center"
                      onClick={() => handleRemove(item.id)}
                      aria-label="Remove item"
                      style={{ gap: "6px" }}
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{backgroundColor: "#fff9e8"}}>
              <h5 className="fw-bold mb-4 text-warning text-center">Cart Summary</h5>
              <p className="mb-2 fs-5">
                Total Items: <span className="fw-semibold">{cartItems.length}</span>
              </p>
              <p className="mb-4 fs-4">
                Total Price: <span className="fw-bold text-warning">₹ {totalPrice}</span>
              </p>
              <button
                onClick={goToCheckout}
                className="btn btn-warning w-100 fw-bold text-white shadow-sm"
                style={{ fontSize: "1.15rem" }}
              >
                Proceed to Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

