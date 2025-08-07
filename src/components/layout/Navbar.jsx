import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo1.png";
import {
  ShoppingCart,
  ShoppingBag,
  User,
  Home,
  Grid,
  Layers,
  Info,
  Phone,
} from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

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

  return (
    <>
      {/* ───── Top Navbar ───── */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="rounded-circle border border-2 border-warning"
              style={{ width: "90px", height: "60px" }}
            />
            <span className="fw-bold fs-4 text-warning">Jewelora</span>
          </NavLink>

          {/* Desktop Nav Links */}
          <div className="d-none d-lg-flex gap-4 ms-auto me-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
              }
            >
              Category
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link fw-semibold ${isActive ? "text-warning" : "text-dark"}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Right buttons */}
          <div className="d-flex gap-2 align-items-center">
            {!currentUser ? (
              <>
                <NavLink
                  to="/signin"
                  className="btn btn-outline-warning btn-sm fw-semibold"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn btn-warning btn-sm fw-semibold text-white"
                >
                  Sign Up
                </NavLink>
              </>
            ) : isAdmin ? (
              <>
                <NavLink
                  to="/admin/orders"
                  className={({ isActive }) =>
                    `btn btn-outline-dark btn-sm fw-semibold ${
                      isActive ? "text-warning" : ""
                    }`
                  }
                >
                  Orders
                </NavLink>
                <NavLink
                  to="/admin/message"
                  className={({ isActive }) =>
                    `btn btn-outline-dark btn-sm fw-semibold ${
                      isActive ? "text-warning" : ""
                    }`
                  }
                >
                  Messages
                </NavLink>
                <NavLink
                  to="/addproduct"
                  className={({ isActive }) =>
                    `btn btn-outline-dark btn-sm fw-semibold ${
                      isActive ? "text-warning" : ""
                    }`
                  }
                >
                  Add Product
                </NavLink>
                <button className="btn btn-outline-warning btn-sm" disabled>
                  <User size={18} />
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm fw-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/cart"
                  className="btn btn-outline-secondary position-relative btn-sm"
                >
                  <ShoppingCart size={18} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `btn btn-outline-primary btn-sm fw-semibold d-none d-lg-inline ${
                      isActive ? "text-warning" : ""
                    }`
                  }
                >
                  Orders
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm fw-semibold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ───── Bottom Nav (Mobile Only) ───── */}
      <div className="d-lg-none d-flex justify-content-around align-items-center bg-white border-top shadow-sm fixed-bottom py-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-warning" : "text-dark"
            }`
          }
        >
          <Home size={20} />
          <small>Home</small>
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-warning" : "text-dark"
            }`
          }
        >
          <Grid size={20} />
          <small>Shop</small>
        </NavLink>
        <NavLink
          to="/category"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-warning" : "text-dark"
            }`
          }
        >
          <Layers size={20} />
          <small>Category</small>
        </NavLink>
        
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-warning" : "text-dark"
            }`
          }
        >
          <Phone size={20} />
          <small>Contact</small>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `d-flex flex-column align-items-center text-decoration-none ${
              isActive ? "text-warning" : "text-dark"
            }`
          }
        >
          <ShoppingBag size={20} />
          <small>Orders</small>
        </NavLink>
      </div>
    </>
  );
};

export default Navbar;
