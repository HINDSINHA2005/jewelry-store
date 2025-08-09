import React, { useState } from "react";
import { db } from "../firebase"; // make sure you have firebase config & Firestore initialized
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contactMessages"), {
        name,
        email,
        mobile,
        message,
        createdAt: serverTimestamp(),
      });
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <h2 className="text-center text-warning fw-bold mb-4">Contact Us</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <form className="p-4 border rounded shadow-sm bg-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Enter your mobile number"
                required
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Your message..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-warning fw-semibold">Send Message</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="p-4 bg-light border rounded shadow-sm">
            <h5 className="fw-bold mb-3">Get in Touch</h5>
            <p><strong>Email:</strong> info@jewelora.in</p>
            <p><strong>Address:</strong> Jewelora Store, Delhi - 110001, India</p>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83797095512!2d77.06889944999999!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3652e091203%3A0xf4f37a2413a9f733!2sDelhi%2C%20India!5e0!3m2!1sen!2sin!4v1718373642793"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
