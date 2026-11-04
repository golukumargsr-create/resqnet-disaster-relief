import React from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Boxes,
  MapPin,
  Users,
  Send,
  BarChart3,
  Info,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  LogOut
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  currentUser,
  onLogout,
  requestCount = 0,
  pendingCount = 0
}) {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'requests', label: 'Relief Requests', icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'inventory', label: 'Resource Inventory', icon: Boxes },
    { id: 'areas', label: 'Affected Areas', icon: MapPin },
    { id: 'volunteers', label: 'Volunteer Registry', icon: Users },
    { id: 'allocations', label: 'Allocation Hub', icon: Send },
    { id: 'reports', label: 'Analytics & Reports', icon: BarChart3 },
    { id: 'about', label: 'About & Setup', icon: Info }
  ];

  function handleNavClick(tabId) {
    setActiveTab(tabId);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`sidebar-overlay ${mobileOpen ? 'mobile-open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-wrapper" onClick={() => handleNavClick('dashboard')} style={{ cursor: 'pointer' }}>
            <div className="brand-icon-box">
              <ShieldAlert size={22} />
            </div>
            {!isCollapsed && (
              <div className="brand-text">
                <span className="brand-title">
                  ResQNet
                  <span className="brand-badge">PRO</span>
                </span>
                <span className="brand-tagline">Relief Command Hub</span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="sidebar-collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {!isCollapsed && <div className="nav-section-label">Operations</div>}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                href={`#${item.id}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="nav-item-icon" />
                {!isCollapsed && <span>{item.label}</span>}
                {!isCollapsed && item.badge && (
                  <span className="nav-item-badge">{item.badge}</span>
                )}
              </a>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="sidebar-footer">
          <div className="user-profile-pill">
            <div className="user-avatar">
              {currentUser?.fullName?.charAt(0) || 'A'}
            </div>
            {!isCollapsed && (
              <div className="user-info" style={{ flex: 1 }}>
                <span className="user-name">{currentUser?.fullName || 'Relief Officer'}</span>
                <span className="user-role">{currentUser?.role || 'Administrator'}</span>
              </div>
            )}
            {!isCollapsed && onLogout && (
              <button
                type="button"
                onClick={onLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '4px'
                }}
                title="Log out of session"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

