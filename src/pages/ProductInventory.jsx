import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminProductInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "dynamic_products"));
        const list = snap.docs.map((d) => ({
          firestoreId: d.id,
          ...d.data(),
        }));
        setProducts(list);
      } catch (err) {
        console.error("Inventory fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.firestoreId === id ? { ...p, [field]: value } : p
      )
    );
  };

  const handleSave = async (product) => {
    try {
      setSavingId(product.firestoreId);

      await updateDoc(
        doc(db, "dynamic_products", product.firestoreId),
        {
          price: Number(product.price),
          stock: Number(product.stock),
          trending: !!product.trending,
          visible: !!product.visible,
          category: product.category,
          inStock: Number(product.stock) > 0,
        }
      );

      alert("Product updated successfully");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update product");
    } finally {
      setSavingId(null);
    }
  };

  if (loading) return <p className="p-4">Loading inventory...</p>;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4 text-warning">
        📦 Product Inventory
      </h2>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name / ID</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Stock</th>
              <th>Trending</th>
              <th>Visible</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.firestoreId}>
                <td>
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </td>

                <td>
                  <strong>{p.name}</strong>
                  <br />
                  <small className="text-muted">{p.id}</small>
                </td>

                <td>
                  <input
                    className="form-control form-control-sm"
                    value={p.category}
                    onChange={(e) =>
                      handleChange(p.firestoreId, "category", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={p.price}
                    onChange={(e) =>
                      handleChange(p.firestoreId, "price", e.target.value)
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    value={p.stock}
                    onChange={(e) =>
                      handleChange(p.firestoreId, "stock", e.target.value)
                    }
                  />
                </td>

                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={p.trending || false}
                    onChange={(e) =>
                      handleChange(
                        p.firestoreId,
                        "trending",
                        e.target.checked
                      )
                    }
                  />
                </td>

                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={p.visible || false}
                    onChange={(e) =>
                      handleChange(
                        p.firestoreId,
                        "visible",
                        e.target.checked
                      )
                    }
                  />
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-warning"
                    disabled={savingId === p.firestoreId}
                    onClick={() => handleSave(p)}
                  >
                    {savingId === p.firestoreId
                      ? "Saving..."
                      : "Save"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-muted text-center">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminProductInventory;
