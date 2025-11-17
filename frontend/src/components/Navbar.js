import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container-fluid">
        {/* Left side */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="me-2" style={{ fontSize: "1.8rem" }}>💰</span>
          <span>LoanHub</span>
        </Link>

        {/* Right side */}
        <div className="navbar-right">
          {user ? (
            <>
              <span className="badge text-uppercase">{user.role}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                <i className="bi bi-box-arrow-right me-2"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-secondary btn-sm" to="/login">
                <i className="bi bi-box-arrow-in-right me-2"></i>Login
              </Link>
              <Link className="btn btn-primary btn-sm" to="/register">
                <i className="bi bi-person-plus me-2"></i>Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
