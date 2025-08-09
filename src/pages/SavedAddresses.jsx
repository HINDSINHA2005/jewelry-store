import { useState, useEffect } from "react";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const SavedAddresses = () => {
  const { currentUser } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const colRef = collection(db, "users", currentUser.uid, "addresses");
        const snapshot = await getDocs(colRef);
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setAddresses(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [currentUser]);

  const deleteAddress = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;

    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "addresses", id));
      setAddresses(addresses.filter((addr) => addr.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete address.");
    }
  };

  if (!currentUser) return <p>Please log in to view your saved addresses.</p>;
  if (loading) return <p>Loading saved addresses...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Saved Addresses</h2>
      {addresses.length === 0 && <p>You have no saved addresses.</p>}
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="border rounded p-3 mb-3 shadow-sm"
        >
          <p>
            <strong>{addr.fullName}</strong>
          </p>
          <p>
            {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
          </p>
          <p>Phone: {addr.phone}</p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteAddress(addr.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SavedAddresses;
