// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { useAuth } from "../context/AuthContext";
// import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

// const Checkout = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const buyNowProduct = location.state?.product; // ✅ Product passed from Buy Now button

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Shipping form states
//   const [fullName, setFullName] = useState("");
//   const [address, setAddress] = useState("");
//   const [city, setCity] = useState("");
//   const [phone, setPhone] = useState("");
//   const [Pincode, setPincode] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

//   // ✅ Load Cart or Buy Now product
//   useEffect(() => {
//     if (buyNowProduct) {
//       // ✅ Coming from Buy Now button
//       setCartItems([{ ...buyNowProduct, quantity: 1 }]);
//       setLoading(false);
//     } else {
//       // ✅ Normal cart checkout
//       const fetchCart = async () => {
//         if (!currentUser) return;
//         const snapshot = await getDocs(collection(db, "carts", currentUser.uid, "items"));
//         const items = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(items);
//         setLoading(false);
//       };
//       fetchCart();
//     }
//   }, [currentUser, buyNowProduct]);

//   const subtotal = cartItems.reduce((sum, item) => {
//     const price = parseInt(item.price.toString().replace(/[^\d]/g, ""));
//     return sum + price * (item.quantity || 1);
//   }, 0);

//   const shipping = 0;
//   const total = subtotal + shipping;

//   const handlePlaceOrderClick = async () => {
//      if (!currentUser) {
//     alert("Please sign in to place an order.");
//     return;
//   }

//     const order = {
//       userId: currentUser.uid,
//       items: cartItems,
//       total,
//       shipping,
//       shippingInfo: {
//         fullName,
//         address,
//         Pincode,
//         city,
//         phone,
//         paymentMethod,
//       },
//       status: "ordered",
//       createdAt: new Date(),
//     };

//     // ✅ Save order
//     const newOrder = await addDoc(
//       collection(db, "orders", currentUser.uid, "orders"),
//       order
//     );

//     // ✅ If this is not Buy Now, clear cart
//     if (!buyNowProduct) {
//       const cartRef = collection(db, "carts", currentUser.uid, "items");
//       const snapshot = await getDocs(cartRef);
//       snapshot.forEach(async (docSnap) => {
//         await deleteDoc(doc(db, "carts", currentUser.uid, "items", docSnap.id));
//       });
//     }

//     // ✅ Navigate to confirmation page
//     navigate("/order-confirmation", {
//       state: {
//         orderId: newOrder.id,
//         total,
//         paymentMethod,
//       },
//     });
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading...</div>;
//   }

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center text-warning fw-bold">Checkout</h2>
//       <div className="row g-4">
//         {/* Shipping Details Form */}
//         <div className="col-md-7">
//           <div className="card shadow border-0 p-4">
//             <h5 className="mb-3 fw-semibold">Shipping Information</h5>
//             <form>
//               <div className="mb-3">
//                 <label className="form-label">Full Name</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your name"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Address</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Pincode</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter pincode"
//                   value={Pincode}
//                   onChange={(e) => setPincode(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">City</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter your city"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Phone</label>
//                 <input
//                   type="tel"
//                   className="form-control"
//                   placeholder="Enter phone number"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Payment Method</label>
//                 <select
//                   className="form-select"
//                   value={paymentMethod}
//                   onChange={(e) => setPaymentMethod(e.target.value)}
//                 >
//                   <option>Cash on Delivery</option>
//                   <option>Online Payment</option>
//                 </select>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="col-md-5">
//           <div className="card shadow border-0 p-4 bg-light">
//             <h5 className="mb-3 fw-semibold">Order Summary</h5>
//             <ul className="list-group mb-3">
//               {cartItems.map((item, index) => (
//                 <li
//                   key={index}
//                   className="list-group-item d-flex justify-content-between"
//                 >
//                   <span>{item.name}</span>
//                   <span>{item.price}</span>
//                 </li>
//               ))}
//               <li className="list-group-item d-flex justify-content-between">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal}</span>
//               </li>
//               <li className="list-group-item d-flex justify-content-between">
//                 <span>Shipping</span>
//                 <span>₹{shipping}</span>
//               </li>
//               <li className="list-group-item d-flex justify-content-between fw-bold text-warning">
//                 <span>Total</span>
//                 <span>₹{total}</span>
//               </li>
//             </ul>

//             <button
//               className="btn btn-warning w-100 fw-semibold"
//               onClick={handlePlaceOrderClick}
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



// import { useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { useAuth } from "../context/AuthContext";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { FaShippingFast, FaCreditCard } from "react-icons/fa";

