


// import { useState } from "react";
// import { db } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     id: "", // Keep manual ID like e11, b7
//     name: "",
//     category: "Necklaces",
//     price: "",
//     description: "",
//     imageUrl: "",
//   });
//   const [uploading, setUploading] = useState(false);
//   const [message, setMessage] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  

//   const handleImageUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setUploading(true);

//   const cloudData = new FormData();
//   cloudData.append("file", file);
//   cloudData.append("upload_preset", "jewelora_upload"); 

//   try {
//     const res = await fetch(
//       `https://api.cloudinary.com/v1_1/dvxaztwnz/image/upload`,
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

//   const handleAddProduct = async (e) => {
//     e.preventDefault();

//     if (!formData.id) {
//       setMessage({ type: "warning", text: "Please enter product ID" });
//       return;
//     }
//     if (!formData.imageUrl) {
//       setMessage({ type: "warning", text: "Please upload an image first" });
//       return;
//     }

//     try {
//       await addDoc(collection(db, "dynamic_products"), {
//         id: formData.id,
//         name: formData.name,
//         category: formData.category,
//         price: parseFloat(formData.price),
//         description: formData.description,
//         imageUrl: formData.imageUrl,
//         createdAt: new Date(),
//       });

//       setMessage({ type: "success", text: "✅ Product added successfully!" });
//       setFormData({
//         id: "",
//         name: "",
//         category: "Necklaces",
//         price: "",
//         description: "",
//         imageUrl: "",
//       });
//     } catch (error) {
//       setMessage({ type: "danger", text: "Error: " + error.message });
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-warning fw-bold mb-4">Add New Product</h2>

//       {message && (
//         <div className={`alert alert-${message.type}`} role="alert">
//           {message.text}
//         </div>
//       )}

//       <form onSubmit={handleAddProduct} className="card p-4 shadow-sm">
//         <div className="mb-3">
//           <label className="form-label fw-semibold">Product ID</label>
//           <input
//             name="id"
//             className="form-control"
//             value={formData.id}
//             onChange={handleChange}
//             placeholder="e.g., e11 for Earring, b5 for Bangle"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Product Name</label>
//           <input
//             name="name"
//             className="form-control"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Category</label>
//           <select
//             name="category"
//             className="form-select"
//             value={formData.category}
//             onChange={handleChange}
//           >
//             <option value="Mangalsutra">Mangalsutra</option>
//             <option value="Necklaces">Necklaces</option>
//             <option value="Pendants">Pendants</option>
//             <option value="Bracelets">Bracelets</option>
//             <option value="Earrings">Earrings</option>
//             <option value="Bangles">Bangles</option>
//             <option value="KADA">KADA</option>
//             <option value="Rajvadhi Bracelet">Rajvadhi Bracelet</option>
//             <option value="Oxidised Necklaces">Oxidised Necklaces</option>
//             <option value="Modern Mangalsutra">Modern Mangalsutra</option>
//             <option value="Special Collection">Special Collection</option>
//             <option value="Rakhi">Rakhi</option>
//              <option value="Dhokiya Set">Dhokiya Set</option>
//               <option value="Watch Gift Set">Watch Gift Set</option>
//               <option value="Metal Purse">Metal Purse</option>
//               <option value="Antique Necklaces">Antique Necklaces</option>
//             <option value="Chain Pendant">Chain Pendant</option>
//             <option value="Patala">Patala</option>


//           </select>
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Price (₹)</label>
//           <input
//             type="number"
//             step="0.01"
//             name="price"
//             className="form-control"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label fw-semibold">Description</label>
//           <textarea
//             name="description"
//             className="form-control"
//             rows="3"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Cloudinary Upload */}
//         <div className="mb-3">
//           <label className="form-label fw-semibold">Product Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             className="form-control"
//             onChange={handleImageUpload}
//           />
//           {uploading && <small className="text-muted">Uploading...</small>}
//           {formData.imageUrl && (
//             <div className="mt-2">
//               <img
//                 src={formData.imageUrl}
//                 alt="Preview"
//                 style={{ height: "120px", borderRadius: "6px" }}
//               />
//             </div>
//           )}
//         </div>

//         <button
//           className="btn btn-warning text-white fw-semibold"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Add Product"}
//         </button>
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
    id: "",
    name: "",
    category: "Necklaces",
    price: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Upload multiple images to Cloudinary
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    let uploadedUrls = [];

    for (let file of files) {
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "jewelora_upload");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dvxaztwnz/image/upload`,
          { method: "POST", body: cloudData }
        );
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }

    // ✅ overwrite instead of appending to avoid duplicates
    setImages(uploadedUrls);
    setUploading(false);
  };

  // ✅ Save product(s) to Firestore
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!formData.id) {
      setMessage({ type: "warning", text: "Please enter product ID" });
      return;
    }
    if (images.length === 0) {
      setMessage({ type: "warning", text: "Please upload at least one image" });
      return;
    }

    try {
      for (let i = 0; i < images.length; i++) {
        await addDoc(collection(db, "dynamic_products"), {
          id: `${formData.id}-${i + 1}`, // e.g. e11-1, e11-2
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          description: formData.description,
          imageUrl: images[i],
          createdAt: new Date(),
        });
      }

      setMessage({ type: "success", text: "✅ Products added successfully!" });

      // reset form
      setFormData({
        id: "",
        name: "",
        category: "Necklaces",
        price: "",
        description: "",
      });
      setImages([]);
    } catch (error) {
      setMessage({ type: "danger", text: "Error: " + error.message });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">Add New Products</h2>

      {message && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleAddProduct} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Base Product ID</label>
          <input
            name="id"
            className="form-control"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., e11 (system will make e11-1, e11-2...)"
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
            <option value="KADA">KADA</option>
            <option value="Rajvadhi Bracelet">Rajvadhi Bracelet</option>
            <option value="Oxidised Necklaces">Oxidised Necklaces</option>
            <option value="Modern Mangalsutra">Modern Mangalsutra</option>
            <option value="Special Collection">Special Collection</option>
            <option value="Rakhi">Rakhi</option>
            <option value="Dhokiya Set">Dhokiya Set</option>
            <option value="Watch Gift Set">Watch Gift Set</option>
            <option value="Metal Purse">Metal Purse</option>
            <option value="Antique Necklaces">Antique Necklaces</option>
            <option value="Chain Pendant">Chain Pendant</option>
            <option value="Patala">Patala</option>
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

        {/* Upload Multiple Images */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Product Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            className="form-control"
            onChange={handleImageUpload}
          />
          {uploading && <small className="text-muted">Uploading...</small>}
          {images.length > 0 && (
            <div className="mt-2 d-flex flex-wrap gap-2">
              {images.map((url, i) => (
                <div key={i} className="text-center">
                  <img
                    src={url}
                    alt="Preview"
                    style={{ height: "120px", borderRadius: "6px" }}
                  />
                  <p className="small">ID: {formData.id}-{i + 1}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="btn btn-warning text-white fw-semibold"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Add Products"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
