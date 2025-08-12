// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/logo1.png";
// import {
//   ShoppingCart,
//   ShoppingBag,
//   User,
//   Home,
//   Grid,
//   Layers,
//   Info,
//   Phone,
// } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();

//   const isAdmin = currentUser?.email === "info@jewelora.in";

//   useEffect(() => {
//     if (!currentUser || isAdmin) return;
//     const unsub = onSnapshot(
//       collection(db, "carts", currentUser.uid, "items"),
//       (snap) => setCartCount(snap.size)
//     );
//     return () => unsub();
//   }, [currentUser, isAdmin]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/signin");
//   };

//   return (
//     <>
//       {/* ───── Top Navbar ───── */}
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//         <div className="container d-flex justify-content-between align-items-center">
//           <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
//             <img
//               src={logo}
//               alt="Logo"
//               className="rounded-circle border border-2 border-warning"
//               style={{ width: "90px", height: "60px" }}
//             />
//             <span className="fw-bold fs-4 text-warning">Jewelora</span>
//           </NavLink>

//           {/* Desktop Nav Links */}
//           <div className="d-none d-lg-flex gap-4 ms-auto me-4">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/shop"
//               className={({ isActive }) =>
//                 `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
//               }
//             >
//               Shop
//             </NavLink>
//             <NavLink
//               to="/category"
//               className={({ isActive }) =>
//                 `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
//               }
//             >
//               Category
//             </NavLink>
//             <NavLink
//               to="/about"
//               className={({ isActive }) =>
//                 `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
//               }
//             >
//               About
//             </NavLink>
//             <NavLink
//               to="/contact"
//               className={({ isActive }) =>
//                 `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
//               }
//             >
//               Contact
//             </NavLink>
//           </div>

//           {/* Right buttons */}
//           <div className="d-flex gap-2 align-items-center">
//             {!currentUser ? (
//               <>
//                 <NavLink
//                   to="/signin"
//                   className="btn btn-outline-warning btn-sm fw-semibold"
//                 >
//                   Sign In
//                 </NavLink>
//                 <NavLink
//                   to="/signup"
//                   className="btn btn-warning btn-sm fw-semibold text-white"
//                 >
//                   Sign Up
//                 </NavLink>
//               </>
//             ) : isAdmin ? (
//               <>
//                 <NavLink
//                   to="/admin/orders"
//                   className={({ isActive }) =>
//                     `btn btn-outline-dark btn-sm fw-semibold ${
//                       isActive ? "text-warning" : ""
//                     }`
//                   }
//                 >
//                   Orders
//                 </NavLink>
//                 <NavLink
//                   to="/admin/message"
//                   className={({ isActive }) =>
//                     `btn btn-outline-dark btn-sm fw-semibold ${
//                       isActive ? "text-warning" : ""
//                     }`
//                   }
//                 >
//                   Messages
//                 </NavLink>
//                 <NavLink
//                   to="/addproduct"
//                   className={({ isActive }) =>
//                     `btn btn-outline-dark btn-sm fw-semibold ${
//                       isActive ? "text-warning" : ""
//                     }`
//                   }
//                 >
//                   Add Product
//                 </NavLink>
//                 <button className="btn btn-outline-warning btn-sm" disabled>
//                   <User size={18} />
//                 </button>
//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-danger btn-sm fw-semibold"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <NavLink
//                   to="/cart"
//                   className="btn btn-outline-secondary position-relative btn-sm"
//                 >
//                   <ShoppingCart size={18} />
//                   {cartCount > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {cartCount}
//                     </span>
//                   )}
//                 </NavLink>
//                 <NavLink
//                   to="/orders"
//                   className={({ isActive }) =>
//                     `btn btn-outline-primary btn-sm fw-semibold d-none d-lg-inline ${
//                       isActive ? "text-warning" : ""
//                     }`
//                   }
//                 >
//                   Orders
//                 </NavLink>
//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-danger btn-sm fw-semibold"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>

