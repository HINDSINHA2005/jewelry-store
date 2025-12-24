
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

//       const allOrders = snapshot.docs
//         .map((docSnap) => ({
//           id: docSnap.id,
//           ref: docSnap.ref,
//           ...docSnap.data(),
//         }))
//         // ✅ SORT BY DATE (LATEST FIRST)
//         .sort((a, b) => {
//           const timeA = a.createdAt?.seconds || 0;
//           const timeB = b.createdAt?.seconds || 0;
//           return timeB - timeA;
//         });

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
//                   <strong>Customer:</strong> {order.shippingInfo?.fullName}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Email:</strong>{" "}
//                   {order.shippingInfo?.email || "—"}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Phone:</strong> {order.shippingInfo?.phone}
//                 </p>

//                 <p className="mb-0">
//                   <strong>Date:</strong>{" "}
//                   {order.createdAt?.seconds
//                     ? new Date(
//                         order.createdAt.seconds * 1000
//                       ).toLocaleString()
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

// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collectionGroup, getDocs, updateDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import ReceiptInvoice from "../components/ReceiptInvoice";
// import emailjs from "emailjs-com";

// const AdminOrders = () => {
//   const { currentUser } = useAuth();
//   const navigate = useNavigate();

//   // 🔐 ADMIN CHECK
//   const adminEmail = "info@jewelora.in";
//   const isAdmin = currentUser?.email === adminEmail;

//   const [orders, setOrders] = useState([]);

//   // 🚚 Tracking modal states
//   const [showTrackingForm, setShowTrackingForm] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [trackingLink, setTrackingLink] = useState("");
//   const [trackingMessage, setTrackingMessage] = useState("");

//   // 🔄 FETCH ALL ORDERS
//   useEffect(() => {
//     if (!isAdmin) {
//       navigate("/");
//       return;
//     }

//     const fetchAllOrders = async () => {
//       const snapshot = await getDocs(collectionGroup(db, "orders"));

//       const allOrders = snapshot.docs
//         .map((docSnap) => ({
//           id: docSnap.id,
//           ref: docSnap.ref,
//           ...docSnap.data(),
//         }))
//         .sort((a, b) => {
//           const tA = a.createdAt?.seconds || 0;
//           const tB = b.createdAt?.seconds || 0;
//           return tB - tA;
//         });

//       setOrders(allOrders);
//     };

//     fetchAllOrders();
//   }, [currentUser, isAdmin, navigate]);

//   // 🔁 NORMAL STATUS UPDATE (not shipped)
//   const handleStatusChange = async (order, newStatus) => {
//     await updateDoc(order.ref, { status: newStatus });

//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === order.id ? { ...o, status: newStatus } : o
//       )
//     );
//   };

//   // ✅ CONFIRM SHIPMENT (WITH TRACKING)
//   const confirmShipment = async () => {
//     if (!trackingLink || !trackingMessage) {
//       alert("Please enter tracking link and message");
//       return;
//     }

//     await updateDoc(selectedOrder.ref, {
//       status: "shipped",
//       trackingLink,
//       trackingMessage,
//     });

//     setOrders((prev) =>
//       prev.map((o) =>
//         o.id === selectedOrder.id
//           ? {
//               ...o,
//               status: "shipped",
//               trackingLink,
//               trackingMessage,
//             }
//           : o
//       )
//     );

//     // 📧 SEND EMAIL TO CUSTOMER
//     await emailjs.send(
//       "service_pauibc6",
//       "template_gfzrqmg",
//       {
//         to_email: selectedOrder.shippingInfo.email,
//         customer_name: selectedOrder.shippingInfo.fullName,
//         order_id: selectedOrder.id,
//         order_status: "Shipped",
//         tracking_message: trackingMessage,
//         tracking_link: trackingLink,
//       },
//       "AL9Hdy7gl6JXUpK5z"
//     );

//     // RESET MODAL
//     setShowTrackingForm(false);
//     setSelectedOrder(null);
//     setTrackingLink("");
//     setTrackingMessage("");
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold text-warning mb-4 text-center">
//         Admin Panel: All Orders
//       </h2>

//       {orders.map((order) => (
//         <div key={order.id} className="card mb-5 shadow border-0 p-4">
//           {/* HEADER */}
//           <div className="d-flex justify-content-between flex-wrap">
//             <div>
//               <h5 className="fw-bold">Order ID: {order.id}</h5>
//               <p className="mb-0"><strong>Name:</strong> {order.shippingInfo?.fullName}</p>
//               <p className="mb-0"><strong>Email:</strong> {order.shippingInfo?.email}</p>
//               <p className="mb-0"><strong>Phone:</strong> {order.shippingInfo?.phone}</p>

