import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const u = await login(email, password);
      toast.success('Logged in');
      if (u.role === 'CUSTOMER') navigate('/customer');
      else navigate('/officer');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  }

  return (
    <div className="content-center">
      <div className="auth-card">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="icon-wrapper">
                <i className="bi bi-shield-lock"></i>
              </div>
              <h3 className="card-title">Welcome Back</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Sign in to your account</p>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-envelope me-2"></i>Email Address
                </label>
                <input 
                  className="form-control" 
                  type="email"
                  placeholder="you@example.com"
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  <i className="bi bi-lock me-2"></i>Password
                </label>
                <input 
                  className="form-control" 
                  type="password"
                  placeholder="Enter your password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100 py-3 mb-3">
                <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
              </button>
              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>
                  Create one
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
