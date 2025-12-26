



import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";

import { FaShippingFast, FaCreditCard } from "react-icons/fa";

// Coupons
const coupons = [
  { code: "DISCOUNT10", discount: 50 },
  { code: "DISCOUNTGIVEAWAY", discount: 30 },
  {code:"DISCOUNTOWNER",discount:298},
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

  // Loader
  const [showLoader, setShowLoader] = useState(false);
  const [loaderText, setLoaderText] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Save address
  const [saveAddress, setSaveAddress] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Estimated delivery
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
  const estimatedDelivery = `${formatDate(deliveryStart)} – ${formatDate(
    deliveryEnd
  )}`;

  // Load cart / buy now
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
        setCartItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      };
      fetchCart();
    }
  }, [currentUser, buyNowProduct]);

  // Load saved addresses
  useEffect(() => {
    if (!currentUser) return;
    const fetchAddresses = async () => {
      setLoadingAddresses(true);
      const snapshot = await getDocs(
        collection(db, "users", currentUser.uid, "addresses")
      );
      setSavedAddresses(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoadingAddresses(false);
    };
    fetchAddresses();
  }, [currentUser]);

  const handleSelectSavedAddress = (addr) => {
    setFullName(addr.fullName);
    setEmail(addr.email || currentUser.email);
    setPhone(addr.phone);
    setAddress(addr.address);
    setPincode(addr.pincode);
    setCity(addr.city);
    setState(addr.state);
  };

  // Price calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      parseInt(item.price?.toString().replace(/[^\d]/g, "")) || 0;
    return sum + price * (item.quantity || 1);
  }, 0);

  const shipping = 0;
  const total = Math.max(0, subtotal + shipping - discountAmount);

  // Apply coupon
  const handleApplyCoupon = () => {
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase()
    );
    if (coupon) {
      setDiscountAmount(coupon.discount);
      setCouponMessage(`Coupon applied! ₹${coupon.discount} off.`);
    } else {
      setDiscountAmount(0);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // =====================
  // PLACE ORDER (PREPAID)
  // =====================
  const handlePlaceOrderClick = async () => {
    if (!currentUser) return alert("Please sign in to place an order.");
    if (!fullName || !phone || !address || !pincode || !city || !state)
      return alert("Please fill all required fields.");

    try {
      setPlacingOrder(true);
      setShowLoader(true);
      setLoaderText("Initializing payment...");

      // Save address (optional)
      if (saveAddress) {
        await addDoc(collection(db, "users", currentUser.uid, "addresses"), {
          fullName,
          email,
          phone,
          address,
          pincode,
          city,
          state,
          createdAt: new Date(),
        });
      }

      // ✅ CREATE ORDER FIRST (OLD WORKING LOGIC)
      const orderRef = await addDoc(
        collection(db, "orders", currentUser.uid, "orders"),
        {
          userId: currentUser.uid,
          items: cartItems,
          total,
          shipping,
          paymentMethod: "Razorpay",
          paymentStatus: "pending",
          status: "payment_pending",
          shippingInfo: {
            fullName,
            email,
            phone,
            address,
            pincode,
            city,
            state,
          },
          createdAt: new Date(),
        }
      );

      // Create Razorpay order
      const response = await fetch(
        "https://jewelorabackend.onrender.com/create-razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: total,
            firestoreOrderId: orderRef.id, // 👈 REQUIRED FOR YOUR BACKEND
          }),
        }
      );

      const razorpayOrder = await response.json();
      setShowLoader(false);

      const options = {
        key: "rzp_live_Rw9rVaR1u2yTDV",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Jewelora",
        description: "Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            setShowLoader(true);
            setLoaderText("Verifying payment...");

            const verifyRes = await fetch(
              "https://jewelorabackend.onrender.com/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                  firestoreOrderId: orderRef.id,
                  userId: currentUser.uid,
                }),
              }
            );

            const verifyData = await verifyRes.json();
            if (!verifyData.success) throw new Error();

            // Clear cart
            if (!buyNowProduct) {
              const cartRef = collection(db, "carts", currentUser.uid, "items");
              const snapshot = await getDocs(cartRef);
              await Promise.all(
                snapshot.docs.map((d) =>
                  deleteDoc(doc(db, "carts", currentUser.uid, "items", d.id))
                )
              );
            }
