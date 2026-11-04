import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  MapPin,
  Users,
  AlertTriangle,
  Calendar,
  Waves,
  Activity,
  Wind
} from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import StatusBadge from '../components/StatusBadge';
import { validateArea } from '../utils/validation';

export default function Areas({
  areas = [],
  onAddArea,
  onUpdateArea,
  onDeleteArea,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected Area
  const [editingArea, setEditingArea] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [areaToDelete, setAreaToDelete] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    district: '',
    state: '',
    disasterType: 'Flood',
    population: '',
    severity: 'High',
    requiredAssistance: '',
    status: 'Active',
    dateReported: new Date().toISOString().slice(0, 10)
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const disasterTypes = ['Flood', 'Earthquake', 'Cyclone', 'Landslide', 'Other'];

  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        area.id.toLowerCase().includes(search) ||
        area.name.toLowerCase().includes(search) ||
        area.district.toLowerCase().includes(search) ||
        area.state.toLowerCase().includes(search);

      const matchesType = filterType === 'All' || area.disasterType === filterType;
      const matchesSeverity = filterSeverity === 'All' || area.severity === filterSeverity;

      return matchesSearch && matchesType && matchesSeverity;
    });
  }, [areas, searchTerm, filterType, filterSeverity]);

  function handleOpenAdd() {
    setEditingArea(null);
    setFormData(initialFormState);
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  function handleOpenEdit(area) {
    setEditingArea(area);
    setFormData({
      name: area.name,
      district: area.district,
      state: area.state,
      disasterType: area.disasterType,
      population: area.population,
      severity: area.severity,
      requiredAssistance: area.requiredAssistance,
      status: area.status,
      dateReported: area.dateReported
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  function handleViewDetails(area) {
    setSelectedArea(area);
    setIsDetailModalOpen(true);
  }

  function handleOpenDelete(area) {
    setAreaToDelete(area);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (areaToDelete) {
      onDeleteArea(areaToDelete.id);
      showToast('success', 'Area Removed', `Affected zone "${areaToDelete.name}" removed.`);
      setAreaToDelete(null);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const validation = validateArea(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      showToast('error', 'Validation Error', 'Please complete the required fields.');
      return;
    }

    if (editingArea) {
      onUpdateArea(editingArea.id, {
        ...formData,
        population: Number(formData.population)
      });
      showToast('success', 'Area Updated', `Details for "${formData.name}" successfully updated.`);
    } else {
      onAddArea({
        ...formData,
        population: Number(formData.population)
      });
      showToast('success', 'Area Registered', `New affected zone "${formData.name}" added.`);
    }

    setIsFormModalOpen(false);
  }

  return (
    <div className="areas-page">
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by zone, district, state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} color="#64748B" />
              <select
                className="filter-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All Disasters</option>
                {disasterTypes.map((dt) => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            <select
              className="filter-select"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Add Affected Area</span>
            </button>
          </div>
        </div>

        {/* Areas Table */}
        <div className="table-responsive">
          {filteredAreas.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <MapPin size={28} />
              </div>
              <h3 className="empty-state-title">No Affected Areas Found</h3>
              <p className="empty-state-text">
                No disaster zone matches your search terms or filter selections.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('All');
                  setFilterSeverity('All');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <table className="resqnet-table">
              <thead>
                <tr>
                  <th>Area ID</th>
                  <th>Affected Area Name</th>
                  <th>Location (District, State)</th>
                  <th>Disaster Type</th>
                  <th>Severity Level</th>
                  <th>Affected Population</th>
                  <th>Area Status</th>
                  <th>Date Reported</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAreas.map((area) => (
                  <tr key={area.id}>
                    <td>
                      <span className="table-code">{area.id}</span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#10243A' }}>
                      {area.name}
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem' }}>
                        {area.district}, {area.state}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        color: '#0369A1',
                        background: '#E0F2FE',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {area.disasterType}
                      </span>
                    </td>
                    <td>
                      <StatusBadge type="priority" value={area.severity} />
                    </td>
                    <td style={{ fontWeight: 700, color: '#1E293B' }}>
                      {Number(area.population).toLocaleString()}
                    </td>
                    <td>
                      <span className={`badge ${area.status === 'Active' ? 'badge-critical' : 'badge-low'}`}>
                        <span className="badge-dot" />
                        {area.status}
                      </span>
                    </td>
                    <td style={{ color: '#64748B', fontSize: '0.78rem' }}>
                      {area.dateReported}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="View Complete Area Details"
                          onClick={() => handleViewDetails(area)}
                        >
                          <Eye size={15} color="#0D9488" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Edit Area Record"
                          onClick={() => handleOpenEdit(area)}
                        >
                          <Edit2 size={15} color="#2563EB" />
                        </button>

                        <button
                          type="button"
                          className="btn btn-secondary btn-icon-only"
                          title="Delete Area"
                          onClick={() => handleOpenDelete(area)}
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

      {/* Add / Edit Area Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingArea ? `Edit Area: ${editingArea.id}` : 'Register Disaster-Affected Area'}
        icon={MapPin}
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
              {editingArea ? 'Save Changes' : 'Register Zone'}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Area / Zone Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                }}
                placeholder="e.g. Assam Brahmaputra River Basin"
              />
              {formErrors.name && <span className="form-error">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                District <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.district ? 'is-invalid' : ''}`}
                value={formData.district}
                onChange={(e) => {
                  setFormData({ ...formData, district: e.target.value });
                  if (formErrors.district) setFormErrors({ ...formErrors, district: null });
                }}
                placeholder="e.g. Kamrup & Morigaon"
              />
              {formErrors.district && <span className="form-error">{formErrors.district}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                State <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.state ? 'is-invalid' : ''}`}
                value={formData.state}
                onChange={(e) => {
                  setFormData({ ...formData, state: e.target.value });
                  if (formErrors.state) setFormErrors({ ...formErrors, state: null });
                }}
                placeholder="e.g. Assam"
              />
              {formErrors.state && <span className="form-error">{formErrors.state}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Disaster Type <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.disasterType}
                onChange={(e) => setFormData({ ...formData, disasterType: e.target.value })}
              >
                {disasterTypes.map((dt) => (
                  <option key={dt} value={dt}>{dt}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Severity Level <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Estimated Affected Population <span className="required">*</span>
              </label>
              <input
                type="number"
                min="0"
                className={`form-input ${formErrors.population ? 'is-invalid' : ''}`}
                value={formData.population}
                onChange={(e) => {
                  setFormData({ ...formData, population: e.target.value });
                  if (formErrors.population) setFormErrors({ ...formErrors, population: null });
                }}
                placeholder="e.g. 45000"
              />
              {formErrors.population && <span className="form-error">{formErrors.population}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Area Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="Active">Active Emergency</option>
                <option value="Monitoring">Monitoring Stage</option>
                <option value="Relieved">Relieved / Stabilized</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                Immediate Required Assistance <span className="required">*</span>
              </label>
              <textarea
                rows="2"
                className={`form-textarea ${formErrors.requiredAssistance ? 'is-invalid' : ''}`}
                value={formData.requiredAssistance}
                onChange={(e) => {
                  setFormData({ ...formData, requiredAssistance: e.target.value });
                  if (formErrors.requiredAssistance) setFormErrors({ ...formErrors, requiredAssistance: null });
                }}
                placeholder="e.g. Dry rations, clean water purification, power boats, flood tents..."
              />
              {formErrors.requiredAssistance && (
                <span className="form-error">{formErrors.requiredAssistance}</span>
              )}
            </div>
          </div>
        </form>
      </Modal>

      {/* View Area Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`Affected Area Dossier: ${selectedArea?.name}`}
        icon={MapPin}
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
        {selectedArea && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="table-code">{selectedArea.id}</span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <StatusBadge type="priority" value={selectedArea.severity} />
                <span className={`badge ${selectedArea.status === 'Active' ? 'badge-critical' : 'badge-low'}`}>
                  {selectedArea.status}
                </span>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700 }}>
                Disaster Classification
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10243A', marginTop: '0.2rem' }}>
                {selectedArea.disasterType} Emergency
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.2rem' }}>
                {selectedArea.district}, {selectedArea.state}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ background: '#EFF6FF', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.72rem', color: '#1E40AF', fontWeight: 600 }}>Affected Citizens</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1E3A8A', marginTop: '0.2rem' }}>
                  {Number(selectedArea.population).toLocaleString()}
                </div>
              </div>
              <div style={{ background: '#FEF3C7', padding: '0.75rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.72rem', color: '#92400E', fontWeight: 600 }}>Incident Date</div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#78350F', marginTop: '0.3rem' }}>
                  {selectedArea.dateReported}
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '0.3rem' }}>
                Critical Ground Requirements
              </div>
              <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.4' }}>
                {selectedArea.requiredAssistance}
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Remove Affected Zone"
        message={`Are you sure you want to remove "${areaToDelete?.name}" (${areaToDelete?.id})?`}
        confirmText="Yes, Remove Zone"
      />
    </div>
  );
}

