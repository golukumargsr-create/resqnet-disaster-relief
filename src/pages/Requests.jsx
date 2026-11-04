import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  ClipboardList,
  AlertCircle,
  Calendar,
  Phone,
  User,
  ArrowUpDown
} from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import StatusBadge from '../components/StatusBadge';
import { validateRequest } from '../utils/validation';

export default function Requests({
  requests = [],
  areas = [],
  resources = [],
  onAddRequest,
  onUpdateRequest,
  onDeleteRequest,
  showToast
}) {
  // Filtering & Sorting State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest' | 'oldest'

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected item states
  const [editingRequest, setEditingRequest] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestToDelete, setRequestToDelete] = useState(null);

  // Form State
  const initialFormState = {
    area: '',
    resource: '',
    quantity: '',
    priority: 'Critical',
    date: new Date().toISOString().slice(0, 10),
    contactPerson: '',
    contactNumber: '',
    description: '',
    status: 'Pending'
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Filtered & Sorted list
  const filteredRequests = useMemo(() => {
    return requests
      .filter((r) => {
        // Search matching
        const search = searchTerm.toLowerCase();
        const matchesSearch =
          r.id.toLowerCase().includes(search) ||
          r.area.toLowerCase().includes(search) ||
          r.resource.toLowerCase().includes(search) ||
          r.contactPerson.toLowerCase().includes(search) ||
          r.contactNumber.includes(search);

        // Priority matching
        const matchesPriority = filterPriority === 'All' || r.priority === filterPriority;

        // Status matching
        const matchesStatus = filterStatus === 'All' || r.status === filterStatus;

        return matchesSearch && matchesPriority && matchesStatus;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') {
          return new Date(b.date || 0) - new Date(a.date || 0);
        }
        return new Date(a.date || 0) - new Date(b.date || 0);
      });
  }, [requests, searchTerm, filterPriority, filterStatus, sortOrder]);

  // Open Form for Adding
  function handleOpenAdd() {
    setEditingRequest(null);
    setFormData({
      ...initialFormState,
      area: areas.length > 0 ? areas[0].name : '',
      resource: resources.length > 0 ? resources[0].name : ''
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  // Open Form for Editing
  function handleOpenEdit(req) {
    setEditingRequest(req);
    setFormData({
      area: req.area,
      resource: req.resource,
      quantity: req.quantity,
      priority: req.priority,
      date: req.date,
      contactPerson: req.contactPerson,
      contactNumber: req.contactNumber,
      description: req.description,
      status: req.status
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  // View Details
  function handleViewDetails(req) {
    setSelectedRequest(req);
    setIsDetailModalOpen(true);
  }

  // Confirm Delete
  function handleOpenDelete(req) {
    setRequestToDelete(req);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (requestToDelete) {
      onDeleteRequest(requestToDelete.id);
      showToast('success', 'Request Deleted', `Relief request ${requestToDelete.id} removed successfully.`);
      setRequestToDelete(null);
    }
  }

  // Form Submit Handler
  function handleFormSubmit(e) {
    e.preventDefault();
    const validation = validateRequest(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      showToast('error', 'Validation Error', 'Please correct the highlighted form fields.');
      return;
    }

    if (editingRequest) {
      // Update existing
      onUpdateRequest(editingRequest.id, {
        ...formData,
        quantity: Number(formData.quantity)
      });
      showToast('success', 'Request Updated', `Relief request ${editingRequest.id} successfully updated.`);
    } else {
      // Add new
      onAddRequest({
        ...formData,
        quantity: Number(formData.quantity)
      });
      showToast('success', 'Request Created', 'New disaster relief request has been successfully registered.');
    }

    setIsFormModalOpen(false);
  }

  return (
    <div className="requests-page">
      {/* Header with Title and Add Button */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by ID, area, resource, contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} color="#64748B" />
              <select
                className="filter-select"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              className="filter-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
            </select>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Create Request</span>
            </button>
          </div>
        </div>

        {/* Requests Table */}
        <div className="table-responsive">
          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <ClipboardList size={28} />
              </div>
              <h3 className="empty-state-title">No Relief Requests Found</h3>
              <p className="empty-state-text">
                No relief requests matched your search criteria or filter conditions.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterPriority('All');
                  setFilterStatus('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <table className="resqnet-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Affected Area</th>
                  <th>Resource Required</th>
                  <th>Quantity</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Request Date</th>
                  <th>Contact Person</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td>
                      <span className="table-code">{req.id}</span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#10243A' }}>{req.area}</td>
                    <td>{req.resource}</td>
                    <td style={{ fontWeight: 700 }}>{req.quantity}</td>
                    <td>
                      <StatusBadge type="priority" value={req.priority} />
                    </td>
                    <td>
                      <StatusBadge type="status" value={req.status} />
                    </td>
                    <td style={{ color: '#64748B', fontSize: '0.78rem' }}>{req.date}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{req.contactPerson}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{req.contactNumber}</div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="View Request Details"
                          onClick={() => handleViewDetails(req)}
                        >
                          <Eye size={15} color="#0D9488" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Edit Request"
                          onClick={() => handleOpenEdit(req)}
                        >
                          <Edit2 size={15} color="#2563EB" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Delete Request"
                          onClick={() => handleOpenDelete(req)}
                        >
                          <Trash2 size={15} color="#DC2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Request Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingRequest ? `Edit Relief Request: ${editingRequest.id}` : 'Create New Relief Request'}
        icon={ClipboardList}
        maxWidth="680px"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsFormModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleFormSubmit}
            >
              {editingRequest ? 'Save Changes' : 'Submit Relief Request'}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-grid">
            {/* Affected Area Select / Input */}
            <div className="form-group full-width">
              <label className="form-label">
                Target Affected Area <span className="required">*</span>
              </label>
              {areas.length > 0 ? (
                <select
                  className={`form-select ${formErrors.area ? 'is-invalid' : ''}`}
                  value={formData.area}
                  onChange={(e) => {
                    setFormData({ ...formData, area: e.target.value });
                    if (formErrors.area) setFormErrors({ ...formErrors, area: null });
                  }}
                >
                  <option value="">-- Select Registered Area --</option>
                  {areas.map((a) => (
                    <option key={a.id} value={a.name}>
                      {a.name} ({a.district}, {a.state} - {a.disasterType})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className={`form-input ${formErrors.area ? 'is-invalid' : ''}`}
                  value={formData.area}
                  onChange={(e) => {
                    setFormData({ ...formData, area: e.target.value });
                    if (formErrors.area) setFormErrors({ ...formErrors, area: null });
                  }}
                  placeholder="e.g. Assam Brahmaputra River Basin"
                />
              )}
              {formErrors.area && <span className="form-error">{formErrors.area}</span>}
            </div>

            {/* Required Resource */}
            <div className="form-group">
              <label className="form-label">
                Resource Required <span className="required">*</span>
              </label>
              {resources.length > 0 ? (
                <select
                  className={`form-select ${formErrors.resource ? 'is-invalid' : ''}`}
                  value={formData.resource}
                  onChange={(e) => {
                    setFormData({ ...formData, resource: e.target.value });
                    if (formErrors.resource) setFormErrors({ ...formErrors, resource: null });
                  }}
                >
                  <option value="">-- Select Supply Requirement --</option>
                  {resources.map((res) => (
                    <option key={res.id} value={res.name}>
                      {res.name} ({res.category})
                    </option>
                  ))}
                  <option value="Other Custom Relief Supply">Other Custom Relief Supply</option>
                </select>
              ) : (
                <input
                  type="text"
                  className={`form-input ${formErrors.resource ? 'is-invalid' : ''}`}
                  value={formData.resource}
                  onChange={(e) => {
                    setFormData({ ...formData, resource: e.target.value });
                    if (formErrors.resource) setFormErrors({ ...formErrors, resource: null });
                  }}
                  placeholder="e.g. Purified Drinking Water (1L)"
                />
              )}
              {formErrors.resource && <span className="form-error">{formErrors.resource}</span>}
            </div>

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">
                Quantity Required <span className="required">*</span>
              </label>
              <input
                type="number"
                min="1"
                className={`form-input ${formErrors.quantity ? 'is-invalid' : ''}`}
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value });
                  if (formErrors.quantity) setFormErrors({ ...formErrors, quantity: null });
                }}
                placeholder="e.g. 500"
              />
              {formErrors.quantity && <span className="form-error">{formErrors.quantity}</span>}
            </div>

            {/* Priority Level */}
            <div className="form-group">
              <label className="form-label">
                Priority Level <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option value="Critical">Critical (Immediate life hazard)</option>
                <option value="High">High (Urgent next 12 hours)</option>
                <option value="Medium">Medium (Within 24-48 hours)</option>
                <option value="Low">Low (General replenishments)</option>
              </select>
            </div>

            {/* Status */}
            <div className="form-group">
              <label className="form-label">
                Request Status <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Contact Person */}
            <div className="form-group">
              <label className="form-label">
                Contact Person / Coordinator <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.contactPerson ? 'is-invalid' : ''}`}
                value={formData.contactPerson}
                onChange={(e) => {
                  setFormData({ ...formData, contactPerson: e.target.value });
                  if (formErrors.contactPerson) setFormErrors({ ...formErrors, contactPerson: null });
                }}
                placeholder="e.g. Dr. Ananya Sharma"
              />
              {formErrors.contactPerson && <span className="form-error">{formErrors.contactPerson}</span>}
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label className="form-label">
                Contact Number (10 digits) <span className="required">*</span>
              </label>
              <input
                type="tel"
                maxLength="10"
                className={`form-input ${formErrors.contactNumber ? 'is-invalid' : ''}`}
                value={formData.contactNumber}
                onChange={(e) => {
                  setFormData({ ...formData, contactNumber: e.target.value });
                  if (formErrors.contactNumber) setFormErrors({ ...formErrors, contactNumber: null });
                }}
                placeholder="e.g. 9876543210"
              />
              {formErrors.contactNumber && <span className="form-error">{formErrors.contactNumber}</span>}
            </div>

            {/* Date Reported */}
            <div className="form-group">
              <label className="form-label">Request Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label className="form-label">
                Situation Description &amp; Specific Logistics Notes <span className="required">*</span>
              </label>
              <textarea
                rows="3"
                className={`form-textarea ${formErrors.description ? 'is-invalid' : ''}`}
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (formErrors.description) setFormErrors({ ...formErrors, description: null });
                }}
                placeholder="Provide situational details (e.g., number of displaced families, camp location, accessibility)..."
              />
              {formErrors.description && <span className="form-error">{formErrors.description}</span>}
            </div>
          </div>
        </form>
      </Modal>

      {/* View Request Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Relief Request Details: ${selectedRequest?.id}`}
        icon={ClipboardList}
        maxWidth="540px"
        footer={
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsDetailModalOpen(false)}
          >
            Close
          </button>
        }
      >
        {selectedRequest && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="table-code">{selectedRequest.id}</span>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.78rem', color: '#64748B' }}>
                  {selectedRequest.date}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <StatusBadge type="priority" value={selectedRequest.priority} />
                <StatusBadge type="status" value={selectedRequest.status} />
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                Location &amp; Requirement
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10243A', marginTop: '0.2rem' }}>
                {selectedRequest.area}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#0D9488', fontWeight: 600, marginTop: '0.25rem' }}>
                {selectedRequest.quantity} × {selectedRequest.resource}
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '0.3rem' }}>
                Emergency Briefing
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.4' }}>
                {selectedRequest.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Field Coordinator</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#10243A' }}>
                  {selectedRequest.contactPerson}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>Emergency Contact</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0D9488' }}>
                  {selectedRequest.contactNumber}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Relief Request"
        message={`Are you sure you want to remove relief request ${requestToDelete?.id} for "${requestToDelete?.area}"?`}
        confirmText="Yes, Delete Request"
      />
    </div>
  );
}

