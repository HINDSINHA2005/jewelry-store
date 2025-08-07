import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path if needed
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User signed in:", user);
      navigate("/"); // Redirect to home or dashboard
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <section className="d-flex justify-content-center py-5 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center text-warning fw-bold mb-3">Welcome Back</h2>

        <form onSubmit={handleSignIn}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-warning w-100 text-white fw-semibold">
            Sign In
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-decoration-none text-warning fw-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};


export default SignIn;
