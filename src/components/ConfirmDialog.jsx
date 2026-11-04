import React from 'react';
import Modal from './Modal';
import { AlertTriangle } from 'lucide-react';

/**
 * Reusable Confirmation Dialog for Delete and Reset actions
 */
export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action cannot be undone.',
  confirmText = 'Delete',
  confirmBtnClass = 'btn-danger'
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      icon={AlertTriangle}
      maxWidth="460px"
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn ${confirmBtnClass}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        <div 
          style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '50%', 
            background: '#FEE2E2', 
            color: '#DC2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <AlertTriangle size={22} />
        </div>
        <div>
          <p style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 500 }}>
            {message}
          </p>
          <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.35rem' }}>
            Please confirm to verify this operational command.
          </p>
        </div>
      </div>
    </Modal>
  );
}