// =======================
// SEND ORDER CONFIRMATION EMAIL
// =======================
emailjs.send(
  "service_pauibc6",          // your EmailJS service ID
  "template_n32ehvb",  // your template ID
  {
    customer_name: fullName,
    customer_email: email,
    order_id: orderRef.id,
    order_total: total,
    payment_method: "Razorpay",
    order_items: cartItems
      .map(item => `${item.name} × ${item.quantity || 1}`)
      .join(", "),
    address: `${address}, ${city}, ${state} - ${pincode}`,
  },
  "AL9Hdy7gl6JXUpK5z"           // EmailJS public key
)
.then(() => {
  console.log("Order email sent successfully");
})
.catch((err) => {
  console.error("Email send failed:", err);
});

            setShowLoader(false);
            setPlacingOrder(false);

            navigate("/order-confirmation", {
              state: {
                orderId: orderRef.id,
                total,
                paymentStatus: "paid",
                fullName,
                email,
                phone,
                address,
                city,
                state,
                pincode,
                paymentMethod: "Razorpay",
              },
            });
          } catch {
            setShowLoader(false);
            setPlacingOrder(false);
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: fullName,
          email,
          contact: phone,
        },
        theme: { color: "#f5b700" },
      };

      new window.Razorpay(options).open();
    } catch {
      setShowLoader(false);
      setPlacingOrder(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  
  return (
  <>
    {showLoader && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.85)",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-warning mb-3" />
        <strong>{loaderText}</strong>
        <small>Please don’t refresh or close this page</small>
      </div>
    )}

    <div className="container py-5">
      <h2 className="mb-4 text-center text-warning fw-bold">Checkout</h2>

      <div className="row g-4">
        {/* Shipping */}
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4">
            <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
              <FaShippingFast className="me-2" />
              Shipping Information
            </h5>

            {/* ✅ PREPAID ONLY MESSAGE */}
            <div className="alert alert-warning py-2 mb-4">
              <strong>Payment Method:</strong> Prepaid only (Online payment
              required)
            </div>

            {loadingAddresses ? (
              <p>Loading saved addresses...</p>
            ) : savedAddresses.length > 0 ? (
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Select Saved Address
                </label>
                <select
                  className="form-select"
                  onChange={(e) => {
                    const selected = savedAddresses.find(
                      (a) => a.id === e.target.value
                    );
                    if (selected) handleSelectSavedAddress(selected);
                  }}
                  defaultValue=""
                  disabled={placingOrder || showLoader}
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

            {/* 🔒 DISABLE FORM DURING PAYMENT */}
            <fieldset disabled={placingOrder || showLoader}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name *</label>
                  <input
                    className="form-control"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Phone *</label>
                  <input
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label">Address *</label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pincode *</label>
                  <input
                    className="form-control"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">City *</label>
                  <input
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">State *</label>
                  <input
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>

                <div className="col-12 form-check mt-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={saveAddress}
                    onChange={() => setSaveAddress(!saveAddress)}
                  />
                  <label className="form-check-label">
                    Save this address for future use
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        {/* Summary */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <h5 className="mb-4 fw-bold text-primary d-flex align-items-center">
              <FaCreditCard className="me-2" />
              Order Summary
            </h5>

            {/* Optional info */}
            <div className="mb-2 text-muted">
              <small>
                Payment Method: <strong>Prepaid (Razorpay)</strong>
              </small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Coupon Code</label>
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  disabled={placingOrder || showLoader}
                />
                <button
                  className="btn btn-primary"
                  onClick={handleApplyCoupon}
                  disabled={placingOrder || showLoader}
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <small className="text-success">{couponMessage}</small>
              )}
            </div>

            <ul className="list-group mb-3">
              {cartItems.map((item, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between"
                >
                  <div>
                    <strong>{item.name}</strong>
                    <div className="small text-muted">
                      Qty: {item.quantity || 1}
                    </div>
                  </div>
                  <span>₹{item.price}</span>
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

            <p className="text-muted mb-3">
              <strong>Estimated Delivery:</strong> {estimatedDelivery}
            </p>

            <button
              className="btn btn-lg btn-warning w-100 fw-semibold"
              onClick={handlePlaceOrderClick}
              disabled={placingOrder || showLoader}
            >
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
);

};

export default Checkout;


