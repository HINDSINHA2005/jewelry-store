import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center text-warning fw-bold mb-3">Welcome Back</h2>

        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="example@gmail.com" />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="********" />
          </div>

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
