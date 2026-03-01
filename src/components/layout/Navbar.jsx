// import React from "react";
// import { LogIn } from "lucide-react";
// import { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { ShoppingCart, User } from "lucide-react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../../firebase";
// import Collapse from "bootstrap/js/dist/collapse";
// import AnnouncementBar from "../AnnouncementBar";
// import "./Navbar.css"

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

//   // Close menu when clicking a link or outside
//   useEffect(() => {
//     const navbarCollapse = document.getElementById("navbarMenu");
//     const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

//     // Close when clicking a nav link
//     navLinks.forEach((link) => {
//       link.addEventListener("click", () => {
//         const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse);
//         bsCollapse.hide();
//       });
//     });

//     // Close when clicking outside
//     const handleClickOutside = (e) => {
//       if (navbarCollapse.classList.contains("show") && !navbarCollapse.contains(e.target)) {
//         const bsCollapse = Collapse.getInstance(navbarCollapse) || new Collapse(navbarCollapse);
//         bsCollapse.hide();
//       }
//     };
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//       navLinks.forEach((link) =>
//         link.removeEventListener("click", () => {})
//       );
//     };
//   }, []);

//   return (
//     <>
//  <AnnouncementBar/>


//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
//       <div className="container">

//         {/* Hamburger Button */}
//         <button
//           className="navbar-toggler me-4 custom-toggler"
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
//             src={"https://res.cloudinary.com/dvxaztwnz/image/upload/v1754728677/jewelora_rlc5cq.jpg"}
//             alt="Logo"
//             className="border border-warning rounded-circle"
//             style={{
//               width: "75px",
//               height: "75px",
//               objectFit: "contain",
//               backgroundColor: "white"
//             }}
//           />
//           <span className="fw-bold fs-5 text-warning d-none d-sm-inline">
//             Jewelora
//           </span>
//         </NavLink>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarMenu">
//           <ul className="navbar-nav ms-auto me-4 text-center">
//             {/* {["/", "/shop","/category", "/about", "/contact","/add-review"].map((path, idx) => {
//               const labels = ["Home","Shop","Category","About","Contact","Give Review"];
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
//             })} */}
//             {[
//   { path: "/", label: "Home" },
//   { path: "/shop", label: "Shop" },
//   { path: "/category", label: "Category" },
//   { path: "/about", label: "About" },
//   { path: "/contact", label: "Contact" },
//   { path: "/add-review", label: "Give Review" },
// ].map(({ path, label }) => (
//   <li className="nav-item" key={path}>
//     <NavLink
//       to={path}
//       className={({ isActive }) =>
//         `nav-link fw-semibold ${isActive ? "text-warning" : ""}`
//       }
//     >
//       {label}
//     </NavLink>
//   </li>
// ))}

//           </ul>
//         </div>

//         {/* Right Side */}
//         <div className="d-flex align-items-center gap-3">
//           {!isAdmin && currentUser && (
//             <NavLink to="/cart" className="btn btn-outline-secondary position-relative btn-sm">
//               <ShoppingCart size={13} />
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
//                 <User size={13} />
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
//                     <li><NavLink to="/admin/finance" className="dropdown-item">Finance</NavLink></li>
//                     <li><NavLink to="/admin/finance/add" className="dropdown-item">Add Finance Entry</NavLink></li>
//                     <li><NavLink to="/admin/inventory"className="dropdown-item">Product Inventory</NavLink></li>
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
//               <NavLink 
//   to="/signin" 
//   className="btn btn-sm fw-semibold signin-btn"
// >
//   <LogIn size={13} className="me-2" /> Login
// </NavLink>
   

//             </>
//           )}
//         </div>
//       </div>
//     </nav>

//     {/* ===== Mobile Bottom Navigation ===== */}
// <div className="mobile-bottom-nav d-lg-none">
//   <NavLink to="/" className="bottom-nav-item">
//     <i className="bi bi-house"></i>
//     <span>Home</span>
//   </NavLink>

//   <NavLink to="/shop" className="bottom-nav-item">
//     <i className="bi bi-bag"></i>
//     <span>Shop</span>
//   </NavLink>

//   <NavLink to="/category" className="bottom-nav-item">
//     <i className="bi bi-grid"></i>
//     <span>Category</span>
//   </NavLink>

//   {!isAdmin && currentUser && (
//     <NavLink to="/cart" className="bottom-nav-item position-relative">
//       <i className="bi bi-cart"></i>
//       <span>Cart</span>
//       {cartCount > 0 && (
//         <small className="cart-badge">{cartCount}</small>
//       )}
//     </NavLink>
//   )}

