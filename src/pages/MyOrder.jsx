import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";

const MyOrders = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) return;

      const orderRef = collection(db, "orders", currentUser.uid, "orders");
      const snapshot = await getDocs(orderRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    };
    fetchOrders();
  }, [currentUser]);

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-3 shadow-sm p-4">
            <h5 className="fw-bold text-dark">Order ID: {order.id}</h5>
             <p className="mb-1"><strong>Status:</strong> ₹{order.status}</p>
            <p className="mb-1"><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
            <p className="mb-1"><strong>Payment:</strong> {order.shippingInfo?.paymentMethod}</p>
            <p className="mb-1"><strong>Total:</strong> ₹{order.total}</p>

            <p className="mb-2"><strong>Shipping To:</strong> {order.shippingInfo?.fullName}, {order.shippingInfo?.city}</p>
            <ul className="list-group">
              {order.items.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>₹{item.price} × {item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
