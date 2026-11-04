import React, { useState } from 'react';
import {
  Send,
  Boxes,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
  MapPin,
  ClipboardList,
  PlusCircle,
  Truck,
  ArrowRight
} from 'lucide-react';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { validateAllocation } from '../utils/validation';

export default function Allocations({
  allocations = [],
  requests = [],
  resources = [],
  areas = [],
  volunteers = [],
  onAllocate,
  onCompleteAllocation,
  showToast
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [selectedRequestId, setSelectedRequestId] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedResourceId, setSelectedResourceId] = useState('');
  const [allocationQuantity, setAllocationQuantity] = useState('');
  const [selectedVolunteerId, setSelectedVolunteerId] = useState('');
  const [notes, setNotes] = useState('');
  const [formErrors, setFormErrors] = useState({});

  // Eligible pending/approved requests
  const openRequests = requests.filter(
    (r) => r.status === 'Pending' || r.status === 'Approved'
  );

  // Available volunteers only (as per requirement: prevent assigning unavailable volunteers)
  const availableVolunteers = volunteers.filter((v) => v.availability === 'Available');

  // Currently selected resource object
  const currentResource = resources.find((r) => r.id === selectedResourceId);
  const currentRequest = requests.find((r) => r.id === selectedRequestId);
  const availableStock = currentResource ? Number(currentResource.quantity) : 0;
  const requestedRequirement = currentRequest ? Number(currentRequest.quantity) : null;

  // Handler when request is selected
  function handleRequestChange(reqId) {
    setSelectedRequestId(reqId);
    setFormErrors({});

    if (!reqId) {
      return;
    }

    const req = requests.find((r) => r.id === reqId);
    if (req) {
      setSelectedArea(req.area);
      setAllocationQuantity(req.quantity);

      // Try to auto-match resource by name
      const matchedRes = resources.find(
        (r) => r.name.toLowerCase() === req.resource.toLowerCase()
      );
      if (matchedRes) {
        setSelectedResourceId(matchedRes.id);
      }
    }
  }

  function handleOpenModal() {
    setFormErrors({});
    if (openRequests.length > 0) {
      handleRequestChange(openRequests[0].id);
    } else {
      setSelectedRequestId('');
      setSelectedArea(areas.length > 0 ? areas[0].name : '');
      setSelectedResourceId(resources.length > 0 ? resources[0].id : '');
      setAllocationQuantity('');
    }
    setSelectedVolunteerId(availableVolunteers.length > 0 ? availableVolunteers[0].id : '');
    setNotes('');
    setIsModalOpen(true);
  }

  function handleSubmitAllocation(e) {
    e.preventDefault();

    // 1. Validate inputs using validation module
    const validation = validateAllocation(
      {
        area: selectedArea,
        resourceId: selectedResourceId,
        quantity: allocationQuantity
      },
      availableStock,
      requestedRequirement
    );

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      showToast('error', 'Allocation Blocked', Object.values(validation.errors)[0]);
      return;
    }

    // 2. Perform allocation
    const result = onAllocate({
      requestId: selectedRequestId || null,
      area: selectedArea,
      resourceId: selectedResourceId,
      quantity: Number(allocationQuantity),
      volunteerId: selectedVolunteerId || null,
      notes: notes
    });

    if (result.success) {
      showToast(
        'success',
        'Resources Dispatched!',
        `Allocation ${result.allocation.id} recorded. Inventory deducted and volunteer deployed.`
      );
      setIsModalOpen(false);
    } else {
      showToast('error', 'Allocation Failed', result.message);
    }
  }

  function handleComplete(alloc) {
    const res = onCompleteAllocation(alloc.id);
    if (res.success) {
      showToast(
        'success',
        'Relief Verified Delivered',
        `Allocation ${alloc.id} completed. Associated request and volunteer have been released.`
      );
    } else {
      showToast('error', 'Error', res.message);
    }
  }

  return (
    <div className="allocations-page">
      {/* Overview Action Banner */}
      <div 
        className="card" 
        style={{ 
          background: 'linear-gradient(to right, #10243A, #1A365D)', 
          color: '#FFFFFF',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={24} color="#5EEAD4" />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
              Resource Allocation &amp; Dispatch Hub
            </h2>
          </div>
          <p style={{ color: '#94A3B8', fontSize: '0.84rem', marginTop: '0.35rem', maxWidth: '640px' }}>
            Coordinate supply logistics: match verified relief requests with available warehouse inventory, deduct stock in real-time, and assign field volunteers for delivery.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleOpenModal}
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem' }}
        >
          <PlusCircle size={18} />
          <span>New Allocation Dispatch</span>
        </button>
      </div>

      {/* Allocation History Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              <Send size={18} color="#0D9488" />
              Allocation Dispatches &amp; Delivery History
            </h3>
            <p className="card-subtitle">
              Audit log of supply consignments dispatched to affected communities
            </p>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>
            Total Allocations: {allocations.length}
          </span>
        </div>

        <div className="table-responsive">
          {allocations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Truck size={28} />
              </div>
              <h3 className="empty-state-title">No Allocation Dispatches Yet</h3>
              <p className="empty-state-text">
                Click the "New Allocation Dispatch" button above to allocate supplies to relief requests.
              </p>
            </div>
          ) : (
            <table className="resqnet-table">
              <thead>
                <tr>
                  <th>Allocation ID</th>
                  <th>Request Reference</th>
                  <th>Target Affected Zone</th>
                  <th>Resource Dispatched</th>
                  <th>Quantity</th>
                  <th>Assigned Volunteer</th>
                  <th>Dispatch Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {allocations.map((alloc) => (
                  <tr key={alloc.id}>
                    <td>
                      <span className="table-code">{alloc.id}</span>
                    </td>
                    <td>
                      {alloc.requestId ? (
                        <span style={{ fontWeight: 600, color: '#2563EB', fontSize: '0.8rem' }}>
                          {alloc.requestId}
                        </span>
                      ) : (
                        <span style={{ color: '#94A3B8' }}>Direct Dispatch</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600, color: '#10243A' }}>
                      {alloc.area}
                    </td>
                    <td>{alloc.resource}</td>
                    <td style={{ fontWeight: 700 }}>
                      {alloc.quantity} {alloc.unit || 'units'}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0F172A', fontSize: '0.82rem' }}>
                        <UserCheck size={14} color="#0D9488" />
                        <span>{alloc.volunteer || 'Field Logistics'}</span>
                      </div>
                    </td>
                    <td style={{ color: '#64748B', fontSize: '0.78rem' }}>
                      {alloc.date}
                    </td>
                    <td>
                      <StatusBadge type="status" value={alloc.status} />
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {alloc.status === 'In Progress' ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleComplete(alloc)}
                          style={{ fontSize: '0.74rem' }}
                        >
                          <CheckCircle2 size={13} />
                          <span>Mark Delivered</span>
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>
                          ✓ Delivered
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Allocation Dispatch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Execute Supply Allocation Dispatch"
        icon={Send}
        maxWidth="680px"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitAllocation}
            >
              Confirm &amp; Dispatch Supplies
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmitAllocation}>
          {/* Step Guidance Note */}
          <div style={{ background: '#F0FDFA', border: '1px solid #99F6E4', borderRadius: '6px', padding: '0.75rem 1rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F766E' }}>
              Resource Allocation Rules:
            </div>
            <div style={{ fontSize: '0.74rem', color: '#115E59', marginTop: '0.2rem' }}>
              1. Selected quantity will be deducted from warehouse inventory immediately.<br />
              2. Allocation quantity cannot exceed available stock.<br />
              3. Request status will automatically transition to <strong>In Progress</strong>.<br />
              4. Assigned volunteer status will switch to <strong>Busy</strong>.
            </div>
          </div>

          <div className="form-grid">
            {/* Link to Relief Request */}
            <div className="form-group full-width">
              <label className="form-label">
                Link to Pending Relief Request (Optional)
              </label>
              <select
                className="form-select"
                value={selectedRequestId}
                onChange={(e) => handleRequestChange(e.target.value)}
              >
                <option value="">-- Direct Dispatch (No Request Linked) --</option>
                {openRequests.map((req) => (
                  <option key={req.id} value={req.id}>
                    {req.id} : {req.area} - {req.quantity} {req.resource} ({req.priority} Priority, {req.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Area */}
            <div className="form-group">
              <label className="form-label">
                Target Disaster Zone <span className="required">*</span>
              </label>
              <select
                className={`form-select ${formErrors.area ? 'is-invalid' : ''}`}
                value={selectedArea}
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                  if (formErrors.area) setFormErrors({ ...formErrors, area: null });
                }}
              >
                <option value="">-- Choose Area --</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
              {formErrors.area && <span className="form-error">{formErrors.area}</span>}
            </div>

            {/* Inventory Resource */}
            <div className="form-group">
              <label className="form-label">
                Select Warehouse Resource <span className="required">*</span>
              </label>
              <select
                className={`form-select ${formErrors.resourceId ? 'is-invalid' : ''}`}
                value={selectedResourceId}
                onChange={(e) => {
                  setSelectedResourceId(e.target.value);
                  if (formErrors.resourceId) setFormErrors({ ...formErrors, resourceId: null });
                }}
              >
                <option value="">-- Choose Inventory Item --</option>
                {resources.map((res) => (
                  <option key={res.id} value={res.id}>
                    {res.name} (Available: {res.quantity} {res.unit})
                  </option>
                ))}
              </select>
              {formErrors.resourceId && <span className="form-error">{formErrors.resourceId}</span>}
            </div>

            {/* Available Stock Display Banner */}
            {currentResource && (
              <div 
                className="form-group full-width"
                style={{
                  background: availableStock < 50 ? '#FEF2F2' : '#F8FAFC',
                  border: `1px solid ${availableStock < 50 ? '#FCA5A5' : '#E2E8F0'}`,
                  borderRadius: '6px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E293B' }}>
                    Warehouse Stock: {currentResource.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    Location: {currentResource.location}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: availableStock < 50 ? '#DC2626' : '#0D9488' }}>
                    {availableStock}
                  </span>{' '}
                  <span style={{ fontSize: '0.76rem', color: '#64748B' }}>{currentResource.unit}</span>
                </div>
              </div>
            )}

            {/* Allocation Quantity */}
            <div className="form-group">
              <label className="form-label">
                Dispatch Allocation Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                min="1"
                max={availableStock}
                className={`form-input ${formErrors.quantity ? 'is-invalid' : ''}`}
                value={allocationQuantity}
                onChange={(e) => {
                  setAllocationQuantity(e.target.value);
                  if (formErrors.quantity) setFormErrors({ ...formErrors, quantity: null });
                }}
                placeholder="Enter quantity to dispatch"
              />
              {formErrors.quantity && <span className="form-error">{formErrors.quantity}</span>}
              {requestedRequirement !== null && (
                <span className="form-hint">
                  Requested by camp: {requestedRequirement} units
                </span>
              )}
            </div>

            {/* Volunteer Selection */}
            <div className="form-group">
              <label className="form-label">
                Assign Available Volunteer
              </label>
              <select
                className="form-select"
                value={selectedVolunteerId}
                onChange={(e) => setSelectedVolunteerId(e.target.value)}
              >
                <option value="">-- Field Logistics Team --</option>
                {availableVolunteers.map((vol) => (
                  <option key={vol.id} value={vol.id}>
                    {vol.name} ({vol.assignedTask})
                  </option>
                ))}
              </select>
              {availableVolunteers.length === 0 && (
                <span className="form-hint" style={{ color: '#DC2626' }}>
                  No volunteers currently marked Available. Will default to General Logistics.
                </span>
              )}
            </div>

            {/* Notes */}
            <div className="form-group full-width">
              <label className="form-label">Dispatch Notes &amp; Escort Instructions</label>
              <textarea
                rows="2"
                className="form-textarea"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Escorted delivery via National Highway convoy; requires signoff at relief camp..."
              />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

