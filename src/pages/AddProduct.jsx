import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    id:"",
    name: "",
    category: "Necklaces",
    price: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "dynamic_products"), formData);
      alert("Product added successfully");
      setFormData({id:"", name: "", category: "Necklaces", price: "", description: "", imageUrl: "" });
    } catch (error) {
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-warning fw-bold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Product id</label>
          <input name="id" className="form-control" value={formData.id} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input name="name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select name="category" className="form-select" value={formData.category} onChange={handleChange}>
            <option value="Mangalsutra">Mangalsutra</option>
            <option value="Necklaces">Necklaces</option>
            <option value="Pendants">Pendants</option>
            <option value="Bracelets">Bracelets</option>
            <option value="Earrings">Earrings</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleChange} required />
          <small className="text-muted">Use Google Drive direct link (converted)</small>
        </div>
        <button className="btn btn-warning text-white fw-semibold">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
