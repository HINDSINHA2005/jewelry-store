import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

const Checkout = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const buyNowProduct = location.state?.product; // ✅ Product passed from Buy Now button

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Shipping form states
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [Pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // ✅ Load Cart or Buy Now product
  useEffect(() => {
    if (buyNowProduct) {
      // ✅ Coming from Buy Now button
      setCartItems([{ ...buyNowProduct, quantity: 1 }]);
      setLoading(false);
    } else {
      // ✅ Normal cart checkout
      const fetchCart = async () => {
        if (!currentUser) return;
        const snapshot = await getDocs(collection(db, "carts", currentUser.uid, "items"));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
        setLoading(false);
      };
      fetchCart();
    }
  }, [currentUser, buyNowProduct]);

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.toString().replace(/[^\d]/g, ""));
    return sum + price * (item.quantity || 1);
  }, 0);

  const shipping = 0;
  const total = subtotal + shipping;

  const handlePlaceOrderClick = async () => {
    if (!currentUser) return;

    const order = {
      userId: currentUser.uid,
      items: cartItems,
      total,
      shipping,
      shippingInfo: {
        fullName,
        address,
        Pincode,
        city,
        phone,
        paymentMethod,
      },
      status: "ordered",
      createdAt: new Date(),
    };

    // ✅ Save order
    const newOrder = await addDoc(
      collection(db, "orders", currentUser.uid, "orders"),
      order
    );

    // ✅ If this is not Buy Now, clear cart
    if (!buyNowProduct) {
      const cartRef = collection(db, "carts", currentUser.uid, "items");
      const snapshot = await getDocs(cartRef);
      snapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db, "carts", currentUser.uid, "items", docSnap.id));
      });
    }

    // ✅ Navigate to confirmation page
    navigate("/order-confirmation", {
      state: {
        orderId: newOrder.id,
        total,
        paymentMethod,
      },
    });
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter pincode"
                  value={Pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option>Cash on Delivery</option>
                  <option>Online Payment</option>
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
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{item.name}</span>
                  <span>{item.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between fw-bold text-warning">
                <span>Total</span>
                <span>₹{total}</span>
              </li>
            </ul>

            <button
              className="btn btn-warning w-100 fw-semibold"
              onClick={handlePlaceOrderClick}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
