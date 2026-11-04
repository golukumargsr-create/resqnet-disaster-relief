import React from 'react';

/**
 * Reusable Status & Priority Badge Component
 * Types:
 * - priority: 'Critical' | 'High' | 'Medium' | 'Low'
 * - status: 'Pending' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected'
 * - availability: 'Available' | 'Busy' | 'Unavailable'
 */
export default function StatusBadge({ type = 'status', value }) {
  if (!value) return null;

  let badgeClass = 'badge ';

  // Normalize string for class mapping
  const normalized = value.toLowerCase().replace(/\s+/g, '-');

  if (type === 'priority') {
    badgeClass += `badge-${normalized}`;
  } else if (type === 'availability') {
    badgeClass += `badge-${normalized}`;
  } else {
    // Default: status
    badgeClass += `badge-${normalized}`;
  }

  return (
    <span className={badgeClass}>
      <span className="badge-dot" />
      {value}
    </span>
  );
}

