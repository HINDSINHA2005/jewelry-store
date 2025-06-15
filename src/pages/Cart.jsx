import React from "react";

const Cart = () => {
  const cartItems = [
    {
      id: 1,
      name: "Elegant Gold Necklace",
      price: 15999,
      quantity: 1,
      image: "/assets/trending1.jpg",
    },
    {
      id: 2,
      name: "Diamond Ring",
      price: 7999,
      quantity: 2,
      image: "/assets/trending2.jpg",
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 shadow-sm border-0"
              >
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
                      <button className="btn btn-sm btn-outline-secondary">-</button>
                      <input
                        type="text"
                        className="form-control text-center mx-2"
                        style={{ width: "50px" }}
                        value={item.quantity}
                        readOnly
                      />
                      <button className="btn btn-sm btn-outline-secondary">+</button>
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
              <button className="btn btn-warning w-100 fw-semibold text-white">
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
