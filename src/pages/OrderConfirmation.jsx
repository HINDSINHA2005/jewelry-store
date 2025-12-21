
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import successIcon from "../assets/sucessicon.png";

// const OrderConfirmation = () => {
//   const { state } = useLocation();

//   const orderId = state?.orderId || "N/A";
//   const paymentMethod = "Razorpay-Link";
//   const total = state?.total || "N/A";
//   const shippingInfo = state?.shippingInfo || null;

//   return (
//     <div className="container text-center py-5">
//       <img src={successIcon} alt="Success" style={{ width: "100px" }} className="mb-4" />
//       <h2 className="fw-bold text-success mb-3">Thank You for Your Purchase!</h2>
//       <p className="lead">
//         Your order has been placed successfully. We’ll deliver your jewelry soon!
//       </p>

//       <div className="my-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
//         <h5 className="fw-semibold text-dark">🧾 Order Summary</h5>
//         <p className="mb-1">Order ID: <strong>{orderId}</strong></p>
//         <p className="mb-1">Payment Method: <strong>{paymentMethod}</strong></p>
//         <p className="mb-1">Total: <strong>₹{total}</strong></p>
//       </div>

//       {shippingInfo && (
//         <div className="my-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
//           <h5 className="fw-semibold text-dark">📬 Delivery Address</h5>
//           <p className="mb-1">{shippingInfo.fullName}</p>
//           <p className="mb-1">{shippingInfo.address}</p>
//           <p className="mb-1">{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
//           <p className="mb-1">📞 {shippingInfo.phone}</p>
//         </div>
//       )}

//       <Link to="/shop" className="btn btn-outline-warning mt-4 px-4">
//         Continue Shopping
//       </Link>
//     </div>
//   );
// };

// export default OrderConfirmation;


import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import successIcon from "../assets/sucessicon.png";

const OrderConfirmation = () => {
  const { state } = useLocation();

  // 🛑 If page refreshed or opened directly
  if (!state) {
    return <Navigate to="/" />;
  }

  const {
    orderId,
    total,
    paymentStatus,
    fullName,
    email,
    phone,
    address,
    city,
    state: userState,
    pincode,
    paymentMethod,
  } = state;

  return (
    <div className="container text-center py-5">
      <img
        src={successIcon}
        alt="Success"
        style={{ width: "100px" }}
        className="mb-4"
      />

      <h2 className="fw-bold text-success mb-2">
        {paymentStatus === "paid"
          ? "Payment Successful 🎉"
          : "Order Placed (Payment Pending)"}
      </h2>

      <p className="lead">
        Thank you for shopping with Jewelora. Your order is being processed.
      </p>

      {/* ORDER SUMMARY */}
      <div className="my-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
        <h5 className="fw-semibold text-dark mb-2">🧾 Order Summary</h5>

        <p className="mb-1">
          <strong>Order ID:</strong> {orderId}
        </p>

        <p className="mb-1">
          <strong>Payment Method:</strong> {paymentMethod || "Razorpay"}
        </p>

        <p className="mb-1">
          <strong>Payment Status:</strong>{" "}
          {paymentStatus === "paid" ? (
            <span className="badge bg-success ms-1">Paid</span>
          ) : (
            <span className="badge bg-warning text-dark ms-1">
              Pending
            </span>
          )}
        </p>

        <p className="mb-1">
          <strong>Total Amount:</strong> ₹{total}
        </p>
      </div>

      {/* SHIPPING DETAILS */}
      <div className="my-4 text-start mx-auto" style={{ maxWidth: "500px" }}>
        <h5 className="fw-semibold text-dark mb-2">
          📦 Delivery Address
        </h5>

        <p className="mb-1 fw-semibold">{fullName}</p>
        <p className="mb-1">{address}</p>
        <p className="mb-1">
          {city}, {userState} – {pincode}
        </p>
        <p className="mb-1">📞 {phone}</p>
        {email && <p className="mb-1">📧 {email}</p>}
      </div>

      <Link to="/shop" className="btn btn-warning mt-4 px-4 fw-semibold">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