//       {/* ───── Bottom Nav (Mobile Only) ───── */}
//       <div className="d-lg-none d-flex justify-content-around align-items-center bg-white border-top shadow-sm fixed-bottom py-2">
//         <NavLink
//           to="/"
//           className={({ isActive }) =>
//             `d-flex flex-column align-items-center text-decoration-none ${
//               isActive ? "text-warning" : "text-dark"
//             }`
//           }
//         >
//           <Home size={20} />
//           <small>Home</small>
//         </NavLink>
//         <NavLink
//           to="/shop"
//           className={({ isActive }) =>
//             `d-flex flex-column align-items-center text-decoration-none ${
//               isActive ? "text-warning" : "text-dark"
//             }`
//           }
//         >
//           <Grid size={20} />
//           <small>Shop</small>
//         </NavLink>
//         <NavLink
//           to="/category"
//           className={({ isActive }) =>
//             `d-flex flex-column align-items-center text-decoration-none ${
//               isActive ? "text-warning" : "text-dark"
//             }`
//           }
//         >
//           <Layers size={20} />
//           <small>Category</small>
//         </NavLink>
        
//         <NavLink
//           to="/contact"
//           className={({ isActive }) =>
//             `d-flex flex-column align-items-center text-decoration-none ${
//               isActive ? "text-warning" : "text-dark"
//             }`
//           }
//         >
//           <Phone size={20} />
//           <small>Contact</small>
//         </NavLink>
//         <NavLink
//           to="/orders"
//           className={({ isActive }) =>
//             `d-flex flex-column align-items-center text-decoration-none ${
//               isActive ? "text-warning" : "text-dark"
//             }`
//           }
//         >
//           <ShoppingBag size={20} />
//           <small>Orders</small>
//         </NavLink>
//       </div>
//     </>
//   );
// };

// export default Navbar;



// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/logo1.png";
// import { ShoppingCart, User } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const isAdmin = currentUser?.email === "info@jewelora.in";

//   useEffect(() => {
//     if (!currentUser || isAdmin) return;
//     const unsub = onSnapshot(
//       collection(db, "carts", currentUser.uid, "items"),
//       (snap) => setCartCount(snap.size)
//     );
//     return () => unsub();
//   }, [currentUser, isAdmin]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/signin");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//         <div className="container d-flex justify-content-between align-items-center">
//           {/* Brand */}
//           <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
//             <img
//               src={logo}
//               alt="Logo"
//               className="rounded-circle border border-2 border-warning"
//               style={{ width: "90px", height: "60px" }}
//             />
//             <span className="fw-bold fs-4 text-warning">Jewelora</span>
//           </NavLink>

//           {/* Menu Links */}
//           <div className="d-none d-lg-flex gap-4 ms-auto me-4">
//             <NavLink to="/" className="nav-link fw-semibold">Home</NavLink>
//             <NavLink to="/shop" className="nav-link fw-semibold">Shop</NavLink>
//             <NavLink to="/category" className="nav-link fw-semibold">Category</NavLink>
//             <NavLink to="/about" className="nav-link fw-semibold">About</NavLink>
//             <NavLink to="/contact" className="nav-link fw-semibold">Contact</NavLink>
//           </div>

//           {/* Right Side */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Cart */}
//             {!isAdmin && currentUser && (
//               <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
//                 <ShoppingCart size={18} />
//                 {cartCount > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartCount}
//                   </span>
//                 )}
//               </NavLink>
//             )}

//             {/* Profile Dropdown */}
//             {currentUser ? (
//               <div className="dropdown">
//                 <button
//                   className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center profile-btn"
//                   id="profileDropdown"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{ width: "38px", height: "38px" }}
//                 >
//                   <User size={18} />
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2 animate-dropdown" aria-labelledby="profileDropdown">
//                   <li className="px-3 py-2 text-center">
//                     <strong>{currentUser.displayName || "User"}</strong>
//                     <div className="small text-muted">{currentUser.email}</div>
//                   </li>
//                   <li><hr className="dropdown-divider" /></li>
//                   {!isAdmin && (
//                     <li>
//                       <NavLink to="/orders" className="dropdown-item">My Orders</NavLink>
//                     </li>
//                   )}
//                   {isAdmin && (
//                     <>
//                       <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
//                       <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
//                       <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
//                     </>
//                   )}
//                   <li>
//                     <button onClick={handleLogout} className="dropdown-item text-danger">
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <>
//                 <NavLink to="/signin" className="btn btn-outline-warning btn-sm fw-semibold">Sign In</NavLink>
//                 <NavLink to="/signup" className="btn btn-warning btn-sm fw-semibold text-white">Sign Up</NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/jewelora.jpg";
// import { ShoppingCart, User } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const isAdmin = currentUser?.email === "info@jewelora.in";

