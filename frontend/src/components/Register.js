import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/authContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const { register } = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      await register({ name, email, password, role });
      toast.success('Registered');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Register failed');
    }
  }

  return (
    <div className="content-center">
      <div className="auth-card">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="icon-wrapper">
                <i className="bi bi-person-plus"></i>
              </div>
              <h3 className="card-title">Create Account</h3>
              <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>Join us to get started</p>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-person me-2"></i>Full Name
                </label>
                <input 
                  className="form-control"
                  placeholder="John Doe"
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-lock me-2"></i>Password
                </label>
                <input 
                  className="form-control" 
                  type="password"
                  placeholder="Create a strong password"
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  <i className="bi bi-briefcase me-2"></i>Account Type
                </label>
                <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="CUSTOMER">🏠 Customer</option>
                  <option value="OFFICER">💼 Loan Officer</option>
                </select>
              </div>
              <button className="btn btn-primary w-100 py-3 mb-3">
                <i className="bi bi-check-circle me-2"></i>Create Account
              </button>
              <div className="text-center">
                <span className="text-muted">Already have an account? </span>
                <Link to="/login" className="text-decoration-none fw-bold" style={{ color: '#667eea' }}>
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