//               <p className="mt-2">
//                 <strong>Payment:</strong>{" "}
//                 {order.paymentStatus === "paid" ? (
//                   <span className="badge bg-success">Paid</span>
//                 ) : (
//                   <span className="badge bg-warning text-dark">Pending</span>
//                 )}
//               </p>
//             </div>

//             {/* STATUS DROPDOWN */}
//             <select
//               className="form-select w-auto"
//               value={order.status}
//               disabled={order.paymentStatus !== "paid"}
//               onChange={(e) => {
//                 const newStatus = e.target.value;

//                 if (order.status === "ordered" && newStatus === "shipped") {
//                   setSelectedOrder(order);
//                   setShowTrackingForm(true);
//                 } else {
//                   handleStatusChange(order, newStatus);
//                 }
//               }}
//             >
//               <option value="ordered">Ordered</option>
//               <option value="shipped">Shipped</option>
//               <option value="delivered">Delivered</option>
//             </select>
//           </div>

//           <hr />

//           {/* ADDRESS */}
//           <p>
//             <strong>Address:</strong>{" "}
//             {order.shippingInfo?.address},{" "}
//             {order.shippingInfo?.city},{" "}
//             {order.shippingInfo?.state} – {order.shippingInfo?.pincode}
//           </p>

//           {/* ITEMS */}
//           <h6 className="fw-bold mt-3">Items</h6>
//           <ul className="list-group">
//             {order.items?.map((item, idx) => (
//               <li
//                 key={idx}
//                 className="list-group-item d-flex align-items-center gap-3"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   style={{
//                     width: 60,
//                     height: 60,
//                     objectFit: "cover",
//                     borderRadius: 8,
//                   }}
//                 />

//                 <div className="flex-grow-1">
//                   <strong>{item.name}</strong>
//                   <div className="text-muted small">
//                     Qty: {item.quantity}
//                   </div>
//                 </div>

//                 <span className="fw-bold">₹{item.price}</span>
//               </li>
//             ))}
//           </ul>

//           {/* FOOTER */}
//           <div className="text-end mt-3">
//             <p className="fw-bold fs-5 text-success">
//               Total: ₹{order.total}
//             </p>
//             <ReceiptInvoice order={order} />
//           </div>
//         </div>
//       ))}

//       {/* 🚚 TRACKING MODAL */}
//       {showTrackingForm && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.5)",
//             zIndex: 9999,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <div className="bg-white p-4 rounded shadow" style={{ width: 420 }}>
//             <h5 className="fw-bold mb-3">Enter Tracking Details</h5>

//             <input
//               type="url"
//               className="form-control mb-3"
//               placeholder="Tracking link (Courier URL)"
//               value={trackingLink}
//               onChange={(e) => setTrackingLink(e.target.value)}
//             />

//             <textarea
//               className="form-control mb-3"
//               rows="3"
//               placeholder="Tracking message for customer"
//               value={trackingMessage}
//               onChange={(e) => setTrackingMessage(e.target.value)}
//             />

//             <div className="d-flex justify-content-end gap-2">
//               <button
//                 className="btn btn-secondary"
//                 onClick={() => setShowTrackingForm(false)}
//               >
//                 Cancel
//               </button>

//               <button
//                 className="btn btn-success"
//                 onClick={confirmShipment}
//               >
//                 Confirm & Ship
//               </button>
//             </div>
//           </div>
//         </div>
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
import emailjs from "emailjs-com";