// const Checkout = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const buyNowProduct = location.state?.product;

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   // Form states
//   const [fullName, setFullName] = useState("");
//   const [email, setEmail] = useState(currentUser?.email || "");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

//   // Estimated Delivery Dates
//   const today = new Date();
//   const deliveryStart = new Date(today);
//   const deliveryEnd = new Date(today);
//   deliveryStart.setDate(today.getDate() + 5);
//   deliveryEnd.setDate(today.getDate() + 8);
//   const formatDate = (date) =>
//     date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   const estimatedDelivery = `${formatDate(deliveryStart)} – ${formatDate(deliveryEnd)}`;

//   // Load cart or Buy Now
//   useEffect(() => {
//     if (buyNowProduct) {
//       setCartItems([{ ...buyNowProduct, quantity: 1 }]);
//       setLoading(false);
//     } else {
//       const fetchCart = async () => {
//         if (!currentUser) return;
//         const snapshot = await getDocs(
//           collection(db, "carts", currentUser.uid, "items")
//         );
//         const items = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCartItems(items);
//         setLoading(false);
//       };
//       fetchCart();
//     }
//   }, [currentUser, buyNowProduct]);

//   const subtotal = cartItems.reduce((sum, item) => {
//     const price = parseInt(item.price?.toString().replace(/[^\d]/g, "")) || 0;
//     return sum + price * (item.quantity || 1);
//   }, 0);

//   const shipping = 0;
//   const total = subtotal + shipping;

//   const handlePlaceOrderClick = async () => {
//     if (!currentUser) {
//       alert("Please sign in to place an order.");
//       return;
//     }

//     if (!fullName || !phone || !address || !pincode || !city || !state) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setPlacingOrder(true);

//     const order = {
//       userId: currentUser.uid,
//       items: cartItems,
//       total,
//       shipping,
//       shippingInfo: {
//         fullName,
//         email,
//         phone,
//         address,
//         pincode,
//         city,
//         state,
//         paymentMethod,
//       },
//       status: "ordered",
//       createdAt: new Date(),
//     };

//     const newOrder = await addDoc(
//       collection(db, "orders", currentUser.uid, "orders"),
//       order
//     );

//     if (!buyNowProduct) {
//       const cartRef = collection(db, "carts", currentUser.uid, "items");
//       const snapshot = await getDocs(cartRef);
//       snapshot.forEach(async (docSnap) => {
//         await deleteDoc(doc(db, "carts", currentUser.uid, "items", docSnap.id));
//       });
//     }

//     setPlacingOrder(false);
//    navigate("/order-confirmation", {
//   state: {
//     orderId: newOrder.id,
//     total,
//     paymentMethod,
//     shippingInfo: order.shippingInfo,
//   },
// });

//   };

//   if (loading) return <div className="text-center py-5">Loading...</div>;

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center text-warning fw-bold">Checkout</h2>
//       <div className="row g-4">
//         {/* Shipping Form */}
//         <div className="col-md-7">
//           <div className="card shadow-sm border-0 p-4">
//             <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
//               <FaShippingFast className="me-2" />
//               Shipping Information
//             </h5>
//             <form>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Email (optional)</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Phone *</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     required
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">Address *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Pincode *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     value={pincode}
//                     onChange={(e) => setPincode(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">City *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     value={city}
//                     onChange={(e) => setCity(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">State *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     required
//                     value={state}
//                     onChange={(e) => setState(e.target.value)}
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Payment Method</label>
//                   <select
//                     className="form-select"
//                     value={paymentMethod}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                   >
//                     <option>Cash on Delivery</option>
//                     <option>Online Payment</option>
//                   </select>
//                 </div>
//               </div>
//             </form>

//             {/* Delivery Preview */}
//             {fullName && address && city && pincode && (
//               <div className="mt-4 bg-light p-3 rounded shadow-sm">
//                 <h6 className="fw-bold text-secondary">📦 Delivery Address Preview</h6>
//                 <p className="mb-1">{fullName}</p>
//                 <p className="mb-1">{address}, {city}, {state} - {pincode}</p>
//                 <p className="mb-1">Phone: {phone}</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="col-md-5">
//           <div className="card shadow-sm border-0 p-4 bg-light">
//             <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
//               <FaCreditCard className="me-2" />
//               Order Summary
//             </h5>

