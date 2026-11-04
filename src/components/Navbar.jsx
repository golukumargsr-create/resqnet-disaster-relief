import React, { useState } from 'react';
import {
  Menu,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock,
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Navbar({
  activeTab,
  mobileOpen,
  setMobileOpen,
  currentUser,
  onLogout,
  activities = [],
  onNavigate
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Map tab IDs to titles & descriptions
  const pageMeta = {
    dashboard: {
      title: 'Disaster Relief Command Dashboard',
      subtitle: 'Real-time overview of emergencies, resource inventory, and volunteer assignments'
    },
    requests: {
      title: 'Relief Request Management',
      subtitle: 'Record, review, prioritize and approve disaster relief supply requests'
    },
    inventory: {
      title: 'Resource Inventory & Logistics',
      subtitle: 'Monitor stock levels, warehouse locations, and allocation quantities'
    },
    areas: {
      title: 'Disaster Affected Areas',
      subtitle: 'Track affected population, severity levels, and on-ground requirements'
    },
    volunteers: {
      title: 'Volunteer Personnel Registry',
      subtitle: 'Manage relief personnel, emergency skillsets, and field deployment'
    },
    allocations: {
      title: 'Resource Allocation Hub',
      subtitle: 'Allocate and dispatch inventory supplies directly to verified relief requests'
    },
    reports: {
      title: 'Analytics & Export Reports',
      subtitle: 'Generate operational summaries, visual breakdowns, and CSV data exports'
    },
    about: {
      title: 'About Platform & System Controls',
      subtitle: 'Academic project architecture, viva guide, and data reset options'
    }
  };

  const currentMeta = pageMeta[activeTab] || pageMeta.dashboard;
  const recentActivities = activities.slice(0, 5);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb-area">
          <h1 className="page-title">{currentMeta.title}</h1>
          <span className="page-subtitle">{currentMeta.subtitle}</span>
        </div>
      </div>

      <div className="navbar-right">
        {/* Status Indicator */}
        <div className="status-indicator-pill">
          <span className="pulse-dot" />
          <span>OPS ACTIVE</span>
        </div>

        {/* Notifications Tray Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="nav-action-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            title="Activity Notifications"
          >
            <Bell size={18} />
            {recentActivities.length > 0 && (
              <span className="notification-badge">{recentActivities.length}</span>
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '340px',
                background: '#FFFFFF',
                borderRadius: '10px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                border: '1px solid #E2E8F0',
                zIndex: 60,
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#F8FAFC'
                }}
              >
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#10243A' }}>
                  Live Operations Feed
                </span>
                <span style={{ fontSize: '0.7rem', color: '#0D9488', fontWeight: 600 }}>
                  Recent Activities
                </span>
              </div>

              <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {recentActivities.length === 0 ? (
                  <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748B', fontSize: '0.8rem' }}>
                    No recent activity records.
                  </div>
                ) : (
                  recentActivities.map((act) => (
                    <div
                      key={act.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderBottom: '1px solid #F1F5F9',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ fontWeight: 600, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0D9488' }} />
                        {act.title}
                      </div>
                      <div style={{ color: '#64748B', marginTop: '0.2rem', lineHeight: '1.3' }}>
                        {act.description}
                      </div>
                      <div style={{ color: '#94A3B8', fontSize: '0.68rem', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} />
                        {act.timestamp}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                style={{
                  padding: '0.5rem 1rem',
                  background: '#F8FAFC',
                  borderTop: '1px solid #E2E8F0',
                  textAlign: 'center'
                }}
              >
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#0D9488',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setShowNotifications(false);
                    if (onNavigate) onNavigate('reports');
                  }}
                >
                  View Full Activity Log &rarr;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Role Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.75rem' }}
          >
            <UserCheck size={16} color="#0D9488" />
            <span style={{ fontWeight: 600, color: '#10243A' }}>
              {currentUser?.role || 'Administrator'}
            </span>
          </button>

          {showUserMenu && (
            <div
              style={{
                position: 'absolute',
                top: '46px',
                right: '0',
                width: '210px',
                background: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                border: '1px solid #E2E8F0',
                zIndex: 60,
                padding: '0.5rem'
              }}
            >
              <div style={{ padding: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10243A' }}>
                  {currentUser?.fullName || 'Relief Officer'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  Role: {currentUser?.role || 'Admin'}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.55rem',
                  marginTop: '0.25rem',
                  background: 'none',
                  border: 'none',
                  color: '#DC2626',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}
              >
                <LogOut size={15} />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

