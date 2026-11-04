import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = '#10B981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = '#EF4444';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = '#F59E0B';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#0D9488';
        }

        return (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <Icon size={20} color={iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              {toast.message && <div className="toast-message">{toast.message}</div>}
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

