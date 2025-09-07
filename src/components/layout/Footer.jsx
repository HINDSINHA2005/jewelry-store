import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

const Footer = () => {
  const { currentUser, logout } = useAuth();
  const [animate, setAnimate] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        color: "#3b2f2f", // ✅ deep luxury brown text color
        background:
          // "linear-gradient(135deg, #f0c92f, #f1b132ff, #ffb84d, #ffa31a)",
          "linear-gradient(135deg, #f9d423, #ffb347, #f39c12, #ffcc33)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 8s ease infinite",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div className={`container ${animate ? "fade-in" : ""}`}>
        <div className="row gy-5">
          {/* Brand + Social */}
          <div className="col-lg-3 col-md-6 text-center text-md-start footer-section">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3">
              <img
                src={
                  "https://res.cloudinary.com/dvxaztwnz/image/upload/v1754728677/jewelora_rlc5cq.jpg"
                }
                alt="Logo"
                width="95"
                height="91"
                className="me-2 rounded-circle border border-light shadow"
              />
              <h5
                className="mb-0 fw-bold"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Jewelora
              </h5>
            </div>
            <p className="small">
              Discover timeless elegance. Premium crafted jewelry just for you.
            </p>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start mt-3">
              <a
                href="https://www.instagram.com/jew_elora"
                className="fs-5 social-icon"
                style={{ color: "#3b2f2f" }}
              >
                <Instagram />
              </a>
              <a
                href="https://www.facebook.com/share/1CcdEpJRH4/"
                className="fs-5 social-icon"
                style={{ color: "#3b2f2f" }}
              >
                <Facebook />
              </a>
            </div>
          </div>

          {/* Shop + Explore */}
          <div className="col-lg-3 col-md-6 text-center text-md-start footer-section">
            <h6
              className="fw-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Shop + Explore
            </h6>
            <ul className="list-unstyled small">
              {[
                { to: "/shop", label: "Shop it All" },
                { to: "/", label: "Home" },
                { to: "/category", label: "Categories" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
                // { to: "/cart", label: "Cart" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-decoration-none footer-link"
                    style={{ color: "#3b2f2f" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 text-center text-md-start footer-section">
            <h6
              className="fw-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Info
            </h6>
            <ul className="list-unstyled small">
              {currentUser && (
                <>
                  <li>
                    <Link
                      to="/account"
                      className="text-decoration-none footer-link"
                      style={{ color: "#3b2f2f" }}
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      className="text-decoration-none footer-link"
                      style={{ color: "#3b2f2f" }}
                    >
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cart"
                      className="text-decoration-none footer-link"
                      style={{ color: "#3b2f2f" }}
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-link p-0 text-decoration-none footer-link fw-bold"
                      style={{ color: "#3b2f2f" }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              <li>
                <Link to="/policies/terms">Terms</Link>
              </li>
              <li>
                <Link to="/policies/privacy">Privacy</Link>
              </li>
              <li>
                {" "}
                <Link to="/policies/refund">Refund</Link>
              </li>
              <li>
                {" "}
                <Link to="/policies/replacement">Replacement</Link>
              </li>
              <li>
                {" "}
                <Link to="/policies/cancellation">Cancellation</Link>
              </li>
              <li>
                {" "}
                <Link to="/policies/shipping">Shipping</Link>
              </li>

              <li>
                <a
                  href="https://collaboration.payment.jewelora.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none footer-link"
                  style={{ color: "#3b2f2f" }}
                >
                  Collaborate With Us
                </a>
              </li>

              {!currentUser && (
                <li>
                  <Link
                    to="/signin"
                    className="fw-bold text-decoration-none footer-link"
                    style={{ color: "#3b2f2f" }}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {/* Newsletter */}
          <div className="col-lg-4 col-md-6 text-center text-md-start footer-section">
            <h6
              className="fw-bold mb-3 typing-text"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Refresh Your Inbox
            </h6>
            <p className="small">
              Join our email list to get 10% off your first order, plus early
              access to offers.
            </p>
            <form className="d-flex flex-column flex-sm-row gap-2 mt-3">
              <input
                type="email"
                className="form-control rounded-pill px-3"
                placeholder="Email address"
              />
              <button
                className="btn rounded-pill px-5 fw-bold"
                type="submit"
                style={{ backgroundColor: "#3b2f2f", color: "#fdf5e6" }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: "#3b2f2f" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="small">
            &copy; {new Date().getFullYear()} Jewelora. All Rights Reserved.
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=Poppins:wght@400;500&display=swap');
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        .fade-in {
          animation: fadeUp 0.8s ease forwards;
        }
        .footer-section {
          animation: fadeUp 0.8s ease forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        .footer-section:nth-child(2) { animation-delay: 0.4s; }
        .footer-section:nth-child(3) { animation-delay: 0.6s; }
        .footer-section:nth-child(4) { animation-delay: 0.8s; }
        .footer-link:hover {
          color: #fdf5e6 !important;
          font-size: 1.05em;
          text-decoration: underline;
          transition: all 0.3s ease;
        }
        .social-icon:hover {
          color: #fdf5e6 !important;
          transform: scale(1.15);
          transition: all 0.3s ease;
        }
        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          border-right: 2px solid #3b2f2f;
          animation: typing 1.5s steps(20, end) forwards;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