//   useEffect(() => {
//     if (!currentUser || isAdmin) return;
//     const unsub = onSnapshot(
//       collection(db, "carts", currentUser.uid, "items"),
//       (snap) => setCartCount(snap.size)
//     );
//     return () => unsub();
//   }, [currentUser, isAdmin]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/signin");
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//         <div className="container d-flex justify-content-between align-items-center">

//           {/* Hamburger (left side) */}
//           <button
//             className="navbar-toggler me-2"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarMenu"
//             aria-controls="navbarMenu"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Brand */}
//           <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
//             <img
//               src={logo}
//               alt="Logo"
//               className="rounded-circle"
//               style={{ width: "90px", height: "60px" }}
//             />
//             <span className="fw-bold fs-6 text-warning">Jewelora.in</span>
//           </NavLink>

//           {/* Menu Links (collapsible for mobile) */}
//           <div className="collapse navbar-collapse" id="navbarMenu">
//             <ul className="navbar-nav ms-auto me-4">
//               <li className="nav-item">
//                 <NavLink to="/" className="nav-link fw-semibold">Home</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/shop" className="nav-link fw-semibold">Shop</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/category" className="nav-link fw-semibold">Category</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/about" className="nav-link fw-semibold">About</NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink to="/contact" className="nav-link fw-semibold">Contact</NavLink>
//               </li>
//             </ul>
//           </div>

//           {/* Right Side */}
//           <div className="d-flex align-items-center gap-3">
//             {/* Cart */}
//             {!isAdmin && currentUser && (
//               <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
//                 <ShoppingCart size={18} />
//                 {cartCount > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                     {cartCount}
//                   </span>
//                 )}
//               </NavLink>
//             )}

//             {/* Profile Dropdown */}
//             {currentUser ? (
//               <div className="dropdown">
//                 <button
//                   className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center profile-btn"
//                   id="profileDropdown"
//                   data-bs-toggle="dropdown"
//                   aria-expanded="false"
//                   style={{ width: "38px", height: "38px" }}
//                 >
//                   <User size={18} />
//                 </button>
//                 <ul
//                   className="dropdown-menu dropdown-menu-end shadow border-0 p-2 animate-dropdown"
//                   aria-labelledby="profileDropdown"
//                 >
//                   <li className="px-3 py-2 text-center">
//                     <strong>{currentUser.displayName || "User"}</strong>
//                     <div className="small text-muted">{currentUser.email}</div>
//                   </li>
//                   <li><hr className="dropdown-divider" /></li>
//                   {!isAdmin && (
//                     <li>
//                       <NavLink to="/orders" className="dropdown-item">My Orders</NavLink>
//                     </li>
//                   )}
//                   {isAdmin && (
//                     <>
//                       <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
//                       <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
//                       <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
//                     </>
//                   )}
//                   <li>
//                     <button onClick={handleLogout} className="dropdown-item text-danger">
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <>
//                 <NavLink to="/signin" className="btn btn-outline-warning btn-sm fw-semibold">Sign In</NavLink>
//                 <NavLink to="/signup" className="btn btn-warning btn-sm fw-semibold text-white">Sign Up</NavLink>
//               </>
//             )}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;



// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/jewelora.jpg";
// import { ShoppingCart, User } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const isAdmin = currentUser?.email === "info@jewelora.in";

//   useEffect(() => {
//     if (!currentUser || isAdmin) return;
//     const unsub = onSnapshot(
//       collection(db, "carts", currentUser.uid, "items"),
//       (snap) => setCartCount(snap.size)
//     );
//     return () => unsub();
//   }, [currentUser, isAdmin]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/signin");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//       <div className="container">

//         {/* Hamburger (works if Bootstrap JS loaded) */}
//         <button
//           className="navbar-toggler me-2"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarMenu"
//           aria-controls="navbarMenu"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Logo + Brand */}
//         <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
//           <img
//             src={logo}
//             alt="Logo"
//             className="rounded-circle"
//             style={{
//               width: "70px",
//               height: "50px",
//               objectFit: "cover"
//             }}
//           />
//           <span className="fw-bold fs-5 text-warning d-none d-sm-inline">
//             Jewelora.in
//           </span>
//         </NavLink>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarMenu">
//           <ul className="navbar-nav ms-auto me-4 text-center">
//             <li className="nav-item">
//               <NavLink to="/" className="nav-link fw-semibold">Home</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/shop" className="nav-link fw-semibold">Shop</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/category" className="nav-link fw-semibold">Category</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/about" className="nav-link fw-semibold">About</NavLink>
//             </li>
//             <li className="nav-item">
//               <NavLink to="/contact" className="nav-link fw-semibold">Contact</NavLink>
//             </li>
//           </ul>
//         </div>