//             <ul className="list-group mb-3">
//               {cartItems.map((item, index) => (
//                 <li key={index} className="list-group-item d-flex justify-content-between">
//                   <div>
//                     <strong>{item.name}</strong>
//                     <div className="small text-muted">Qty: {item.quantity || 1}</div>
//                   </div>
//                   <span>
//                     ₹{parseInt(item.price.toString().replace(/[^\d]/g, ""))}
//                   </span>
//                 </li>
//               ))}
//               <li className="list-group-item d-flex justify-content-between">
//                 <span>Subtotal</span>
//                 <strong>₹{subtotal}</strong>
//               </li>
//               <li className="list-group-item d-flex justify-content-between">
//                 <span>Shipping</span>
//                 <strong>₹{shipping}</strong>
//               </li>
//               <li className="list-group-item d-flex justify-content-between fw-bold text-warning">
//                 <span>Total</span>
//                 <span>₹{total}</span>
//               </li>
//             </ul>

//             <p className="text-muted mb-3">
//               <strong>Estimated Delivery:</strong> {estimatedDelivery}
//             </p>

//             <button
//               className="btn btn-lg btn-warning w-100 fw-semibold"
//               onClick={handlePlaceOrderClick}
//               disabled={placingOrder}
//             >
//               {placingOrder ? "Placing Order..." : "Place Order"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;



import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import QRCode from "../assets/qr.jpg";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FaShippingFast, FaCreditCard } from "react-icons/fa";

// Add this near the top of your component
const coupons = [
  { code: "DISCOUNT10", discount: 50 },
  { code: "DISCOUNTGIVEAWAY", discount: 30 },

  
];




const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.product;
const [couponCode, setCouponCode] = useState("");
const [discountAmount, setDiscountAmount] = useState(0);
const [couponMessage, setCouponMessage] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Prepaid");

  // Checkbox for saving address
  const [saveAddress, setSaveAddress] = useState(false);

  // Saved addresses loaded from Firestore
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Estimated Delivery Dates (unchanged)
  const today = new Date();
  const deliveryStart = new Date(today);
  const deliveryEnd = new Date(today);
  deliveryStart.setDate(today.getDate() + 5);
  deliveryEnd.setDate(today.getDate() + 8);
  const formatDate = (date) =>
    date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  const estimatedDelivery = `${formatDate(deliveryStart)} – ${formatDate(deliveryEnd)}`;

  // Load cart or Buy Now
  useEffect(() => {
    if (buyNowProduct) {
      setCartItems([{ ...buyNowProduct, quantity: 1 }]);
      setLoading(false);
    } else {
      const fetchCart = async () => {
        if (!currentUser) return;
        const snapshot = await getDocs(
          collection(db, "carts", currentUser.uid, "items")
        );
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setLoading(false);
      };
      fetchCart();
    }
  }, [currentUser, buyNowProduct]);

  // Load saved addresses on mount if user logged in
  useEffect(() => {
    if (!currentUser) return;
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      const addressesRef = collection(db, "users", currentUser.uid, "addresses");
      const snapshot = await getDocs(addressesRef);
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSavedAddresses(list);
      setLoadingAddresses(false);
    };
    fetchAddresses();
  }, [currentUser]);

  // When user selects a saved address, auto-fill form
  const handleSelectSavedAddress = (addr) => {
    setFullName(addr.fullName);
    setEmail(addr.email || currentUser.email);
    setPhone(addr.phone);
    setAddress(addr.address);
    setPincode(addr.pincode);
    setCity(addr.city);
    setState(addr.state);
    setPaymentMethod("Prepaid");
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price?.toString().replace(/[^\d]/g, "")) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

const shipping = 0;

const total = Math.max(0, subtotal + shipping - discountAmount);


