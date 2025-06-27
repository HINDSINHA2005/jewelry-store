import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo1.png";
import { ShoppingCart, User } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();            // 🆕 watch route changes

  /* ───── Cart counter ───── */
  useEffect(() => {
    if (!currentUser) return;
    const unsub = onSnapshot(
      collection(db, "carts", currentUser.uid, "items"),
      (snap) => setCartCount(snap.size)
    );
    return () => unsub();
  }, [currentUser]);

  /* ───── Auto‑collapse on route change ───── */
  useEffect(() => {
    // Close menu whenever path changes
    setIsCollapsed(true);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  /* helper: common link with auto‑collapse */
  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="nav-link text-dark fw-semibold"
      onClick={() => setIsCollapsed(true)}   // 🆕 close on click
    >
      {children}
    </Link>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-3">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2" onClick={() => setIsCollapsed(true)}>
          <img
            src={logo}
            alt="Logo"
            className="rounded-circle border border-2 border-warning"
            style={{ width: "90px", height: "60px" }}
          />
          <span className="fw-bold fs-4 text-warning">Jewelora</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-controls="navbarNav"
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`} id="navbarNav">
          {/* -------- Menu links -------- */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3">
            <li className="nav-item"><NavLink to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/shop">Shop</NavLink></li>
            <li className="nav-item"><NavLink to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          {/* -------- Right‑hand buttons -------- */}
          <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0">
            {!currentUser ? (
              <>
                <Link to="/signin" className="btn btn-outline-warning px-4 fw-semibold" onClick={() => setIsCollapsed(true)}>
                  Sign In
                </Link>
                <Link to="/signup" className="btn btn-warning px-4 fw-semibold text-white" onClick={() => setIsCollapsed(true)}>
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/cart" className="btn btn-outline-secondary position-relative" onClick={() => setIsCollapsed(true)}>
                  <ShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <Link to="/orders" className="btn btn-outline-warning fw-semibold" onClick={() => setIsCollapsed(true)}>
                  My Orders
                </Link>

                {currentUser.email === "info@jewelora.in" && (
                  <Link to="/admin/orders" className="btn btn-outline-dark fw-semibold" onClick={() => setIsCollapsed(true)}>
                    Admin Panel
                  </Link>
                )}

                <button className="btn btn-outline-warning d-flex align-items-center" disabled>
                  <User className="me-1" size={18} />
                </button>

                <button onClick={handleLogout} className="btn btn-danger fw-semibold">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
