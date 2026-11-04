import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import ToastContainer from './components/Toast';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Inventory from './pages/Inventory';
import Areas from './pages/Areas';
import Volunteers from './pages/Volunteers';
import Allocations from './pages/Allocations';
import Reports from './pages/Reports';
import About from './pages/About';

// Storage & Business Logic Utilities
import {
  initializeStorage,
  getRequests,
  addRequest,
  updateRequest,
  deleteRequest,
  getResources,
  addResource,
  updateResource,
  deleteResource,
  getAreas,
  addArea,
  updateArea,
  deleteArea,
  getVolunteers,
  addVolunteer,
  updateVolunteer,
  deleteVolunteer,
  assignVolunteerToArea,
  getAllocations,
  allocateResource,
  completeAllocation,
  getActivities,
  getCurrentUser,
  setCurrentUser,
  clearUserSession,
  resetToDemoData
} from './utils/storage';

export default function App() {
  // 1. Initial Storage Initialization (Loads sample records if first run)
  useEffect(() => {
    initializeStorage();
  }, []);

  // 2. State Management
  const [currentUser, setUser] = useState(() => getCurrentUser());
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Core Data Lists
  const [requests, setRequests] = useState(() => getRequests());
  const [resources, setResources] = useState(() => getResources());
  const [areas, setAreas] = useState(() => getAreas());
  const [volunteers, setVolunteers] = useState(() => getVolunteers());
  const [allocations, setAllocations] = useState(() => getAllocations());
  const [activities, setActivities] = useState(() => getActivities());

  // Toast Notification System
  const [toasts, setToasts] = useState([]);

  function showToast(type, title, message) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }

  function handleDismissToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // Refresh all state from localStorage
  function refreshAllData() {
    setRequests(getRequests());
    setResources(getResources());
    setAreas(getAreas());
    setVolunteers(getVolunteers());
    setAllocations(getAllocations());
    setActivities(getActivities());
  }

  // ----------------------------------------------------
  // ACTION HANDLERS
  // ----------------------------------------------------

  // Auth Handlers
  function handleLoginSuccess(userObj) {
    setCurrentUser(userObj);
    setUser(userObj);
    showToast('success', 'Access Granted', `Welcome back, ${userObj.fullName}! Role: ${userObj.role}`);
  }

  function handleLogout() {
    clearUserSession();
    setUser(null);
    showToast('info', 'Logged Out', 'You have been signed out of the command session.');
  }

  // Relief Request Handlers
  function handleAddRequest(reqData) {
    addRequest(reqData);
    refreshAllData();
  }

  function handleUpdateRequest(id, updatedFields) {
    updateRequest(id, updatedFields);
    refreshAllData();
  }

  function handleDeleteRequest(id) {
    deleteRequest(id);
    refreshAllData();
  }

  // Resource Inventory Handlers
  function handleAddResource(resData) {
    addResource(resData);
    refreshAllData();
  }

  function handleUpdateResource(id, updatedFields) {
    updateResource(id, updatedFields);
    refreshAllData();
  }

  function handleDeleteResource(id) {
    deleteResource(id);
    refreshAllData();
  }

  // Affected Areas Handlers
  function handleAddArea(areaData) {
    addArea(areaData);
    refreshAllData();
  }

  function handleUpdateArea(id, updatedFields) {
    updateArea(id, updatedFields);
    refreshAllData();
  }

  function handleDeleteArea(id) {
    deleteArea(id);
    refreshAllData();
  }

  // Volunteer Handlers
  function handleAddVolunteer(volData) {
    addVolunteer(volData);
    refreshAllData();
  }

  function handleUpdateVolunteer(id, updatedFields) {
    updateVolunteer(id, updatedFields);
    refreshAllData();
  }

  function handleDeleteVolunteer(id) {
    deleteVolunteer(id);
    refreshAllData();
  }

  function handleAssignVolunteer(volId, areaName, taskName) {
    assignVolunteerToArea(volId, areaName, taskName);
    refreshAllData();
  }

  // Allocation Center Handlers
  function handleAllocateResource(allocData) {
    const result = allocateResource(allocData);
    if (result.success) {
      refreshAllData();
    }
    return result;
  }

  function handleCompleteAllocation(allocId) {
    const result = completeAllocation(allocId);
    if (result.success) {
      refreshAllData();
    }
    return result;
  }

  // Reset Data Handler
  function handleResetData() {
    resetToDemoData();
    refreshAllData();
  }

  // Quick Action navigation from Dashboard
  function handleQuickAction(type) {
    if (type === 'request') {
      setActiveTab('requests');
    } else if (type === 'resource') {
      setActiveTab('inventory');
    } else if (type === 'volunteer') {
      setActiveTab('volunteers');
    } else if (type === 'area') {
      setActiveTab('areas');
    }
  }

  // If user is not logged in, show Login Screen
  if (!currentUser) {
    return (
      <>
        <Login onLoginSuccess={handleLoginSuccess} />
        <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
      </>
    );
  }

  // Main Application Shell
  const pendingRequestsCount = requests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="app-container">
      {/* Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        currentUser={currentUser}
        onLogout={handleLogout}
        requestCount={requests.length}
        pendingCount={pendingRequestsCount}
      />

      {/* Main Content Area */}
      <div 
        className="main-wrapper" 
        style={{ marginLeft: isCollapsed ? '76px' : '260px' }}
      >
        <Navbar
          activeTab={activeTab}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          currentUser={currentUser}
          onLogout={handleLogout}
          activities={activities}
          onNavigate={(tab) => setActiveTab(tab)}
        />

        <main className="content-area">
          {activeTab === 'dashboard' && (
            <Dashboard
              requests={requests}
              resources={resources}
              volunteers={volunteers}
              areas={areas}
              activities={activities}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenQuickModal={handleQuickAction}
            />
          )}

          {activeTab === 'requests' && (
            <Requests
              requests={requests}
              areas={areas}
              resources={resources}
              onAddRequest={handleAddRequest}
              onUpdateRequest={handleUpdateRequest}
              onDeleteRequest={handleDeleteRequest}
              showToast={showToast}
            />
          )}

          {activeTab === 'inventory' && (
            <Inventory
              resources={resources}
              onAddResource={handleAddResource}
              onUpdateResource={handleUpdateResource}
              onDeleteResource={handleDeleteResource}
              showToast={showToast}
            />
          )}

          {activeTab === 'areas' && (
            <Areas
              areas={areas}
              onAddArea={handleAddArea}
              onUpdateArea={handleUpdateArea}
              onDeleteArea={handleDeleteArea}
              showToast={showToast}
            />
          )}

          {activeTab === 'volunteers' && (
            <Volunteers
              volunteers={volunteers}
              areas={areas}
              onAddVolunteer={handleAddVolunteer}
              onUpdateVolunteer={handleUpdateVolunteer}
              onDeleteVolunteer={handleDeleteVolunteer}
              onAssignVolunteer={handleAssignVolunteer}
              showToast={showToast}
            />
          )}

          {activeTab === 'allocations' && (
            <Allocations
              allocations={allocations}
              requests={requests}
              resources={resources}
              areas={areas}
              volunteers={volunteers}
              onAllocate={handleAllocateResource}
              onCompleteAllocation={handleCompleteAllocation}
              showToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <Reports
              requests={requests}
              resources={resources}
              volunteers={volunteers}
              areas={areas}
              allocations={allocations}
              activities={activities}
              showToast={showToast}
            />
          )}

          {activeTab === 'about' && (
            <About
              onResetData={handleResetData}
              showToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}

