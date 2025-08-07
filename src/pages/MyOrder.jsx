// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { useAuth } from "../context/AuthContext";
// import { collection, getDocs } from "firebase/firestore";

// const MyOrders = () => {
//   const { currentUser } = useAuth();
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (!currentUser) return;

//       const orderRef = collection(db, "orders", currentUser.uid, "orders");
//       const snapshot = await getDocs(orderRef);
//       const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setOrders(data);
//     };
//     fetchOrders();
//   }, [currentUser]);

//   return (
//     <div className="container py-5">
//       <h2 className="text-warning fw-bold mb-4">My Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders yet.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} className="card mb-3 shadow-sm p-4">
//             <h5 className="fw-bold text-dark">Order ID: {order.id}</h5>
//              <p className="mb-1"><strong>Status:</strong> ₹{order.status}</p>
//             <p className="mb-1"><strong>Date:</strong> {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}</p>
//             <p className="mb-1"><strong>Payment:</strong> {order.shippingInfo?.paymentMethod}</p>
            

//             <p className="mb-1"><strong>Total:</strong> ₹{order.total}</p>

//             <p className="mb-2"><strong>Shipping To:</strong> {order.shippingInfo?.fullName}, {order.shippingInfo?.city},{order.shippingInfo?.address}</p>
//             <ul className="list-group">
//               {order.items.map((item, idx) => (
//                 <li key={idx} className="list-group-item d-flex justify-content-between">
//                   <span>{item.name}</span>
//                   <span>{item.price} × {item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MyOrders;
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const generateInvoice = (order) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Jewelora Invoice", 14, 20);
    doc.setFontSize(12);
    doc.text(`Order ID: ${order.id}`, 14, 30);
    doc.text(`Date: ${new Date(order.createdAt?.seconds * 1000).toLocaleString()}`, 14, 37);
    doc.text(`Customer: ${order.shippingInfo?.fullName}`, 14, 44);
    doc.text(`Email: ${order.shippingInfo?.email}`, 14, 51);
    doc.text(`Phone: ${order.shippingInfo?.phone}`, 14, 58);
    doc.text(`Address: ${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.pincode}`, 14, 65);

    autoTable(doc, {
      startY: 75,
      head: [["Item", "Qty", "Price", "Total"]],
      body: order.items.map((item) => [
        item.name,
        item.quantity,
        `₹${item.price}`,
        `₹${item.price * item.quantity}`,
      ]),
    });

    const totalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total: ₹${order.total}`, 14, totalY);

    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-muted">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm border-0">
            <div className="card-header bg-light d-flex justify-content-between">
              <h5 className="fw-bold mb-0">Order ID: {order.id}</h5>
              <span className="badge bg-success">{order.status || "Ordered"}</span>
            </div>

            <div className="card-body">
              <p><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleString()}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Payment Method:</strong> {order.shippingInfo?.paymentMethod}</p>

              <div className="mt-3">
                <h6 className="fw-semibold">Shipping Address</h6>
                <p className="mb-1"><strong>Name:</strong> {order.shippingInfo?.fullName}</p>
                <p className="mb-1"><strong>Email:</strong> {order.shippingInfo?.email}</p>
                <p className="mb-1"><strong>Phone:</strong> {order.shippingInfo?.phone}</p>
                <p className="mb-1"><strong>State:</strong> {order.shippingInfo?.state}</p>
                <p className="mb-1"><strong>Address:</strong> {order.shippingInfo?.address}, {order.shippingInfo?.city} - {order.shippingInfo?.pincode}</p>
              </div>

              <div className="mt-3">
                <h6 className="fw-semibold">Items</h6>
                <ul className="list-group">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-medium">{item.name}</span>
                        <br />
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => generateInvoice(order)}
                className="btn btn-outline-primary mt-4"
              >
                Download Invoice
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
