import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";

export default function AddFinanceEntry() {
  const [type, setType] = useState("sale");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount =
      type === "sale" ? Number(price) * Number(quantity) : Number(amount);

    await addDoc(collection(db, "financeRecords"), {
      type,
      product: type === "sale" ? product : null,
      price: type === "sale" ? Number(price) : null,
      quantity: type === "sale" ? Number(quantity) : null,
      amount: totalAmount,
      category: type === "expense" ? category : null,
      description,
      date: Timestamp.now(),
    });

    alert("Entry Added ✅");
    setProduct("");
    setPrice("");
    setQuantity(1);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg space-y-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add Finance Entry
        </h2>

        {/* Type Selector */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Entry Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
          >
            <option value="sale">Sale</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Dynamic Fields */}
        <AnimatePresence mode="wait">
          {type === "sale" ? (
            <motion.div
              key="sale"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <label className="block mb-1 font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Product Name"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="expense"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <label className="block mb-1 font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                >
                  <option value="">Select Category</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Add Entry
        </motion.button>
      </motion.form>
    </div>
  );
}