//         {/* Right Side */}
//         <div className="d-flex align-items-center gap-3">
//           {!isAdmin && currentUser && (
//             <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
//               <ShoppingCart size={18} />
//               {cartCount > 0 && (
//                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cartCount}
//                 </span>
//               )}
//             </NavLink>
//           )}

//           {currentUser ? (
//             <div className="dropdown">
//               <button
//                 className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center"
//                 id="profileDropdown"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//                 style={{ width: "38px", height: "38px" }}
//               >
//                 <User size={18} />
//               </button>
//               <ul
//                 className="dropdown-menu dropdown-menu-end shadow border-0 p-2"
//                 aria-labelledby="profileDropdown"
//               >
//                 <li className="px-3 py-2 text-center">
//                   <strong>{currentUser.displayName || "User"}</strong>
//                   <div className="small text-muted">{currentUser.email}</div>
//                 </li>
//                 <li><hr className="dropdown-divider" /></li>

//                 {!isAdmin && (
//                   <>
//                     <li><NavLink to="/orders" className="dropdown-item">My Orders</NavLink></li>
//                     <li><NavLink to="/saved-address" className="dropdown-item">Saved Addresses</NavLink></li>
//                   </>
//                 )}

//                 {isAdmin && (
//                   <>
//                     <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
//                     <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
//                     <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
//                   </>
//                 )}

//                 <li>
//                   <button onClick={handleLogout} className="dropdown-item text-danger">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <>
//               <NavLink to="/signin" className="btn btn-outline-warning btn-sm fw-semibold">Sign In</NavLink>
              
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import logo from "../../assets/jewelora.jpg";
// import { ShoppingCart, User } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const [cartCount, setCartCount] = useState(0);
//   const navigate = useNavigate();
//   const isAdmin = currentUser?.email === "info@jewelora.in";

//   useEffect(() => {
//     if (!currentUser || isAdmin) return;
//     const unsub = onSnapshot(
//       collection(db, "carts", currentUser.uid, "items"),
//       (snap) => setCartCount(snap.size)
//     );
//     return () => unsub();
//   }, [currentUser, isAdmin]);

//   const handleLogout = async () => {
//     await logout();
//     navigate("/signin");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//       <div className="container">

//         {/* Hamburger Button */}
//         <button
//           className="navbar-toggler me-2"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarMenu"
//           aria-controls="navbarMenu"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Logo + Brand */}
//         <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
//           <img
//             src={logo}
//             alt="Logo"
//             className="border border-warning rounded-circle"
//             style={{
//               width: "70px",
//               height: "70px",
//               objectFit: "contain",
//               backgroundColor: "white"
//             }}
//           />
//           <span className="fw-bold fs-5 text-warning d-none d-sm-inline">
//             Jewelora.in
//           </span>
//         </NavLink>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarMenu">
//           <ul className="navbar-nav ms-auto me-4 text-center">
//             {["/", "/shop", "/category", "/about", "/contact"].map((path, idx) => {
//               const labels = ["Home", "Shop", "Category", "About", "Contact"];
//               return (
//                 <li className="nav-item" key={path}>
//                   <NavLink
//                     to={path}
//                     className={({ isActive }) =>
//                       `nav-link fw-semibold ${isActive ? "text-warning" : ""}`
//                     }
//                   >
//                     {labels[idx]}
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>

//         {/* Right Side */}
//         <div className="d-flex align-items-center gap-3">
//           {!isAdmin && currentUser && (
//             <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
//               <ShoppingCart size={18} />
//               {cartCount > 0 && (
//                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cartCount}
//                 </span>
//               )}
//             </NavLink>
//           )}

