import React from "react";
import { Link } from "react-router-dom";
import successIcon from "../assets/sucessicon.png"; // use a success image like a checkmark

const OrderConfirmation = () => {
  return (
    <div className="container text-center py-5">
      <img src={successIcon} alt="Success" style={{ width: "100px" }} className="mb-4" />
      <h2 className="fw-bold text-success mb-3">Thank You for Your Purchase!</h2>
      <p className="lead">Your order has been placed successfully. We’ll deliver your jewelry soon!</p>
      <div className="my-4">
        <h5 className="fw-semibold text-dark">Order Summary</h5>
        <p className="mb-1">Order ID: <strong>#JWL123456</strong></p>
        <p className="mb-1">Payment Method: <strong>Cash on Delivery</strong></p>
        <p className="mb-1">Total: <strong>₹20,200</strong></p>
      </div>
      <Link to="/shop" className="btn btn-outline-warning mt-4 px-4">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
