import React, { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Boxes,
  MapPin,
  Send,
  Users,
  BarChart3,
  Info,
  MoreHorizontal,
  X,
  LogOut,
  Plus
} from 'lucide-react';

export default function BottomNav({
  activeTab,
  setActiveTab,
  pendingCount = 0,
  onOpenQuickModal,
  currentUser,
  onLogout
}) {
  const [showMoreSheet, setShowMoreSheet] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Command', icon: LayoutDashboard },
    { id: 'requests', label: 'Requests', icon: ClipboardList, badge: pendingCount > 0 ? pendingCount : null },
    { id: 'inventory', label: 'Stock', icon: Boxes },
    { id: 'allocations', label: 'Dispatch', icon: Send },
    { id: 'more', label: 'More', icon: MoreHorizontal }
  ];

  const moreItems = [
    { id: 'areas', label: 'Affected Areas', icon: MapPin, desc: 'Monitor disaster zones' },
    { id: 'volunteers', label: 'Volunteer Registry', icon: Users, desc: 'Manage & deploy personnel' },
    { id: 'reports', label: 'Analytics & CSV', icon: BarChart3, desc: 'Export spreadsheets & view charts' },
    { id: 'about', label: 'About & Setup', icon: Info, desc: 'Project architecture & reset' }
  ];

  function handleTabClick(tabId) {
    if (tabId === 'more') {
      setShowMoreSheet(true);
    } else {
      setActiveTab(tabId);
      setShowMoreSheet(false);
    }
  }

  function handleMoreSelect(tabId) {
    setActiveTab(tabId);
    setShowMoreSheet(false);
  }

  return (
    <>
      {/* Android Floating Action Button (FAB) */}
      {onOpenQuickModal && (
        <button
          type="button"
          className="android-fab"
          onClick={() => onOpenQuickModal('request')}
          aria-label="Create New Request"
          title="New Emergency Request"
        >
          <Plus size={24} />
        </button>
      )}

      {/* Android Bottom Navigation Bar */}
      <nav className="android-bottom-nav">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === 'more' 
            ? ['areas', 'volunteers', 'reports', 'about'].includes(activeTab)
            : activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              className={`android-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div className="android-nav-icon-container">
                <Icon size={20} className="android-nav-icon" />
                {tab.badge && <span className="android-nav-badge">{tab.badge}</span>}
              </div>
              <span className="android-nav-label">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Android More Bottom Sheet */}
      {showMoreSheet && (
        <div className="android-sheet-overlay" onClick={() => setShowMoreSheet(false)}>
          <div className="android-bottom-sheet" onClick={(e) => e.stopPropagation()}>
            {/* Sheet Handle */}
            <div className="android-sheet-handle" />

            <div className="android-sheet-header">
              <div>
                <h3 className="android-sheet-title">Operations Menu</h3>
                <p className="android-sheet-subtitle">
                  {currentUser?.fullName} ({currentUser?.role})
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowMoreSheet(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="android-sheet-grid">
              {moreItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`android-sheet-item ${isSelected ? 'active' : ''}`}
                    onClick={() => handleMoreSelect(item.id)}
                  >
                    <div className="android-sheet-item-icon">
                      <Icon size={20} />
                    </div>
                    <div className="android-sheet-item-text">
                      <span className="android-sheet-item-title">{item.label}</span>
                      <span className="android-sheet-item-desc">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {onLogout && (
              <div className="android-sheet-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setShowMoreSheet(false);
                    onLogout();
                  }}
                  style={{ width: '100%', color: '#DC2626', borderColor: '#FCA5A5', padding: '0.65rem' }}
                >
                  <LogOut size={16} />
                  <span>Sign Out of Command Session</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
