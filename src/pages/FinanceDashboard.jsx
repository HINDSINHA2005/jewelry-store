// import { useEffect, useState } from "react";
// import { db, auth } from "../firebase"; // make sure auth is exported from firebase.js
// import { collection, getDocs } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// export default function FinanceDashboard() {
//   const [records, setRecords] = useState([]);
//   const [totals, setTotals] = useState({ sales: 0, expenses: 0, profit: 0 });
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     // Check if the logged-in user is the admin
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user && user.email === "info@jewelora.in") {
//         setIsAdmin(true);

//         // Fetch finance records
//         const querySnapshot = await getDocs(collection(db, "financeRecords"));
//         const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setRecords(data);

//         const sales = data.filter(r => r.type === "sale").reduce((acc, cur) => acc + cur.amount, 0);
//         const expenses = data.filter(r => r.type === "expense").reduce((acc, cur) => acc + cur.amount, 0);
//         setTotals({ sales, expenses, profit: sales - expenses });
//       } else {
//         setIsAdmin(false); // Not admin
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <p className="p-4">Loading...</p>;
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-4 text-center text-red-600 font-bold">
//         Access Denied. Only Admin Can View This Page.
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 md:p-6 space-y-6">
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-gray-700 font-semibold">Total Sales</h3>
//           <p className="text-xl font-bold text-green-800">₹{totals.sales}</p>
//         </div>
//         <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-gray-700 font-semibold">Total Expenses</h3>
//           <p className="text-xl font-bold text-red-800">₹{totals.expenses}</p>
//         </div>
//         <div className={`p-4 rounded-lg shadow-md text-center ${totals.profit >= 0 ? "bg-green-200" : "bg-red-200"}`}>
//           <h3 className="text-gray-700 font-semibold">Profit / Loss</h3>
//           <p className="text-xl font-bold">{totals.profit >= 0 ? `₹${totals.profit}` : `-₹${Math.abs(totals.profit)}`}</p>
//         </div>
//       </div>

//       {/* Recent Records Table */}
//       <div className="overflow-x-auto mt-4">
//         <h2 className="text-xl font-bold mb-2">Recent Records</h2>
//         <table className="w-full border-collapse border border-gray-200 min-w-[600px]">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2 text-left">Type</th>
//               <th className="border p-2 text-left">Product/Category</th>
//               <th className="border p-2 text-left">Amount</th>
//               <th className="border p-2 text-left">Description</th>
//               <th className="border p-2 text-left">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {records.map((r) => (
//               <tr key={r.id} className="hover:bg-gray-50">
//                 <td className="border p-2">{r.type}</td>
//                 <td className="border p-2">{r.type === "sale" ? r.product : r.category}</td>
//                 <td className="border p-2">₹{r.amount}</td>
//                 <td className="border p-2">{r.description}</td>
//                 <td className="border p-2">{r.date?.toDate?.()?.toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { db, auth } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";

// export default function FinanceDashboard() {
//   const [records, setRecords] = useState([]);
//   const [totals, setTotals] = useState({ sales: 0, expenses: 0, profit: 0 });
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user && user.email === "info@jewelora.in") {
//         setIsAdmin(true);

//         // Fetch finance records
//         const querySnapshot = await getDocs(collection(db, "financeRecords"));
//         const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setRecords(data);

//         const sales = data
//           .filter((r) => r.type === "sale")
//           .reduce((acc, cur) => acc + (cur.finalAmount || cur.amount), 0);

//         const expenses = data
//           .filter((r) => r.type === "expense")
//           .reduce((acc, cur) => acc + cur.amount, 0);

//         setTotals({ sales, expenses, profit: sales - expenses });
//       } else {
//         setIsAdmin(false);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return <p className="p-3">Loading...</p>;
//   }

//   if (!isAdmin) {
//     return (
//       <div className="p-3 text-center text-danger fw-bold">
//         Access Denied. Only Admin Can View This Page.
//       </div>
//     );
//   }

//   return (
//     <div className="container py-4">
//       {/* Stats Row */}
//       <div className="row mb-4">
//         <div className="col-md-4 mb-3">
//           <div className="card text-center bg-light shadow-sm">
//             <div className="card-body">
//               <h5 className="text-muted">Total Sales</h5>
//               <h3 className="text-success">₹{totals.sales}</h3>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div className="card text-center bg-light shadow-sm">
//             <div className="card-body">
//               <h5 className="text-muted">Total Expenses</h5>
//               <h3 className="text-danger">₹{totals.expenses}</h3>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4 mb-3">
//           <div
//             className={`card text-center shadow-sm ${
//               totals.profit >= 0 ? "bg-success-subtle" : "bg-danger-subtle"
//             }`}
//           >
//             <div className="card-body">
//               <h5 className="text-muted">Profit / Loss</h5>
//               <h3>{totals.profit >= 0 ? `₹${totals.profit}` : `-₹${Math.abs(totals.profit)}`}</h3>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Records */}
//       <div className="card shadow-sm">
//         <div className="card-header">
//           <h5 className="mb-0">Recent Finance Records</h5>
//         </div>
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Type</th>
//                 <th>Party</th>
//                 <th>Product / Category</th>
//                 <th>Amount</th>
//                 <th>Payment Method</th>
//                 <th>Reference ID</th>
//                 <th>Added By</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {records.map((r) => (
//                 <tr key={r.id}>
//                   <td className="text-capitalize">{r.type}</td>
//                   <td>
//                     {r.type === "sale"
//                       ? r.customerName || "—"
//                       : r.type === "expense"
//                       ? r.vendorName || "—"
//                       : "—"}
//                   </td>
//                   <td>{r.type === "sale" ? r.product : r.category}</td>
//                   <td>
//                     ₹{r.finalAmount || r.amount}
//                     {r.discount ? ` (Disc: ${r.discount}%)` : ""}
//                   </td>
//                   <td>{r.paymentMethod || "—"}</td>
//                   <td>{r.referenceId || "—"}</td>
//                   <td>{r.addedBy || "—"}</td>
//                   <td>{r.date?.toDate?.()?.toLocaleDateString() || "—"}</td>
//                 </tr>
//               ))}
//               {records.length === 0 && (
//                 <tr>
//                   <td colSpan="8" className="text-center text-muted">
//                     No records found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { db, auth } from "../firebase"; // make sure auth is exported from firebase.js
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function FinanceDashboard() {
  const [records, setRecords] = useState([]);
  const [totals, setTotals] = useState({
    sales: 0,
    expenses: 0,
    profit: 0,
    investments: 0,
    withdrawals: 0,
    refunds: 0,
    totalFunds: 0,
    availableFunds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.email === "info@jewelora.in") {
        setIsAdmin(true);

        // Fetch finance records
        const querySnapshot = await getDocs(collection(db, "financeRecords"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecords(data);

        // Calculations
        const sales = data
          .filter((r) => r.type === "sale")
          .reduce((acc, cur) => acc + (cur.finalAmount || cur.amount), 0);

        const expenses = data
          .filter((r) => r.type === "expense")
          .reduce((acc, cur) => acc + cur.amount, 0);

        const investments = data
          .filter((r) => r.type === "investment")
          .reduce((acc, cur) => acc + cur.amount, 0);

        const withdrawals = data
          .filter((r) => r.type === "withdrawal")
          .reduce((acc, cur) => acc + cur.amount, 0);

        const refunds = data
          .filter((r) => r.type === "refund")
          .reduce((acc, cur) => acc + cur.amount, 0);

        const totalFunds = investments + sales;
        const availableFunds = totalFunds - (expenses + withdrawals + refunds);

        setTotals({
          sales,
          expenses,
          profit: sales - expenses,
          investments,
          withdrawals,
          refunds,
          totalFunds,
          availableFunds,
        });
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (!isAdmin) {
    return (
      <div className="text-center text-danger fw-bold p-4">
        Access Denied. Only Admin Can View This Page.
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center fw-bold">Finance Dashboard</h2>

      {/* Stats Cards */}
      <div className="row mb-4 g-3">
        <div className="col-md-4">
          <div className="card text-center bg-light shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Total Sales</h5>
              <h3 className="text-success">₹{totals.sales}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center bg-light shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Total Expenses</h5>
              <h3 className="text-danger">₹12740</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className={`card text-center shadow-sm ${
              totals.profit >= 0 ? "bg-success-subtle" : "bg-danger-subtle"
            }`}
          >
            <div className="card-body">
              <h5 className="text-muted">Profit / Loss</h5>
              <h3>
                {totals.profit >= 0
                  ? `₹${totals.profit}`
                  : `-₹${Math.abs(totals.profit)}`}
              </h3>
            </div>
          </div>
        </div>

        {/* New Finance Stats */}
        <div className="col-md-4">
          <div className="card text-center bg-light shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Total Investment</h5>
              <h3 className="text-primary">₹12534</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center bg-light shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Total Funds</h5>
              <h3 className="text-info">₹{totals.totalFunds}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center bg-light shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Available Funds</h5>
              <h3 className="text-dark">₹{totals.availableFunds}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Records Table */}
      <div className="table-responsive">
        <h4 className="mb-3">Recent Records</h4>
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Type</th>
              <th>Product / Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.type}</td>
                <td>{r.type === "sale" ? r.product : r.category}</td>
                <td>₹{r.finalAmount}</td>
                <td>{r.description}</td>
                <td>{r.date?.toDate?.()?.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
