
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collectionGroup, getDocs, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import ReceiptInvoice from "../components/ReceiptInvoice";

// const AdminOrders = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   // 🔐 ADMIN EMAIL
//   const adminEmail = "info@jewelora.in";
//   const isAdmin = currentUser?.email === adminEmail;

//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!isAdmin) {
//       navigate("/");
//       return;
//     }

//     const fetchAllOrders = async () => {
//       const snapshot = await getDocs(collectionGroup(db, "orders"));
//       const allOrders = snapshot.docs.map((docSnap) => ({
//         id: docSnap.id,
//         ref: docSnap.ref,
//         ...docSnap.data(),
//       }));
//       setOrders(allOrders);
//     };

//     fetchAllOrders();
//   }, [currentUser, isAdmin, navigate]);

//   // 🔄 Update fulfillment status (only after payment)
//   const handleStatusChange = async (orderId, ref, newStatus) => {
//     await updateDoc(ref, { status: newStatus });

//     setOrders((prev) =>
//       prev.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold text-warning mb-4 text-center">
//         Admin Panel: All Orders
//       </h2>

//       {orders.length === 0 ? (
//         <div className="text-center text-muted">No orders found.</div>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} className="card mb-5 shadow-lg border-0 p-4">
//             {/* HEADER */}
//             <div className="d-flex justify-content-between align-items-start flex-wrap">
//               <div>
//                 <h5 className="mb-1 fw-bold">Order ID: {order.id}</h5>

//                 <p className="mb-0">
//                   <strong>Customer:</strong>{" "}
//                   {order.shippingInfo?.fullName}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Email:</strong>{" "}
//                   {order.shippingInfo?.email || "—"}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Phone:</strong>{" "}
//                   {order.shippingInfo?.phone}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Date:</strong>{" "}
//                   {order.createdAt?.seconds
//                     ? new Date(
//                         order.createdAt.seconds * 1000
//                       ).toLocaleDateString()
//                     : "—"}
//                 </p>

//                 {/* PAYMENT INFO */}
//                 <p className="mb-0 mt-2">
//                   <strong>Payment Status:</strong>{" "}
//                   {order.paymentStatus === "paid" ? (
//                     <span className="badge bg-success ms-1">Paid</span>
//                   ) : (
//                     <span className="badge bg-warning text-dark ms-1">
//                       Pending
//                     </span>
//                   )}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Payment Method:</strong>{" "}
//                   {order.paymentMethod || "Razorpay"}
//                 </p>

//                 {order.razorpayPaymentId && (
//                   <p className="mb-0 small text-muted">
//                     <strong>Razorpay Payment ID:</strong>{" "}
//                     {order.razorpayPaymentId}
//                   </p>
//                 )}

//                 {order.paidAt && (
//                   <p className="mb-0 small text-muted">
//                     <strong>Paid At:</strong>{" "}
//                     {order.paidAt.seconds
//                       ? new Date(
//                           order.paidAt.seconds * 1000
//                         ).toLocaleString()
//                       : "—"}
//                   </p>
//                 )}
//               </div>

//               {/* ORDER STATUS */}
//               <div className="mt-2">
//                 <select
//                   className="form-select form-select-sm"
//                   value={order.status}
//                   onChange={(e) =>
//                     handleStatusChange(
//                       order.id,
//                       order.ref,
//                       e.target.value
//                     )
//                   }
//                   disabled={order.paymentStatus !== "paid"}
//                 >
//                   <option value="ordered">Ordered</option>
//                   <option value="shipped">Shipped</option>
//                   <option value="delivered">Delivered</option>
//                 </select>

//                 {order.paymentStatus !== "paid" && (
//                   <small className="text-muted">
//                     Payment required before shipping
//                   </small>
//                 )}
//               </div>
//             </div>

//             <hr />

//             {/* SHIPPING INFO */}
//             <div className="mb-3">
//               <h6 className="fw-bold">Shipping Address</h6>
//               <p className="mb-1">
//                 {order.shippingInfo?.address},{" "}
//                 {order.shippingInfo?.city},{" "}
//                 {order.shippingInfo?.state} –{" "}
//                 {order.shippingInfo?.pincode}
//               </p>
//             </div>

