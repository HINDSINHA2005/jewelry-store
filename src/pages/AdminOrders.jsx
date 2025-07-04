import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AdminOrders = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const adminEmail = "info@jewelora.in"; // ✅ Replace with your actual admin email

  const [orders, setOrders] = useState([]);

  const isAdmin = currentUser?.email === adminEmail;

  

  useEffect(() => {
    if (!isAdmin) {
      navigate("/"); // 🚫 redirect non-admins
      return;
    }

    const fetchAllOrders = async () => {
      const snapshot = await getDocs(collectionGroup(db, "orders"));

      const allOrders = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ref: docSnap.ref,
        ...docSnap.data(),
      }));
      setOrders(allOrders);
    };

    fetchAllOrders();
  }, [currentUser, isAdmin, navigate]);

  const handleStatusChange = async (orderId, ref, newStatus) => {
    await updateDoc(ref, { status: newStatus });
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-warning mb-4">Admin: All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} id={`order-${order.id}`} className="card mb-4 shadow-sm p-4">

            <div className="d-flex justify-content-between">
              <div>
                <h5 className="mb-1 fw-bold text-dark">Order ID: {order.id}</h5>
                <p className="mb-0"><strong>Customer Name:</strong> {order.shippingInfo?.fullName}</p>
                <p className="mb-0"><strong>User:</strong> {order.userId}</p>
                <p className="mb-0"><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
              </div>
              <div>
                <select
                  className="form-select"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, order.ref, e.target.value)}
                >
                  <option value="ordered">Ordered</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>

            <hr />
            <div className="mb-2">
              <strong>Shipping To:</strong> 
              <br/>
              <strong>Customer Name:{order.shippingInfo?.fullName}</strong><br/>
              <strong>Address:{order.shippingInfo?.address}</strong> <br/>
              <strong>City:{order.shippingInfo?.city}</strong> <br/>
              <strong>Payment Type:{order.shippingInfo?.paymentMethod}</strong><br/>
              <strong>Mobile no:{order.shippingInfo?.phone}</strong>
            </div>

            <ul className="list-group mb-3">
              {order.items.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between">
                  <span>{item.name}</span>
                  <span>{item.price} × {item.quantity}</span>
                </li>
              ))}
            </ul>

            <p className="fw-bold text-end">Total: ₹{order.total}</p>
            <button
  className="btn btn-outline-secondary btn-sm mt-2"
  onClick={() => generateInvoice(order)}
>
  Download Invoice (PDF)
</button>

          </div>
        ))
      )}
      

    </div>
  );
};

export default AdminOrders;
