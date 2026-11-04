import React from 'react';

/**
 * Reusable StatCard Component
 * Displays a key metric with icon, numeric value, and status subtitle
 */
export default function StatCard({
  label,
  value,
  icon: Icon,
  iconBg = '#EFF6FF',
  iconColor = '#2563EB',
  subtext,
  onClick
}) {
  return (
    <div 
      className="stat-card" 
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        {Icon && (
          <div className="stat-icon-wrapper" style={{ backgroundColor: iconBg, color: iconColor }}>
            <Icon size={20} />
          </div>
        )}
      </div>
      <div className="stat-value">{value}</div>
      {subtext && (
        <div className="stat-footer">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}

