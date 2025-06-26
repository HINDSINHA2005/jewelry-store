import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust this path to match your project
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]     = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("User created:", user);
      // Optionally store fullName in Firestore or local state
      navigate("/"); // Redirect to homepage after signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="d-flex justify-content-center py-5 bg-light">
      <div className="card shadow p-5" style={{ width: "100%", maxWidth: "500px" }}>
        <h2 className="text-center text-warning fw-bold mb-3">Create Account</h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-warning w-100 text-white fw-semibold">
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/signin" className="text-decoration-none text-warning fw-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};


export default SignUp;
