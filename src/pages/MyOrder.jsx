




import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ReceiptInvoice from "../components/ReceiptInvoice";

// ⭐ Review Form (with Cloudinary upload)
const ReviewForm = ({ orderId, productId, customerName, customerCity, onReviewSubmit }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Upload image to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const cloudData = new FormData();
    cloudData.append("file", file);
    cloudData.append("upload_preset", "jewelora_upload"); // your unsigned preset

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dvxaztwnz/image/upload`,
        {
          method: "POST",
          body: cloudData,
        }
      );

      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);

    const reviewRef = collection(db, "reviews");
    await addDoc(reviewRef, {
      userId: currentUser.uid,
      orderId,
      productId,
      rating,
      description: desc,
      photoUrl: imageUrl || "",
      createdAt: serverTimestamp(),
      userName: currentUser.displayName || "Anonymous",
      customerName,
      customerCity,
    });

    setRating(0);
    setDesc("");
    setImageUrl("");
    setLoading(false);
    onReviewSubmit && onReviewSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 rounded bg-light mt-3">
      <h6 className="fw-semibold">Write a Review</h6>

      {/* Customer Name & City (Readonly) */}
      <div className="mb-2">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" value={customerName} disabled />
      </div>
      <div className="mb-2">
        <label className="form-label">City</label>
        <input type="text" className="form-control" value={customerCity} disabled />
      </div>

      {/* Rating */}
      <div className="mb-2">
        <label className="form-label">Rating</label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                cursor: "pointer",
                color: star <= rating ? "#FFD700" : "#ccc",
                fontSize: "1.5rem",
                marginRight: "5px",
              }}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mb-2">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>

      {/* Image Upload */}
      <div className="mb-2">
        <label className="form-label">Upload Photo</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {uploading && <small className="text-muted">Uploading...</small>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="img-fluid mt-2 rounded"
            style={{ maxHeight: "200px" }}
          />
        )}
      </div>

      <button className="btn btn-primary" type="submit" disabled={loading || uploading}>
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

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
    doc.text(
      `Date: ${new Date(order.createdAt?.seconds * 1000).toLocaleString()}`,
      14,
      37
    );
    doc.text(`Customer: ${order.shippingInfo?.fullName}`, 14, 44);
    doc.text(`Email: ${order.shippingInfo?.email}`, 14, 51);
    doc.text(`Phone: ${order.shippingInfo?.phone}`, 14, 58);
    doc.text(
      `Address: ${order.shippingInfo?.address}, ${order.shippingInfo?.city}, ${order.shippingInfo?.state}, ${order.shippingInfo?.pincode}`,
      14,
      65
    );

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
              <span className="badge bg-success">
                {order.status || "Ordered"}
              </span>
            </div>

            <div className="card-body">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt?.seconds * 1000).toLocaleString()}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {order.shippingInfo?.paymentMethod}
              </p>

              {order.items?.map((item, index) => (
                <p key={index}>
                  <strong>Additional Detail:</strong>{" "}
                  {item.customDetails || "—"}
                </p>
              ))}

              {/* Shipping */}
              <div className="mt-3">
                <h6 className="fw-semibold">Shipping Address</h6>
                <p className="mb-1">
                  <strong>Name:</strong> {order.shippingInfo?.fullName}
                </p>
                <p className="mb-1">
                  <strong>Email:</strong> {order.shippingInfo?.email}
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong> {order.shippingInfo?.phone}
                </p>
                <p className="mb-1">
                  <strong>State:</strong> {order.shippingInfo?.state}
                </p>
                <p className="mb-1">
                  <strong>Address:</strong> {order.shippingInfo?.address},{" "}
                  {order.shippingInfo?.city} - {order.shippingInfo?.pincode}
                </p>
              </div>

              {/* Items */}
              <div className="mt-3">
                <h6 className="fw-semibold">Items</h6>
                <ul className="list-group">
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <span className="fw-medium">{item.name}</span>
                        <br />
                        <small className="text-muted">Qty: {item.quantity}</small>
                      </div>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ⭐ Review Section (only after delivery) */}
              {order.status === "delivered" && (
                <ReviewForm
                  orderId={order.id}
                  productId={order.items[0]?.id}
                  customerName={order.shippingInfo?.fullName}
                  customerCity={order.shippingInfo?.city}
                  onReviewSubmit={() => console.log("Review submitted")}
                />
              )}

              <div className="text-end mt-3">
                <ReceiptInvoice order={order} />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
