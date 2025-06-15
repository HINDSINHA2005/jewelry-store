import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const handlePlaceOrderClick = () => {
    // Perform any other logic needed before navigation (e.g., form submission, validation)
    navigate("/order-confirmation");
  };
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-warning fw-bold">Checkout</h2>
      <div className="row g-4">
        {/* Shipping Details Form */}
        <div className="col-md-7">
          <div className="card shadow border-0 p-4">
            <h5 className="mb-3 fw-semibold">Shipping Information</h5>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input type="text" className="form-control" placeholder="Enter your address" />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input type="text" className="form-control" placeholder="Enter your city" />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" placeholder="Enter phone number" />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select className="form-select">
                  <option>Cash on Delivery</option>
                  <option disabled>Online Payment (Coming Soon)</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card shadow border-0 p-4 bg-light">
            <h5 className="mb-3 fw-semibold">Order Summary</h5>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between">
                <span>Gold Ring</span>
                <span>₹5,000</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Diamond Necklace</span>
                <span>₹15,000</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹20,000</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹200</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold text-warning">
                <span>Total</span>
                <span>₹20,200</span>
              </li>
            </ul>

            <button className="btn btn-warning w-100 fw-semibold "onClick={handlePlaceOrderClick} >Place Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
