// import { useState } from "react";
// import { db } from "../firebase"; // adjust path if needed
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// const AddReview = () => {
//   const [formData, setFormData] = useState({
//     userName: "",
//     description: "",
//     rating: 5,
//     photoUrl: "",
//   });
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState(null);

//   // ✅ Cloudinary Upload
//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);

//     const cloudData = new FormData();
//     cloudData.append("file", file);
//     cloudData.append("upload_preset", "jewelora_upload"); // your unsigned preset

//     try {
//       const res = await fetch(
//         `https://api.cloudinary.com/v1_1/dvxaztwnz/image/upload`,
//         {
//           method: "POST",
//           body: cloudData,
//         }
//       );

//       const data = await res.json();
//       setFormData((prev) => ({ ...prev, photoUrl: data.secure_url }));
//     } catch (error) {
//       setMessage({ type: "danger", text: "Image upload failed!" });
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ✅ Submit Review
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.userName || !formData.description) {
//       setMessage({ type: "danger", text: "Please fill all required fields" });
//       return;
//     }

//     try {
//       await addDoc(collection(db, "reviews"), {
//         ...formData,
//         createdAt: serverTimestamp(),
//       });

//       setMessage({ type: "success", text: "Thank you! Your review is submitted." });
//       setFormData({ userName: "", description: "", rating: 5, photoUrl: "" });
//     } catch (error) {
//       setMessage({ type: "danger", text: "Error submitting review!" });
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4 text-warning fw-bold">
//         ✍️ Share Your Experience
//       </h2>

//       {message && (
//         <div
//           className={`alert alert-${message.type} text-center`}
//           role="alert"
//         >
//           {message.text}
//         </div>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         className="mx-auto p-4 shadow-lg rounded bg-white"
//         style={{ maxWidth: "600px" }}
//       >
//         {/* Name */}
//         <div className="mb-3">
//           <label className="form-label">Your Name *</label>
//           <input
//             type="text"
//             className="form-control"
//             value={formData.userName}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, userName: e.target.value }))
//             }
//             required
//           />
//         </div>

//         {/* Review */}
//         <div className="mb-3">
//           <label className="form-label">Your Review *</label>
//           <textarea
//             className="form-control"
//             rows="4"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, description: e.target.value }))
//             }
//             required
//           ></textarea>
//         </div>

//         {/* Rating */}
//         <div className="mb-3">
//           <label className="form-label">Rating *</label>
//           <select
//             className="form-select"
//             value={formData.rating}
//             onChange={(e) =>
//               setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))
//             }
//           >
//             <option value={5}>⭐⭐⭐⭐⭐</option>
//             <option value={4}>⭐⭐⭐⭐</option>
//             <option value={3}>⭐⭐⭐</option>
//             <option value={2}>⭐⭐</option>
//             <option value={1}>⭐</option>
//           </select>
//         </div>

//         {/* Photo Upload */}
//         <div className="mb-3">
//           <label className="form-label">Upload Photo (Optional)</label>
//           <input
//             type="file"
//             className="form-control"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//           {uploading && <small className="text-info">Uploading...</small>}
//           {formData.photoUrl && (
//             <img
//               src={formData.photoUrl}
//               alt="Preview"
//               className="img-fluid rounded mt-2"
//               style={{ maxHeight: "200px" }}
//             />
//           )}
//         </div>

//         <button
//           type="submit"
//           className="btn btn-warning w-100 fw-bold"
//           disabled={uploading}
//         >
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddReview;



import { useState } from "react";
import { db } from "../firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import FeaturedProducts from "../components/home/FeatureProducts";

const AddReview = () => {
  const [formData, setFormData] = useState({
    userName: "Anonymous",
    customerName: "",
    customerCity: "",
    description: "",
    rating: 5,
    photoUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  // ✅ Cloudinary Upload
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
      setFormData((prev) => ({ ...prev, photoUrl: data.secure_url }));
    } catch (error) {
      setMessage({ type: "danger", text: "Image upload failed!" });
    } finally {
      setUploading(false);
    }
  };

  // ✅ Submit Review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.description) {
      setMessage({ type: "danger", text: "Please fill all required fields" });
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        createdAt: serverTimestamp(),
        customerCity: formData.customerCity || "Unknown",
        customerName: formData.customerName,
        description: formData.description,
        photoUrl: formData.photoUrl,
        rating: formData.rating,
        userName: formData.userName || "Anonymous",
      });

      setMessage({
        type: "success",
        text: "Thank you! Your review is submitted.",
      });
      setFormData({
        userName: "Anonymous",
        customerName: "",
        customerCity: "",
        description: "",
        rating: 5,
        photoUrl: "",
      });
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Error submitting review!" });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-warning fw-bold">
        ✍️ Share Your Experience
      </h2>

      {message && (
        <div
          className={`alert alert-${message.type} text-center`}
          role="alert"
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto p-4 shadow-lg rounded bg-white"
        style={{ maxWidth: "600px" }}
      >
        {/* Customer Name */}
        <div className="mb-3">
          <label className="form-label">Your Name *</label>
          <input
            type="text"
            className="form-control"
            value={formData.customerName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, customerName: e.target.value }))
            }
            required
          />
        </div>

        {/* Customer City */}
        <div className="mb-3">
          <label className="form-label">Your City *</label>
          <input
            type="text"
            className="form-control"
            value={formData.customerCity}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, customerCity: e.target.value }))
            }
            required
          />
        </div>

        {/* Review */}
        <div className="mb-3">
          <label className="form-label">Your Review *</label>
          <textarea
            className="form-control"
            rows="4"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <label className="form-label">Rating *</label>
          <select
            className="form-select"
            value={formData.rating}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rating: Number(e.target.value) }))
            }
          >
            <option value={5}>⭐⭐⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={1}>⭐</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Photo (Optional)</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {uploading && <small className="text-info">Uploading...</small>}
          {formData.photoUrl && (
            <img
              src={formData.photoUrl}
              alt="Preview"
              className="img-fluid rounded mt-2"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>

        <button
          type="submit"
          className="btn btn-warning w-100 fw-bold"
          disabled={uploading}
        >
          Submit Review
        </button>
      </form>
      <FeaturedProducts/>
    </div>
    
  );
};

export default AddReview;
