import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function FinanceDashboard() {
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({ sales: 0, expenses: 0, profit: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "financeRecords"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRecords(data);

      const sales = data.filter(r => r.type === "sale").reduce((acc, cur) => acc + cur.amount, 0);
      const expenses = data.filter(r => r.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
      setTotals({ sales, expenses, profit: sales - expenses });
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-gray-700 font-semibold">Total Sales</h3>
          <p className="text-xl font-bold text-green-800">₹{totals.sales}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
          <h3 className="text-gray-700 font-semibold">Total Expenses</h3>
          <p className="text-xl font-bold text-red-800">₹{totals.expenses}</p>
        </div>
        <div className={`p-4 rounded-lg shadow-md text-center ${totals.profit >= 0 ? "bg-green-200" : "bg-red-200"}`}>
          <h3 className="text-gray-700 font-semibold">Profit / Loss</h3>
          <p className="text-xl font-bold">{totals.profit >= 0 ? `₹${totals.profit}` : `-₹${Math.abs(totals.profit)}`}</p>
        </div>
      </div>

      {/* Recent Records Table */}
      <div className="overflow-x-auto mt-4">
        <h2 className="text-xl font-bold mb-2">Recent Records</h2>
        <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Type</th>
              <th className="border p-2 text-left">Product/Category</th>
              <th className="border p-2 text-left">Amount</th>
              <th className="border p-2 text-left">Description</th>
              <th className="border p-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="border p-2">{r.type}</td>
                <td className="border p-2">{r.type === "sale" ? r.product : r.category}</td>
                <td className="border p-2">₹{r.amount}</td>
                <td className="border p-2">{r.description}</td>
                <td className="border p-2">{r.date?.toDate?.()?.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
