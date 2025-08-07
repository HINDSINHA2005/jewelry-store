import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, "contactMessages"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedMessages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(fetchedMessages);
    };
    fetchMessages();
  }, []);

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-4">Contact Messages</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Message</th>
            <th>Received At</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.mobile}</td>
              <td>{msg.message}</td>
              <td>{msg.createdAt?.toDate().toLocaleString() || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactMessages;