//             {/* ITEMS */}
//             <div className="mb-3">
//               <h6 className="fw-bold">Items Ordered</h6>
//               <ul className="list-group">
//                 {order.items?.map((item, idx) => (
//                   <li
//                     key={idx}
//                     className="list-group-item d-flex justify-content-between"
//                   >
//                     <div>
//                       <strong>{item.name}</strong> × {item.quantity}
//                       {item.customDetails && (
//                         <div className="small text-muted">
//                           {item.customDetails}
//                         </div>
//                       )}
//                     </div>
//                     <span>₹{item.price}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* FOOTER */}
//             <div className="text-end">
//               <p className="fw-bold fs-5 text-success">
//                 Total Amount: ₹{order.total}
//               </p>

//               <ReceiptInvoice order={order} />
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default AdminOrders;
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collectionGroup, getDocs, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReceiptInvoice from "../components/ReceiptInvoice";

const AdminOrders = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // 🔐 ADMIN EMAIL
  const adminEmail = "info@jewelora.in";
  const isAdmin = currentUser?.email === adminEmail;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
      return;
    }

    const fetchAllOrders = async () => {
      const snapshot = await getDocs(collectionGroup(db, "orders"));

      const allOrders = snapshot.docs
        .map((docSnap) => ({
          id: docSnap.id,
          ref: docSnap.ref,
          ...docSnap.data(),
        }))
        // ✅ SORT BY DATE (LATEST FIRST)
        .sort((a, b) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        });

      setOrders(allOrders);
    };

    fetchAllOrders();
  }, [currentUser, isAdmin, navigate]);

  // 🔄 Update fulfillment status (only after payment)
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
      <h2 className="fw-bold text-warning mb-4 text-center">
        Admin Panel: All Orders
      </h2>

      {orders.length === 0 ? (
        <div className="text-center text-muted">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-5 shadow-lg border-0 p-4">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-start flex-wrap">
              <div>
                <h5 className="mb-1 fw-bold">Order ID: {order.id}</h5>

                <p className="mb-0">
                  <strong>Customer:</strong> {order.shippingInfo?.fullName}
                </p>

                <p className="mb-0">
                  <strong>Email:</strong>{" "}
                  {order.shippingInfo?.email || "—"}
                </p>

                <p className="mb-0">
                  <strong>Phone:</strong> {order.shippingInfo?.phone}
                </p>

                <p className="mb-0">
                  <strong>Date:</strong>{" "}
                  {order.createdAt?.seconds
                    ? new Date(
                        order.createdAt.seconds * 1000
                      ).toLocaleString()
                    : "—"}
                </p>

                {/* PAYMENT INFO */}
                <p className="mb-0 mt-2">
                  <strong>Payment Status:</strong>{" "}
                  {order.paymentStatus === "paid" ? (
                    <span className="badge bg-success ms-1">Paid</span>
                  ) : (
                    <span className="badge bg-warning text-dark ms-1">
                      Pending
                    </span>
                  )}
                </p>

                <p className="mb-0">
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod || "Razorpay"}
                </p>

                {order.razorpayPaymentId && (
                  <p className="mb-0 small text-muted">
                    <strong>Razorpay Payment ID:</strong>{" "}
                    {order.razorpayPaymentId}
                  </p>
                )}
              </div>

              {/* ORDER STATUS */}
              <div className="mt-2">
                <select
                  className="form-select form-select-sm"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      order.ref,
                      e.target.value
                    )
                  }
                  disabled={order.paymentStatus !== "paid"}
                >
                  <option value="ordered">Ordered</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                {order.paymentStatus !== "paid" && (
                  <small className="text-muted">
                    Payment required before shipping
                  </small>
                )}
              </div>
            </div>

            <hr />

            {/* SHIPPING INFO */}
            <div className="mb-3">
              <h6 className="fw-bold">Shipping Address</h6>
              <p className="mb-1">
                {order.shippingInfo?.address},{" "}
                {order.shippingInfo?.city},{" "}
                {order.shippingInfo?.state} –{" "}
                {order.shippingInfo?.pincode}
              </p>
            </div>

            {/* ITEMS */}
            <div className="mb-3">
              <h6 className="fw-bold">Items Ordered</h6>
              <ul className="list-group">
                {order.items?.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <div>
                      <strong>{item.name}</strong> × {item.quantity}
                      {item.customDetails && (
                        <div className="small text-muted">
                          {item.customDetails}
                        </div>
                      )}
                    </div>
                    <span>₹{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FOOTER */}
            <div className="text-end">
              <p className="fw-bold fs-5 text-success">
                Total Amount: ₹{order.total}
              </p>

              <ReceiptInvoice order={order} />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
