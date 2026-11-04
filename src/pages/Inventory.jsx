import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Boxes,
  AlertTriangle,
  MapPin,
  Calendar,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { validateResource } from '../utils/validation';

export default function Inventory({
  resources = [],
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  showToast
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'low' | 'normal'

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected item
  const [editingResource, setEditingResource] = useState(null);
  const [resourceToDelete, setResourceToDelete] = useState(null);

  // Form State
  const initialFormState = {
    name: '',
    category: 'Food',
    quantity: '',
    unit: 'packets',
    location: ''
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});

  const categories = [
    'Food',
    'Drinking Water',
    'Medicines',
    'Medical Kits',
    'Blankets',
    'Clothing',
    'Shelter Equipment',
    'Other Essentials'
  ];

  // Filtered List
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        res.id.toLowerCase().includes(search) ||
        res.name.toLowerCase().includes(search) ||
        res.location.toLowerCase().includes(search) ||
        res.category.toLowerCase().includes(search);

      const matchesCat = filterCategory === 'All' || res.category === filterCategory;

      let matchesStock = true;
      const qty = Number(res.quantity) || 0;
      if (stockFilter === 'low') matchesStock = qty < 50;
      if (stockFilter === 'normal') matchesStock = qty >= 50;

      return matchesSearch && matchesCat && matchesStock;
    });
  }, [resources, searchTerm, filterCategory, stockFilter]);

  // Open Add Modal
  function handleOpenAdd() {
    setEditingResource(null);
    setFormData(initialFormState);
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  // Open Edit Modal
  function handleOpenEdit(res) {
    setEditingResource(res);
    setFormData({
      name: res.name,
      category: res.category,
      quantity: res.quantity,
      unit: res.unit,
      location: res.location
    });
    setFormErrors({});
    setIsFormModalOpen(true);
  }

  // Open Delete Modal
  function handleOpenDelete(res) {
    setResourceToDelete(res);
    setIsDeleteModalOpen(true);
  }

  function handleConfirmDelete() {
    if (resourceToDelete) {
      onDeleteResource(resourceToDelete.id);
      showToast('success', 'Resource Deleted', `Resource "${resourceToDelete.name}" was removed.`);
      setResourceToDelete(null);
    }
  }

  // Submit Handler
  function handleFormSubmit(e) {
    e.preventDefault();
    const validation = validateResource(formData);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      showToast('error', 'Validation Error', 'Please check the highlighted fields.');
      return;
    }

    if (editingResource) {
      onUpdateResource(editingResource.id, {
        ...formData,
        quantity: Number(formData.quantity)
      });
      showToast('success', 'Resource Updated', `Inventory stock for "${formData.name}" updated successfully.`);
    } else {
      onAddResource({
        ...formData,
        quantity: Number(formData.quantity)
      });
      showToast('success', 'Resource Added', `New relief item "${formData.name}" added to inventory.`);
    }

    setIsFormModalOpen(false);
  }

  return (
    <div className="inventory-page">
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        {/* Table Toolbar */}
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search by ID, name, category, warehouse..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="toolbar-filters">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Filter size={14} color="#64748B" />
              <select
                className="filter-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <select
              className="filter-select"
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock Only (&lt; 50 units)</option>
              <option value="normal">Normal Stock (&ge; 50 units)</option>
            </select>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenAdd}
            >
              <Plus size={16} />
              <span>Add Resource</span>
            </button>
          </div>
        </div>

        {/* Resources Table */}
        <div className="table-responsive">
          {filteredResources.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Boxes size={28} />
              </div>
              <h3 className="empty-state-title">No Inventory Items Found</h3>
              <p className="empty-state-text">
                No resource matches your search query or selected category filter.
              </p>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('All');
                  setStockFilter('all');
                }}
              >
                Reset Inventory Filters
              </button>
            </div>
          ) : (
            <table className="resqnet-table">
              <thead>
                <tr>
                  <th>Resource ID</th>
                  <th>Resource Name</th>
                  <th>Category</th>
                  <th>Available Quantity</th>
                  <th>Storage Location</th>
                  <th>Stock Warning</th>
                  <th>Last Updated</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((res) => {
                  const qty = Number(res.quantity) || 0;
                  const isLow = qty < 50;

                  return (
                    <tr key={res.id}>
                      <td>
                        <span className="table-code">{res.id}</span>
                      </td>
                      <td style={{ fontWeight: 600, color: '#10243A' }}>
                        {res.name}
                      </td>
                      <td>
                        <span style={{ 
                          fontSize: '0.76rem', 
                          fontWeight: 600, 
                          color: '#475569',
                          background: '#F1F5F9',
                          padding: '2px 8px',
                          borderRadius: '4px'
                        }}>
                          {res.category}
                        </span>
                      </td>
                      <td>
                        <span style={{ 
                          fontWeight: 800, 
                          fontSize: '0.95rem',
                          color: isLow ? '#DC2626' : '#0F172A' 
                        }}>
                          {qty.toLocaleString()}
                        </span>{' '}
                        <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                          {res.unit}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#334155' }}>
                          <MapPin size={13} color="#0D9488" />
                          <span style={{ fontSize: '0.8rem' }}>{res.location}</span>
                        </div>
                      </td>
                      <td>
                        {isLow ? (
                          <span className="badge badge-critical">
                            <span className="badge-dot" />
                            Low Stock Alert
                          </span>
                        ) : (
                          <span className="badge badge-low">
                            <span className="badge-dot" />
                            Adequate Stock
                          </span>
                        )}
                      </td>
                      <td style={{ color: '#64748B', fontSize: '0.78rem' }}>
                        {res.lastUpdated}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="btn btn-secondary btn-icon-only"
                            title="Edit Resource"
                            onClick={() => handleOpenEdit(res)}
                          >
                            <Edit2 size={15} color="#2563EB" />
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary btn-icon-only"
                            title="Delete Resource"
                            onClick={() => handleOpenDelete(res)}
                          >
                            <Trash2 size={15} color="#DC2626" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Resource Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingResource ? `Edit Resource: ${editingResource.id}` : 'Add Inventory Supply'}
        icon={Boxes}
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
              {editingResource ? 'Update Stock' : 'Add to Inventory'}
            </button>
          </>
        }
      >
        <form onSubmit={handleFormSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">
                Resource Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                }}
                placeholder="e.g. Purified Drinking Water (1L bottles)"
              />
              {formErrors.name && <span className="form-error">{formErrors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Category <span className="required">*</span>
              </label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Unit of Measurement <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.unit ? 'is-invalid' : ''}`}
                value={formData.unit}
                onChange={(e) => {
                  setFormData({ ...formData, unit: e.target.value });
                  if (formErrors.unit) setFormErrors({ ...formErrors, unit: null });
                }}
                placeholder="e.g. packets, bottles, kits, units"
              />
              {formErrors.unit && <span className="form-error">{formErrors.unit}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Available Stock Quantity <span className="required">*</span>
              </label>
              <input
                type="number"
                min="0"
                className={`form-input ${formErrors.quantity ? 'is-invalid' : ''}`}
                value={formData.quantity}
                onChange={(e) => {
                  setFormData({ ...formData, quantity: e.target.value });
                  if (formErrors.quantity) setFormErrors({ ...formErrors, quantity: null });
                }}
                placeholder="e.g. 1500"
              />
              {formErrors.quantity && <span className="form-error">{formErrors.quantity}</span>}
              <span className="form-hint">Inventory quantity cannot be negative.</span>
            </div>

            <div className="form-group">
              <label className="form-label">
                Warehouse / Storage Location <span className="required">*</span>
              </label>
              <input
                type="text"
                className={`form-input ${formErrors.location ? 'is-invalid' : ''}`}
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  if (formErrors.location) setFormErrors({ ...formErrors, location: null });
                }}
                placeholder="e.g. Warehouse Guwahati - Sector 4"
              />
              {formErrors.location && <span className="form-error">{formErrors.location}</span>}
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Inventory Resource"
        message={`Are you sure you want to delete "${resourceToDelete?.name}" (${resourceToDelete?.id}) from inventory?`}
        confirmText="Yes, Delete Resource"
      />
    </div>
  );
}

