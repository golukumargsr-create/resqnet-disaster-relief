import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Users,
  UserCheck,
  Send,
  Phone,
  Briefcase,
  MapPin,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import StatusBadge from '../components/StatusBadge';
import { validateVolunteer } from '../utils/validation';

export default function Volunteers({
  volunteers = [],
  areas = [],
  onAddVolunteer,
  onUpdateVolunteer,
  onDeleteVolunteer,
  onAssignVolunteer,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected Volunteer
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [volunteerToDelete, setVolunteerToDelete] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    contact: '',
    assignedArea: 'None',
    assignedTask: '',
    availability: 'Available',
    status: 'Unassigned'
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  // Quick Assignment State
  const [assignArea, setAssignArea] = useState('');
  const [assignTask, setAssignTask] = useState('');

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((vol) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        vol.id.toLowerCase().includes(search) ||
        vol.name.toLowerCase().includes(search) ||
        vol.contact.includes(search) ||
        vol.assignedTask.toLowerCase().includes(search) ||
        vol.assignedArea.toLowerCase().includes(search);

      const matchesAvail =
        filterAvailability === 'All' || vol.availability === filterAvailability;

      return matchesSearch && matchesAvail;
    });
  }, [volunteers, searchTerm, filterAvailability]);

  function handleOpenAdd() {
    setEditingVolunteer(null);
    setFormData(initialFormState);
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  function handleOpenEdit(vol) {
    setEditingVolunteer(vol);
    setFormData({
      name: vol.name,
      contact: vol.contact,
      assignedArea: vol.assignedArea,
      assignedTask: vol.assignedTask,
      availability: vol.availability,
      status: vol.status
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  // Quick Deploy to Area Modal
  function handleOpenAssign(vol) {
    if (vol.availability === 'Unavailable') {
      showToast('error', 'Cannot Assign', `${vol.name} is currently marked as Unavailable.`);
      return;
    }
    setSelectedVolunteer(vol);
    setAssignArea(areas.length > 0 ? areas[0].name : '');
    setAssignTask(vol.assignedTask || 'Emergency Field Support');
    setIsAssignModalOpen(true);
  }

  function handleConfirmAssignment() {
    if (!assignArea) {
      showToast('error', 'Validation Error', 'Please select a deployment area.');
      return;
    }

    onAssignVolunteer(selectedVolunteer.id, assignArea, assignTask);
    showToast('success', 'Volunteer Deployed', `${selectedVolunteer.name} deployed to ${assignArea}.`);
    setIsAssignModalOpen(false);
  }

  // Release volunteer back to Available
  function handleMarkAvailable(vol) {
    onUpdateVolunteer(vol.id, {
      availability: 'Available',
      assignedArea: 'None',
      status: 'Ready for Deployment'
    });
    showToast('success', 'Status Updated', `${vol.name} is now marked Available for deployment.`);
  }

  function handleOpenDelete(vol) {
    setVolunteerToDelete(vol);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (volunteerToDelete) {
      onDeleteVolunteer(volunteerToDelete.id);
      showToast('success', 'Volunteer Removed', `${volunteerToDelete.name} was removed from the registry.`);
      setVolunteerToDelete(null);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const validation = validateVolunteer(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      showToast('error', 'Validation Error', 'Please correct the highlighted fields.');
      return;
    }

    if (editingVolunteer) {
      onUpdateVolunteer(editingVolunteer.id, formData);
      showToast('success', 'Volunteer Updated', `${formData.name}'s record has been updated.`);
    } else {
      onAddVolunteer(formData);
      showToast('success', 'Volunteer Registered', `${formData.name} successfully registered.`);
    }

    setIsFormModalOpen(false);
  }

  return (
    <div className="volunteers-page">
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by name, contact, task, area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} color="#64748B" />
              <select
                className="filter-select"
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
              >
                <option value="All">All Availabilities</option>
                <option value="Available">Available Only</option>
                <option value="Busy">Busy / Deployed</option>
                <option value="Unavailable">Unavailable / On Leave</option>
              </select>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Register Volunteer</span>
            </button>
          </div>
        </div>

        {/* Volunteers Table */}
        <div className="table-responsive">
          {filteredVolunteers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Users size={28} />
              </div>
              <h3 className="empty-state-title">No Volunteers Found</h3>
              <p className="empty-state-text">
                No volunteer record matches your search query or selected availability status.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterAvailability('All');
                }}
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <table className="resqnet-table">
              <thead>
                <tr>
                  <th>Volunteer ID</th>
                  <th>Full Name</th>
                  <th>Contact Number</th>
                  <th>Skillset / Assigned Task</th>
                  <th>Assigned Zone</th>
                  <th>Availability</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVolunteers.map((vol) => (
                  <tr key={vol.id}>
                    <td>
                      <span className="table-code">{vol.id}</span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#10243A' }}>
                      {vol.name}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#0D9488', fontWeight: 500 }}>
                        <Phone size={13} />
                        <span>{vol.contact}</span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#334155' }}>
                      {vol.assignedTask}
                    </td>
                    <td>
                      {vol.assignedArea && vol.assignedArea !== 'None' ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#B45309', fontWeight: 600, fontSize: '0.8rem' }}>
                          <MapPin size={13} />
                          <span>{vol.assignedArea}</span>
                        </div>
                      ) : (
                        <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Unassigned</span>
                      )}
                    </td>
                    <td>
                      <StatusBadge type="availability" value={vol.availability} />
                    </td>
                    <td>
                      <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                        {vol.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        {vol.availability === 'Busy' ? (
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            title="Mark Assignment Complete & Set Available"
                            onClick={() => handleMarkAvailable(vol)}
                            style={{ fontSize: '0.72rem', color: '#059669', borderColor: '#A7F3D0' }}
                          >
                            <CheckCircle size={13} />
                            <span>Free Up</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            title="Assign to Affected Zone"
                            onClick={() => handleOpenAssign(vol)}
                            disabled={vol.availability === 'Unavailable'}
                            style={{ 
                              fontSize: '0.72rem', 
                              opacity: vol.availability === 'Unavailable' ? 0.5 : 1,
                              cursor: vol.availability === 'Unavailable' ? 'not-allowed' : 'pointer'
                            }}
                          >
                            <Send size={12} />
                            <span>Deploy</span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Edit Volunteer"
                          onClick={() => handleOpenEdit(vol)}
                        >
                          <Edit2 size={15} color="#2563EB" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Delete Volunteer"
                          onClick={() => handleOpenDelete(vol)}
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

      {/* Register / Edit Volunteer Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingVolunteer ? `Edit Volunteer: ${editingVolunteer.id}` : 'Register Emergency Volunteer'}
        icon={Users}
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
              {editingVolunteer ? 'Save Changes' : 'Register Volunteer'}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                }}
                placeholder="e.g. Dr. Rohan Mehra"
              />
              {formErrors.name && <span className="form-error">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Contact Number (10 digits) <span className="required">*</span>
              </label>
              <input
                type="tel"
                maxLength="10"
                className={`form-input ${formErrors.contact ? 'is-invalid' : ''}`}
                value={formData.contact}
                onChange={(e) => {
                  setFormData({ ...formData, contact: e.target.value });
                  if (formErrors.contact) setFormErrors({ ...formErrors, contact: null });
                }}
                placeholder="e.g. 9823011221"
              />
              {formErrors.contact && <span className="form-error">{formErrors.contact}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Availability Status <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              >
                <option value="Available">Available for Dispatch</option>
                <option value="Busy">Busy / Currently Assigned</option>
                <option value="Unavailable">Unavailable / On Medical Leave</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Skillset / Assigned Emergency Role <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.assignedTask ? 'is-invalid' : ''}`}
                value={formData.assignedTask}
                onChange={(e) => {
                  setFormData({ ...formData, assignedTask: e.target.value });
                  if (formErrors.assignedTask) setFormErrors({ ...formErrors, assignedTask: null });
                }}
                placeholder="e.g. Emergency Triage, Boat Pilot, Off-Road Transport, Supply Logistics"
              />
              {formErrors.assignedTask && <span className="form-error">{formErrors.assignedTask}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Assigned Area</label>
              <select
                className="form-select"
                value={formData.assignedArea}
                onChange={(e) => setFormData({ ...formData, assignedArea: e.target.value })}
              >
                <option value="None">None (Unassigned)</option>
                {areas.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assignment Status</label>
              <input
                type="text"
                className="form-input"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="e.g. Active or Unassigned"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Quick Deploy Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title={`Deploy Volunteer: ${selectedVolunteer?.name}`}
        icon={Send}
        maxWidth="500px"
        footer={
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsAssignModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirmAssignment}
            >
              Confirm Deployment
            </button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.84rem', color: '#475569' }}>
            Assigning <strong>{selectedVolunteer?.name}</strong> to an emergency zone will automatically change their availability to <strong>Busy</strong>.
          </p>

          <div className="form-group">
            <label className="form-label">
              Target Disaster Zone <span className="required">*</span>
            </label>
            <select
              className="form-select"
              value={assignArea}
              onChange={(e) => setAssignArea(e.target.value)}
            >
              <option value="">-- Choose Affected Zone --</option>
              {areas.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name} ({a.disasterType} - {a.severity})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Mission Task / Duty</label>
            <input
              type="text"
              className="form-input"
              value={assignTask}
              onChange={(e) => setAssignTask(e.target.value)}
              placeholder="e.g. Medical Triage, Supply Distribution"
            />
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Volunteer Record"
        message={`Are you sure you want to remove "${volunteerToDelete?.name}" (${volunteerToDelete?.id})?`}
        confirmText="Yes, Remove Volunteer"
      />
    </div>
  );
}

