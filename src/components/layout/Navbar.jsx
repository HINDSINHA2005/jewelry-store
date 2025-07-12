import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo1.png";
import { ShoppingCart,ShoppingBag, User, Home, Grid, Layers, Info, Phone } from "lucide-react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
          <Link
            to="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <img
              src={logo}
              alt="Logo"
              className="rounded-circle border border-2 border-warning"
              style={{ width: "90px", height: "60px" }}
            />
            <span className="fw-bold fs-4 text-warning">Jewelora</span>
          </Link>

          {/* Desktop Nav Links */}
         <div className="d-none d-lg-flex gap-4 ms-auto me-4">

            <Link to="/" className="nav-link fw-semibold text-dark">Home</Link>
            <Link to="/shop" className="nav-link fw-semibold text-dark">Shop</Link>
            <Link to="/category" className="nav-link fw-semibold text-dark">Category</Link>
            <Link to="/about" className="nav-link fw-semibold text-dark">About</Link>
            <Link to="/contact" className="nav-link fw-semibold text-dark">Contact</Link>
            

          </div>

          {/* Right buttons (always visible) */}
          <div className="d-flex gap-2 align-items-center ">
            {!currentUser ? (
  <>
    <Link to="/signin" className="btn btn-outline-warning btn-sm fw-semibold">
      Sign In
    </Link>
    <Link to="/signup" className="btn btn-warning btn-sm fw-semibold text-white">
      Sign Up
    </Link>
  </>
) : isAdmin ? (
  <>
    <Link to="/admin/orders" className="btn btn-outline-dark btn-sm fw-semibold">
      Orders
    </Link>
    <Link to="/admin/message" className="btn btn-outline-dark btn-sm fw-semibold">
      Messages
    </Link>
    <Link to="/addproduct" className="btn btn-outline-dark btn-sm fw-semibold">
      Add Product
    </Link>
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
    <Link
      to="/cart"
      className="btn btn-outline-secondary position-relative btn-sm"
    >
      <ShoppingCart size={18} />
      {cartCount > 0 && (
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cartCount}
        </span>
      )}
    </Link>

     <Link
      to="/orders"
      className="btn btn-outline-primary btn-sm fw-semibold d-none d-lg-inline"
    >
    Orders
    </Link>

    

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
        <Link to="/" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <Home size={20} />
          <small>Home</small>
        </Link>
        <Link to="/shop" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <Grid size={20} />
          <small>Shop</small>
        </Link>
        <Link to="/category" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <Layers size={20} />
          <small>Category</small>
        </Link>
        <Link to="/about" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <Info size={20} />
          <small>About</small>
        </Link>
        <Link to="/contact" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <Phone size={20} />
          <small>Contact</small>
        </Link>
        <Link to="/orders" className="text-dark d-flex flex-column align-items-center text-decoration-none">
          <ShoppingBag size={20} />
          <small>Orders</small>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
