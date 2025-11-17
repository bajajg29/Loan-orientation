import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../services/authContext';
import { toast } from 'react-toastify';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [tenure, setTenure] = useState('12');
  const [loanId, setLoanId] = useState('');
  const [status, setStatus] = useState(null);

  async function apply(e) {
    e.preventDefault();
    try {
      const res = await api.post('/loans/apply', { amountRequested: Number(amount), tenureMonths: Number(tenure) });
      toast.success('Applied');
      setLoanId(res.data.loanId);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Apply failed');
    }
  }

  async function checkStatus() {
    try {
      const res = await api.get(`/loans/${loanId}/status`);
      setStatus(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Status failed');
    }
  }

  return (
    <div className="container py-4">
      <div className="dashboard-header">
        <div className="d-flex align-items-center">
          <div className="icon-wrapper me-3" style={{ width: '56px', height: '56px' }}>
            <i className="bi bi-speedometer2"></i>
          </div>
          <div>
            <h3>Customer Dashboard</h3>
            <p className="text-muted mb-0">Welcome back, {user?.name || 'Customer'}! 👋</p>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="card-title">
                <i className="bi bi-cash-coin me-2"></i>Apply for Loan
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={apply}>
                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-currency-dollar me-2"></i>Loan Amount
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">$</span>
                    <input 
                      className="form-control" 
                      type="number"
                      placeholder="50000"
                      value={amount} 
                      onChange={e => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <small className="text-muted">Enter the amount you wish to borrow</small>
                </div>
                <div className="mb-4">
                  <label className="form-label">
                    <i className="bi bi-calendar-range me-2"></i>Tenure Period
                  </label>
                  <div className="input-group">
                    <input 
                      className="form-control" 
                      type="number"
                      value={tenure} 
                      onChange={e => setTenure(e.target.value)}
                      required
                    />
                    <span className="input-group-text">Months</span>
                  </div>
                  <small className="text-muted">Repayment period (12-360 months)</small>
                </div>
                <button className="btn btn-primary w-100 py-3">
                  <i className="bi bi-send me-2"></i>Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card loan-card h-100">
            <div className="card-header">
              <h5 className="card-title">
                <i className="bi bi-search me-2"></i>Check Application Status
              </h5>
            </div>
            <div className="card-body">
              {loanId && (
                <div className="alert alert-info mb-4" style={{ background: 'rgba(102, 126, 234, 0.1)', border: 'none', borderRadius: '10px' }}>
                  <div className="d-flex align-items-center">
                    <i className="bi bi-info-circle me-2"></i>
                    <div>
                      <small className="text-muted d-block">Last Application ID</small>
                      <strong style={{ color: '#667eea' }}>{loanId}</strong>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label className="form-label">
                  <i className="bi bi-hash me-2"></i>Application ID
                </label>
                <div className="input-group">
                  <input 
                    className="form-control" 
                    placeholder="Enter loan application ID"
                    value={loanId} 
                    onChange={e => setLoanId(e.target.value)} 
                  />
                  <button className="btn btn-outline-secondary" onClick={checkStatus}>
                    <i className="bi bi-search me-1"></i>Check
                  </button>
                </div>
              </div>

              {status && (
                <div className="p-4" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)', borderRadius: '12px' }}>
                  <h6 className="fw-bold mb-3">
                    <i className="bi bi-clipboard-data me-2"></i>Application Details
                  </h6>
                  <div className="mb-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Status</span>
                      <span className={`status-badge ${status.status.toLowerCase()}`}>
                        {status.status === 'APPROVED' && <i className="bi bi-check-circle me-1"></i>}
                        {status.status === 'REJECTED' && <i className="bi bi-x-circle me-1"></i>}
                        {status.status === 'PENDING' && <i className="bi bi-clock me-1"></i>}
                        {status.status}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-muted">Eligibility Score</span>
                      <span className="fw-bold" style={{ fontSize: '1.25rem', color: '#667eea' }}>
                        {status.eligibilityScore || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {!status && (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', opacity: 0.3 }}></i>
                  <p className="mt-2 mb-0">Enter an application ID to check status</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
