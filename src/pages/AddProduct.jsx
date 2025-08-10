// import { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     id:"",
//     name: "",
//     category: "Necklaces",
//     price: "",
//     description: "",
//     imageUrl: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoc(collection(db, "dynamic_products"), formData);
//       alert("Product added successfully");
//       setFormData({id:"", name: "", category: "Necklaces", price: "", description: "", imageUrl: "" });
//     } catch (error) {
//       alert("Error adding product: " + error.message);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-warning fw-bold mb-4">Add New Product</h2>
//       <form onSubmit={handleAddProduct} className="card p-4 shadow-sm">
//         <div className="mb-3">
//           <label className="form-label">Product id</label>
//           <input name="id" className="form-control" value={formData.id} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Product Name</label>
//           <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Category</label>
//           <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
//             <option value="Mangalsutra">Mangalsutra</option>
//             <option value="Necklaces">Necklaces</option>
//             <option value="Pendants">Pendants</option>
//             <option value="Bracelets">Bracelets</option>
//             <option value="Earrings">Earrings</option>
//           </select>
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Price</label>
//           <input name="price" className="form-control" value={formData.price} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Image URL</label>
//           <input name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleChange} required />
//           <small className="text-muted">Use Google Drive direct link (converted)</small>
//         </div>
//         <button className="btn btn-warning text-white fw-semibold">Add Product</button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id: "", // Keep manual ID like e11, b7
    name: "",
    category: "Necklaces",
    price: "",
    description: "",
    imageUrl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Cloudinary upload
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   setUploading(true);
  //   const cloudData = new FormData();
  //   cloudData.append("file", file);
  //   cloudData.append("upload_preset", "your_unsigned_preset"); // Cloudinary preset

  //   try {
  //     const res = await fetch(
  //       `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
  //       {
  //         method: "POST",
  //         body: cloudData,
  //       }
  //     );
  //     const data = await res.json();
  //     setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
  //   } catch (error) {
  //     setMessage({ type: "danger", text: "Image upload failed!" });
  //   } finally {
  //     setUploading(false);
  //   }
  // };

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
    setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
  } catch (error) {
    setMessage({ type: "danger", text: "Image upload failed!" });
  } finally {
    setUploading(false);
  }
};

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      setMessage({ type: "warning", text: "Please enter product ID" });
      return;
    }
    if (!formData.imageUrl) {
      setMessage({ type: "warning", text: "Please upload an image first" });
      return;
    }

    try {
      await addDoc(collection(db, "dynamic_products"), {
        id: formData.id,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        imageUrl: formData.imageUrl,
        createdAt: new Date(),
      });

      setMessage({ type: "success", text: "✅ Product added successfully!" });
      setFormData({
        id: "",
        name: "",
        category: "Necklaces",
        price: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      setMessage({ type: "danger", text: "Error: " + error.message });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">Add New Product</h2>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleAddProduct} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Product ID</label>
          <input
            name="id"
            className="form-control"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., e11 for Earring, b5 for Bangle"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Product Name</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Category</label>
          <select
            name="category"
            className="form-select"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Mangalsutra">Mangalsutra</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Pendants">Pendants</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Earrings">Earrings</option>
            <option value="Bangles">Bangles</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Price (₹)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            className="form-control"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cloudinary Upload */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleImageUpload}
          />
          {uploading && <small className="text-muted">Uploading...</small>}
          {formData.imageUrl && (
            <div className="mt-2">
              <img
                src={formData.imageUrl}
                alt="Preview"
                style={{ height: "120px", borderRadius: "6px" }}
              />
            </div>
          )}
        </div>

        <button
          className="btn btn-warning text-white fw-semibold"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