//           {currentUser ? (
//             <div className="dropdown">
//               <button
//                 className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center"
//                 id="profileDropdown"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//                 style={{ width: "38px", height: "38px" }}
//               >
//                 <User size={18} />
//               </button>
//               <ul
//                 className="dropdown-menu dropdown-menu-end shadow border-0 p-2"
//                 aria-labelledby="profileDropdown"
//               >
//                 <li className="px-3 py-2 text-center">
//                   <strong>{currentUser.displayName || "User"}</strong>
//                   <div className="small text-muted">{currentUser.email}</div>
//                 </li>
//                 <li><hr className="dropdown-divider" /></li>

//                 {!isAdmin && (
//                   <>
//                     <li><NavLink to="/orders" className="dropdown-item">My Orders</NavLink></li>
//                     <li><NavLink to="/saved-address" className="dropdown-item">Saved Addresses</NavLink></li>
//                   </>
//                 )}

//                 {isAdmin && (
//                   <>
//                     <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
//                     <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
//                     <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
//                   </>
//                 )}

//                 <li>
//                   <button onClick={handleLogout} className="dropdown-item text-danger">
//                     Logout
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <>
//               <NavLink to="/signin" className="btn btn-outline-warning btn-sm fw-semibold">Sign In</NavLink>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ShoppingCart, User } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Collapse from "bootstrap/js/dist/collapse";
import AnnouncementBar from "../AnnouncementBar";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const isAdmin = currentUser?.email === "info@jewelora.in";

  useEffect(() => {
    if (!currentUser || isAdmin) return;
    const unsub = onSnapshot(
      collection(db, "carts", currentUser.uid, "items"),
      (snap) => setCartCount(snap.size)
    );
    return () => unsub();
  }, [currentUser, isAdmin]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  // Close menu when clicking a link or outside
  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarMenu");
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    // Close when clicking a nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse);
        bsCollapse.hide();
      });
    });

    // Close when clicking outside
    const handleClickOutside = (e) => {
      if (navbarCollapse.classList.contains("show") && !navbarCollapse.contains(e.target)) {
        const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      navLinks.forEach((link) =>
        link.removeEventListener("click", () => {})
      );
    };
  }, []);

  return (
    <>
 <AnnouncementBar/>


    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
      <div className="container">

        {/* Hamburger Button */}
        <button
          className="navbar-toggler me-4 custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Logo + Brand */}
        <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
          <img
            src={"https://res.cloudinary.com/dvxaztwnz/image/upload/v1754728677/jewelora_rlc5cq.jpg"}
            alt="Logo"
            className="border border-warning rounded-circle"
            style={{
              width: "75px",
              height: "75px",
              objectFit: "contain",
              backgroundColor: "white"
            }}
          />
          <span className="fw-bold fs-5 text-warning d-none d-sm-inline">
            Jewelora
          </span>
        </NavLink>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-auto me-4 text-center">
            {["/", "/shop", "/category", "/about", "/contact"].map((path, idx) => {
              const labels = ["Home", "Shop", "Category", "About", "Contact"];
              return (
                <li className="nav-item" key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? "text-warning" : ""}`
                    }
                  >
                    {labels[idx]}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3">
          {!isAdmin && currentUser && (
            <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
              <ShoppingCart size={13} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          {currentUser ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-warning rounded-circle d-flex align-items-center justify-content-center"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "38px", height: "38px" }}
              >
                <User size={13} />
              </button>
              <ul
                className="dropdown-menu dropdown-menu-end shadow border-0 p-2"
                aria-labelledby="profileDropdown"
              >
                <li className="px-3 py-2 text-center">
                  <strong>{currentUser.displayName || "User"}</strong>
                  <div className="small text-muted">{currentUser.email}</div>
                </li>
                
                
                <li><hr className="dropdown-divider" /></li>

                {!isAdmin && (
                  <>
                    <li><NavLink to="/orders" className="dropdown-item">My Orders</NavLink></li>
                    <li><NavLink to="/saved-address" className="dropdown-item">Saved Addresses</NavLink></li>
                  </>
                )}

                {isAdmin && (
                  <>
                    <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
                    <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
                    <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
                  </>
                )}

                <li>
                  <button onClick={handleLogout} className="dropdown-item text-danger">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <NavLink 
  to="/signin" 
  className="btn btn-sm fw-semibold signin-btn"
>
  <LogIn size={13} className="me-2" /> Login
</NavLink>
   

            </>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