//   <NavLink to="/about" className="bottom-nav-item">
//     <i className="bi bi-info-circle"></i>
//     <span>About</span>
//   </NavLink>
// </div>
//     </>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { LogIn, ShoppingCart, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Collapse from "bootstrap/js/dist/collapse";
import AnnouncementBar from "../AnnouncementBar";
import "./Navbar.css";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const collapseRef = useRef(null);
  const collapseInstance = useRef(null);

  const isAdmin = currentUser?.email === "info@jewelora.in";

  // Cart realtime
  useEffect(() => {
    if (!currentUser || isAdmin) return;

    const unsub = onSnapshot(
      collection(db, "carts", currentUser.uid, "items"),
      (snap) => setCartCount(snap.size)
    );

    return () => unsub();
  }, [currentUser, isAdmin]);

  // Init collapse once
  useEffect(() => {
    if (collapseRef.current) {
      collapseInstance.current = new Collapse(collapseRef.current, {
        toggle: false,
      });
    }
  }, []);

  const closeMenu = () => {
    if (collapseInstance.current) {
      collapseInstance.current.hide();
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
    closeMenu();
  };

  return (
    <>
      <AnnouncementBar />

      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
        <div className="container position-relative">

          {/* Hamburger */}
          <button
            className="navbar-toggler me-3 custom-toggler"
            type="button"
            onClick={() => collapseInstance.current.toggle()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Logo */}
          <NavLink
            to="/"
            className="navbar-brand d-flex align-items-center gap-2 mobile-center-logo"
            onClick={closeMenu}
          >
            <img
              src="https://res.cloudinary.com/dvxaztwnz/image/upload/v1754728677/jewelora_rlc5cq.jpg"
              alt="Logo"
              className="border border-warning rounded-circle"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                backgroundColor: "white",
              }}
            />
            <span className="fw-bold fs-5 text-warning d-none d-sm-inline">
              Jewelora
            </span>
          </NavLink>

          {/* Collapsible Menu */}
          <div
            className="collapse navbar-collapse"
            ref={collapseRef}
            id="navbarMenu"
          >
            <ul className="navbar-nav ms-auto me-4 text-center">
              {[
                { path: "/", label: "Home" },
                { path: "/shop", label: "Shop" },
                { path: "/category", label: "Category" },
                { path: "/about", label: "About" },
                { path: "/contact", label: "Contact" },
                { path: "/add-review", label: "Give Review" },
              ].map(({ path, label }) => (
                <li className="nav-item" key={path}>
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `nav-link fw-semibold ${isActive ? "text-warning" : ""}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="d-flex align-items-center gap-3">

            {/* Cart (hide mobile via CSS) */}
            {!isAdmin && currentUser && (
              <NavLink
                to="/cart"
                onClick={closeMenu}
                className="btn btn-outline-secondary position-relative btn-sm mobile-hide-cart"
              >
                <ShoppingCart size={15} />
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
                  data-bs-toggle="dropdown"
                  style={{ width: "38px", height: "38px" }}
                >
                  <User size={15} />
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2">

                  <li className="px-3 py-2 text-center">
                    <strong>{currentUser.displayName || "User"}</strong>
                    <div className="small text-muted">{currentUser.email}</div>
                  </li>

                  <li><hr className="dropdown-divider" /></li>

                  {/* USER MENU */}
                  {!isAdmin && (
                    <>
                      <li><NavLink to="/orders" className="dropdown-item">My Orders</NavLink></li>
                      <li><NavLink to="/saved-address" className="dropdown-item">Saved Addresses</NavLink></li>
                    </>
                  )}

                  {/* ADMIN MENU RESTORED */}
                  {isAdmin && (
                    <>
                      <li><NavLink to="/admin/orders" className="dropdown-item">Orders</NavLink></li>
                      <li><NavLink to="/admin/message" className="dropdown-item">Messages</NavLink></li>
                      <li><NavLink to="/addproduct" className="dropdown-item">Add Product</NavLink></li>
                      <li><NavLink to="/admin/finance" className="dropdown-item">Finance</NavLink></li>
                      <li><NavLink to="/admin/finance/add" className="dropdown-item">Add Finance Entry</NavLink></li>
                      <li><NavLink to="/admin/inventory" className="dropdown-item">Product Inventory</NavLink></li>
                    </>
                  )}

                  <li>
                    <button
                      onClick={handleLogout}
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <NavLink
                to="/signin"
                className="btn btn-sm fw-semibold signin-btn"
              >
                <LogIn size={15} className="me-2" /> Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      {/* ===== Mobile Bottom Navigation ===== */}
<div className="mobile-bottom-nav d-lg-none">
  <NavLink to="/" onClick={closeMenu} className="bottom-nav-item">
    <i className="bi bi-house"></i>
    <span>Home</span>
  </NavLink>

  <NavLink to="/shop" onClick={closeMenu} className="bottom-nav-item">
    <i className="bi bi-bag"></i>
    <span>Shop</span>
  </NavLink>

  <NavLink to="/category" onClick={closeMenu} className="bottom-nav-item">
    <i className="bi bi-grid"></i>
    <span>Category</span>
  </NavLink>

  {!isAdmin && currentUser && (
    <NavLink
      to="/cart"
      onClick={closeMenu}
      className="bottom-nav-item position-relative"
    >
      <i className="bi bi-cart"></i>
      <span>Cart</span>
      {cartCount > 0 && (
        <small className="cart-badge">{cartCount}</small>
      )}
    </NavLink>
  )}

  <NavLink to="/about" onClick={closeMenu} className="bottom-nav-item">
    <i className="bi bi-info-circle"></i>
    <span>About</span>
  </NavLink>
</div>
    </>
  );
};

export default Navbar;