const AdminOrders = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // 🔐 ADMIN CHECK
  const adminEmail = "info@jewelora.in";
  const isAdmin = currentUser?.email === adminEmail;

  const [orders, setOrders] = useState([]);

  // 🚚 Tracking modal states
  const [showTrackingForm, setShowTrackingForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingLink, setTrackingLink] = useState("");
  const [trackingMessage, setTrackingMessage] = useState("");

  // 🔄 FETCH ALL ORDERS
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
        .sort((a, b) => {
          const tA = a.createdAt?.seconds || 0;
          const tB = b.createdAt?.seconds || 0;
          return tB - tA;
        });

      setOrders(allOrders);
    };

    fetchAllOrders();
  }, [currentUser, isAdmin, navigate]);

  // 🔁 NORMAL STATUS UPDATE
  const handleStatusChange = async (order, newStatus) => {
    await updateDoc(order.ref, { status: newStatus });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === order.id ? { ...o, status: newStatus } : o
      )
    );
  };

  // ✅ CONFIRM SHIPMENT (WITH TRACKING + EMAIL)
  const confirmShipment = async () => {
    if (!trackingLink || !trackingMessage) {
      alert("Please enter tracking link and message");
      return;
    }

    await updateDoc(selectedOrder.ref, {
      status: "shipped",
      trackingLink,
      trackingMessage,
    });

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrder.id
          ? {
              ...o,
              status: "shipped",
              trackingLink,
              trackingMessage,
            }
          : o
      )
    );

    // 📧 EMAIL TO CUSTOMER
    await emailjs.send(
      "service_pauibc6",
      "template_gfzrqmg",
      {
        to_email: selectedOrder.shippingInfo.email,
        customer_name: selectedOrder.shippingInfo.fullName,
        order_id: selectedOrder.id,
        order_status: "Shipped",
        tracking_message: trackingMessage,
        tracking_link: trackingLink,
      },
      "AL9Hdy7gl6JXUpK5z"
    );

    // RESET
    setShowTrackingForm(false);
    setSelectedOrder(null);
    setTrackingLink("");
    setTrackingMessage("");
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-warning mb-4 text-center">
        Admin Panel: All Orders
      </h2>

      {orders.map((order) => (
        <div key={order.id} className="card mb-5 shadow border-0 p-4">
          {/* HEADER */}
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <h5 className="fw-bold">Order ID: {order.id}</h5>

              <p className="mb-0">
                <strong>Name:</strong> {order.shippingInfo?.fullName}
              </p>

              <p className="mb-0">
                <strong>Email:</strong> {order.shippingInfo?.email}
              </p>

              <p className="mb-0">
                <strong>Phone:</strong> {order.shippingInfo?.phone}
              </p>

              {/* 📅 DATE */}
              <p className="mb-0">
                <strong>Date:</strong>{" "}
                {order.createdAt?.seconds
                  ? new Date(
                      order.createdAt.seconds * 1000
                    ).toLocaleString()
                  : "—"}
              </p>

              {/* 💳 PAYMENT STATUS */}
              <p className="mt-2 mb-0">
                <strong>Payment Status:</strong>{" "}
                {order.paymentStatus === "paid" ? (
                  <span className="badge bg-success ms-1">Paid</span>
                ) : (
                  <span className="badge bg-warning text-dark ms-1">
                    Pending
                  </span>
                )}
              </p>

              {/* 💳 PAYMENT METHOD */}
              <p className="mb-0">
                <strong>Payment Method:</strong>{" "}
                {order.paymentMethod || "Razorpay"}
              </p>

              {/* 🧾 RAZORPAY PAYMENT ID */}
              {order.razorpayPaymentId && (
                <p className="mb-0 small text-muted">
                  <strong>Razorpay Payment ID:</strong>{" "}
                  {order.razorpayPaymentId}
                </p>
              )}
            </div>

            {/* STATUS DROPDOWN */}
            <select
              className="form-select w-auto"
              value={order.status}
              disabled={order.paymentStatus !== "paid"}
              onChange={(e) => {
                const newStatus = e.target.value;

                if (
                  order.status === "ordered" &&
                  newStatus === "shipped"
                ) {
                  setSelectedOrder(order);
                  setShowTrackingForm(true);
                } else {
                  handleStatusChange(order, newStatus);
                }
              }}
            >
              <option value="ordered">Ordered</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

          {order.paymentStatus !== "paid" && (
            <small className="text-muted">
              Payment required before shipping
            </small>
          )}

          <hr />

          {/* ADDRESS */}
          <p>
            <strong>Address:</strong>{" "}
            {order.shippingInfo?.address},{" "}
            {order.shippingInfo?.city},{" "}
            {order.shippingInfo?.state} –{" "}
            {order.shippingInfo?.pincode}
          </p>

          {/* ITEMS */}
          <h6 className="fw-bold mt-3">Items</h6>
          <ul className="list-group">
            {order.items?.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex align-items-center gap-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />

                <div className="flex-grow-1">
                  <strong>{item.name}</strong>
                  <div className="text-muted small">
                    Qty: {item.quantity}
                  </div>
                </div>

                <span className="fw-bold">₹{item.price}</span>
              </li>
            ))}
          </ul>

          {/* FOOTER */}
          <div className="text-end mt-3">
            <p className="fw-bold fs-5 text-success">
              Total: ₹{order.total}
            </p>
            <ReceiptInvoice order={order} />
          </div>
        </div>
      ))}

      {/* 🚚 TRACKING MODAL */}
      {showTrackingForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ width: 420 }}>
            <h5 className="fw-bold mb-3">Enter Tracking Details</h5>

            <input
              type="url"
              className="form-control mb-3"
              placeholder="Tracking link (Courier URL)"
              value={trackingLink}
              onChange={(e) => setTrackingLink(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Tracking message for customer"
              value={trackingMessage}
              onChange={(e) => setTrackingMessage(e.target.value)}
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowTrackingForm(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={confirmShipment}
              >
                Confirm & Ship
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;

