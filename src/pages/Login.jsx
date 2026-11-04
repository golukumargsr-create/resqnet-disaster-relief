import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, UserCheck, AlertTriangle } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('resqnet123');
  const [role, setRole] = useState('Administrator');
  const [errorMessage, setErrorMessage] = useState('');

  // Predefined demo accounts
  const demoAccounts = [
    { role: 'Administrator', username: 'admin', fullName: 'Dr. Arjun Verma (Admin)', desc: 'Full system privileges' },
    { role: 'Coordinator', username: 'coordinator', fullName: 'Priya Sundaram (Lead)', desc: 'Resource & field allocation' },
    { role: 'Volunteer', username: 'volunteer', fullName: 'Rohan Deshmukh (Volunteer)', desc: 'Field task coordination' }
  ];

  function handleDemoSelect(acc) {
    setUsername(acc.username);
    setPassword('resqnet123');
    setRole(acc.role);
    setErrorMessage('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    // Academic local demo authentication
    const userObj = {
      username: username.trim(),
      fullName: role === 'Administrator' 
        ? 'Chief Coordinator Verma' 
        : role === 'Coordinator' 
          ? 'Field Coordinator Priya' 
          : 'Emergency Volunteer Rohan',
      role: role
    };

    onLoginSuccess(userObj);
  }

  return (
    <div className="login-screen">
      <div className="login-backdrop-decor" />

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <ShieldAlert size={32} />
          </div>
          <h1 className="login-title">ResQNet</h1>
          <p className="login-tagline">Connecting Resources. Coordinating Relief. Saving Lives.</p>
          <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.35rem' }}>
            Disaster Relief Command &amp; Coordination Platform
          </p>
        </div>

        {errorMessage && (
          <div 
            style={{ 
              background: '#FEE2E2', 
              color: '#DC2626', 
              padding: '0.65rem 0.85rem', 
              borderRadius: '6px', 
              fontSize: '0.8rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <AlertTriangle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">
              Username <span className="required">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin or coordinator"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="role">
              Access Role <span className="required">*</span>
            </label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Administrator">Administrator (Full Access)</option>
              <option value="Coordinator">Relief Coordinator (Allocation &amp; Approvals)</option>
              <option value="Volunteer">Field Volunteer (Status &amp; Assignments)</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.75rem', padding: '0.75rem' }}
          >
            <span>Enter Command Center</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Quick Select Section */}
        <div className="demo-credentials-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10243A', fontWeight: 600 }}>
            <UserCheck size={14} color="#0D9488" />
            <span>One-Click Academic Demo Logins</span>
          </div>
          <div className="demo-roles-buttons">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                type="button"
                className="demo-role-btn"
                onClick={() => handleDemoSelect(acc)}
                title={acc.desc}
              >
                {acc.role}
              </button>
            ))}
          </div>
        </div>

        <div className="academic-badge-note">
          <strong>Academic Viva Notice:</strong> This project operates self-contained in the browser using client-side localStorage. Authentication is designed for viva evaluation and demonstration.
        </div>
      </div>
    </div>
  );
}

