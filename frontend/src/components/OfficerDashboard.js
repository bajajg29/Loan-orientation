import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function OfficerDashboard() {
  const [pending, setPending] = useState([]);

  async function load() {
    try {
      const res = await api.get('/officer/loans/pending');
      setPending(res.data.pending || []);
    } catch (err) {
      toast.error('Failed to load');
    }
  }

  useEffect(() => { load(); }, []);

  async function review(id, action) {
    try {
      await api.post(`/officer/loans/${id}/review`, { action: action === 'APPROVED' ? 'APPROVE' : 'REJECT' });
      toast.success('Reviewed');
      load();
    } catch (err) {
      toast.error('Review failed');
    }
  }

  return (
    <div className="container py-4">
      <div className="dashboard-header">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="icon-wrapper me-3" style={{ width: '56px', height: '56px' }}>
              <i className="bi bi-briefcase"></i>
            </div>
            <div>
              <h3>Loan Officer Dashboard</h3>
              <p className="text-muted mb-0">Review and manage loan applications 💼</p>
            </div>
          </div>
          <button className="btn btn-outline-secondary" onClick={load}>
            <i className="bi bi-arrow-clockwise me-2"></i>Refresh
          </button>
        </div>
      </div>

      {pending.length === 0 ? (
        <div className="card text-center py-5">
          <div className="card-body">
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#cbd5e1' }}></i>
            <h4 className="mt-3 mb-2">No Pending Applications</h4>
            <p className="text-muted">All caught up! There are no loan applications waiting for review.</p>
            <button className="btn btn-primary mt-3" onClick={load}>
              <i className="bi bi-arrow-clockwise me-2"></i>Check Again
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="alert mb-4" style={{ background: 'rgba(102, 126, 234, 0.1)', border: 'none', borderRadius: '12px', color: '#475569' }}>
            <i className="bi bi-info-circle me-2"></i>
            <strong>{pending.length}</strong> application{pending.length !== 1 ? 's' : ''} awaiting your review
          </div>

          <div className="row g-4">
            {pending.map(p => (
              <div className="col-lg-6 col-xl-4" key={p._id}>
                <div className="card h-100">
                  <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="card-title mb-0">
                        <i className="bi bi-file-earmark-text me-2"></i>Application
                      </h6>
                      <span className="status-badge pending">
                        <i className="bi bi-clock me-1"></i>Pending
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <small className="text-muted d-block mb-1">Application ID</small>
                      <code style={{ fontSize: '0.75rem', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>
                        {p._id}
                      </code>
                    </div>

                    <div className="row g-3 mb-4">
                      <div className="col-6">
                        <div className="p-3" style={{ background: 'linear-gradient(135deg, rgba(17, 153, 142, 0.1) 0%, rgba(56, 239, 125, 0.1) 100%)', borderRadius: '10px' }}>
                          <div className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>Amount</div>
                          <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#11998e' }}>
                            ${p.amountRequested?.toLocaleString() || 'N/A'}
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="p-3" style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)', borderRadius: '10px' }}>
                          <div className="text-muted mb-1" style={{ fontSize: '0.75rem' }}>Tenure</div>
                          <div className="fw-bold" style={{ fontSize: '1.25rem', color: '#667eea' }}>
                            {p.tenureMonths || 'N/A'}<small className="text-muted" style={{ fontSize: '0.875rem' }}> mo</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 pb-3" style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <small className="text-muted d-block mb-1">Customer</small>
                      <div className="d-flex align-items-center">
                        <div className="me-2" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.875rem', fontWeight: '600' }}>
                          {(p.customerId?.userId || 'U').charAt(0).toUpperCase()}
                        </div>
                        <span className="fw-medium">{p.customerId?.userId || 'Unknown'}</span>
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button className="btn btn-success" onClick={() => review(p._id, 'APPROVED')}>
                        <i className="bi bi-check-circle me-2"></i>Approve
                      </button>
                      <button className="btn btn-danger" onClick={() => review(p._id, 'REJECTED')}>
                        <i className="bi bi-x-circle me-2"></i>Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