// Function to apply coupon
const handleApplyCoupon = () => {
  const coupon = coupons.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
  if (coupon) {
    setDiscountAmount(coupon.discount);
    setCouponMessage(`Coupon applied! ₹${coupon.discount} off.`);
  } else {
    setDiscountAmount(0);
    setCouponMessage("Invalid coupon code.");
  }
};


  const handlePlaceOrderClick = async () => {
    if (!currentUser) {
      alert("Please sign in to place an order.");
      return;
    }

    if (!fullName || !phone || !address || !pincode || !city || !state) {
      alert("Please fill in all required fields.");
      return;
    }

    setPlacingOrder(true);

    // Save address if checkbox checked
    if (saveAddress) {
      try {
        await addDoc(collection(db, "users", currentUser.uid, "addresses"), {
          fullName,
          email,
          phone,
          address,
          pincode,
          city,
          state,
          paymentMethod,
          createdAt: new Date(),
        });
        // Refresh saved addresses list after saving new address
        const snapshot = await getDocs(collection(db, "users", currentUser.uid, "addresses"));
        setSavedAddresses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        alert("Address saved successfully!");
      } catch (err) {
        console.error("Error saving address:", err);
        alert("Failed to save address.");
      }
    }

    const order = {
      userId: currentUser.uid,
      items: cartItems,
      total,
      shipping,
      shippingInfo: {
        fullName,
        email,
        phone,
        address,
        pincode,
        city,
        state,
        paymentMethod,
      },
      status: "ordered",
      createdAt: new Date(),
    };

    const newOrder = await addDoc(
      collection(db, "orders", currentUser.uid, "orders"),
      order
    );

    if (!buyNowProduct) {
      const cartRef = collection(db, "carts", currentUser.uid, "items");
      const snapshot = await getDocs(cartRef);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "carts", currentUser.uid, "items", docSnap.id));
      });
    }

    setPlacingOrder(false);
    navigate("/order-confirmation", {
      state: {
        orderId: newOrder.id,
        total,
        paymentMethod,
        shippingInfo: order.shippingInfo,
      },
    });
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-warning fw-bold">Checkout</h2>
      <div className="row g-4">
        {/* Shipping Form */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
              <FaShippingFast className="me-2" />
              Shipping Information
            </h5>

            {/* Saved addresses dropdown */}
            {loadingAddresses ? (
              <p>Loading saved addresses...</p>
            ) : savedAddresses.length > 0 ? (
              <div className="mb-3">
                <label className="form-label fw-semibold">Select Saved Address</label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selected = savedAddresses.find(addr => addr.id === e.target.value);
                    if(selected) handleSelectSavedAddress(selected);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>
                    -- Choose an address --
                  </option>
                  {savedAddresses.map((addr) => (
                    <option key={addr.id} value={addr.id}>
                      {addr.fullName} — {addr.address}, {addr.city}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            <form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email (optional)</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    className="form-control"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Payment Method</label>
                  <select
                    className="form-select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option>Prepaid</option>
                  </select>
                </div>

                <div className="col-12 form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="saveAddressCheck"
                    checked={saveAddress}
                    onChange={() => setSaveAddress(!saveAddress)}
                    disabled={!currentUser}
                  />
                  <label className="form-check-label" htmlFor="saveAddressCheck">
                    Save this address for future use
                  </label>
                  {!currentUser && (
                    <small className="text-danger d-block mt-1">
                      Please sign in to save your address.
                    </small>
                  )}
                </div>
              </div>
              {/* ✅ Show QR code if Prepaid is selected */}

            </form>

            {/* Delivery Preview */}
            {fullName && address && city && pincode && (
              <div className="mt-4 bg-light p-3 rounded shadow-sm">
                <h6 className="fw-bold text-secondary">📦 Delivery Address Preview</h6>
                <p className="mb-1">{fullName}</p>
                <p className="mb-1">
                  {address}, {city}, {state} - {pincode}
                </p>
                <p className="mb-1">Phone: {phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
              <FaCreditCard className="me-2" />
              Order Summary
            </h5>
<div className="mb-3">
  <label className="form-label fw-semibold">Coupon Code</label>
  <div className="d-flex">
    <input
      type="text"
      className="form-control me-2"
      value={couponCode}
      onChange={(e) => setCouponCode(e.target.value)}
      placeholder="Enter coupon code"
    />
    <button className="btn btn-primary" onClick={handleApplyCoupon}>
      Apply
    </button>
  </div>
  {couponMessage && <small className="text-success">{couponMessage}</small>}
</div>

            <ul className="list-group mb-3">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div className="small text-muted">
                      Qty: {item.quantity || 1}
                    </div>
                  </div>
                  <span>
                    ₹
                    {parseInt(
                      item.price.toString().replace(/[^\d]/g, "")
                    )}
                  </span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <strong>₹{shipping}</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold text-warning">
                <span>Total</span>
                <span>₹{total}</span>
              </li>
            </ul>
{paymentMethod === "Prepaid" && (
  <div className="mt-1 text-center bg-light p-3 rounded shadow-sm">
    <h6 className="fw-bold text-success">Scan & Pay via UPI</h6>
    <img
      src={QRCode}
      alt="UPI QR"
      className="img-fluid mb-2"
      style={{ maxWidth: "200px" }}
    />
    <p className="mb-1 fw-semibold">UPI ID: <span className="text-primary">7417542861@ptsbi</span></p>
    <p className="small text-muted">Please complete payment before placing your order.</p>
  </div>
)}
            <p className="text-muted mb-3">
              <strong>Estimated Delivery:</strong> {estimatedDelivery}
            </p>

            <button
              className="btn btn-lg btn-warning w-100 fw-semibold"
              onClick={handlePlaceOrderClick}
              disabled={placingOrder}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};

export default Checkout;
