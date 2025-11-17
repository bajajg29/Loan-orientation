import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import CustomerDashboard from './components/CustomerDashboard';
import OfficerDashboard from './components/OfficerDashboard';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './services/authContext';

function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <div>
      <Navbar />
      <div className="content-center">
        <div style={{ width: '100%' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/customer" element={<PrivateRoute roles={["CUSTOMER"]}><CustomerDashboard /></PrivateRoute>} />
            <Route path="/officer" element={<PrivateRoute roles={["OFFICER"]}><OfficerDashboard /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
