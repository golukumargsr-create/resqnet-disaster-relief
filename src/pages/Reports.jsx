import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  ClipboardList,
  Boxes,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  FileSpreadsheet,
  Activity,
  Layers
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import {
  calculateDashboardStats,
  calculateCategoryBreakdown,
  calculatePriorityBreakdown,
  calculateStatusBreakdown
} from '../utils/calculations';
import { exportToCSV } from '../utils/exportCsv';

export default function Reports({
  requests = [],
  resources = [],
  volunteers = [],
  areas = [],
  allocations = [],
  activities = [],
  showToast
}) {
  const stats = calculateDashboardStats(requests, resources, volunteers, areas);
  const categoryData = calculateCategoryBreakdown(resources);
  const priorityData = calculatePriorityBreakdown(requests);
  const statusData = calculateStatusBreakdown(requests);

  // CSV Exporters
  function handleExportRequests() {
    if (!requests || requests.length === 0) {
      showToast('error', 'Export Failed', 'No relief requests to export.');
      return;
    }
    exportToCSV('ResQNet_Relief_Requests', requests);
    showToast('success', 'CSV Downloaded', 'Relief Requests CSV exported successfully.');
  }

  function handleExportInventory() {
    if (!resources || resources.length === 0) {
      showToast('error', 'Export Failed', 'No inventory resources to export.');
      return;
    }
    exportToCSV('ResQNet_Resource_Inventory', resources);
    showToast('success', 'CSV Downloaded', 'Resource Inventory CSV exported successfully.');
  }

  // Calculate highest quantity for relative bar width
  const maxCategoryQty = Math.max(...categoryData.map(c => c.totalQuantity), 1);

  return (
    <div className="reports-page">
      {/* Top Banner with Working CSV Export Buttons */}
      <div 
        className="card"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
          background: '#FFFFFF',
          borderLeft: '4px solid #0D9488'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileSpreadsheet size={22} color="#0D9488" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10243A' }}>
              Operational Reports &amp; Data Export Center
            </h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '0.2rem' }}>
            Official metrics, disaster response analytics, and automated spreadsheet generation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-navy btn-sm"
            onClick={handleExportRequests}
          >
            <Download size={14} />
            <span>Export Requests CSV</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleExportInventory}
          >
            <Download size={14} />
            <span>Export Inventory CSV</span>
          </button>
        </div>
      </div>

      {/* 6 Key Operational Summary Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard
          label="Total Relief Requests"
          value={stats.totalRequests}
          icon={ClipboardList}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
        />
        <StatCard
          label="Completed Requests"
          value={stats.completedRequests}
          icon={TrendingUp}
          iconBg="#ECFDF5"
          iconColor="#10B981"
        />
        <StatCard
          label="Pending Requests"
          value={stats.pendingRequests}
          icon={Clock}
          iconBg="#FEF3C7"
          iconColor="#D97706"
        />
        <StatCard
          label="Total Available Resources"
          value={stats.totalResourceUnits.toLocaleString()}
          icon={Boxes}
          iconBg="#F0FDFA"
          iconColor="#0D9488"
        />
        <StatCard
          label="Registered Volunteers"
          value={stats.totalVolunteers}
          icon={Users}
          iconBg="#F3E8FF"
          iconColor="#7E22CE"
        />
        <StatCard
          label="Affected Population"
          value={stats.totalAffectedPopulation.toLocaleString()}
          icon={MapPin}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
        />
      </div>

      {/* Visual Analytics Charts (CSS-powered) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Resource Category Breakdown */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">
              <Layers size={18} color="#0D9488" />
              Resource Category Breakdown
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Total Units in Stock</span>
          </div>
          <div className="card-body">
            {categoryData.map((cat) => {
              const barWidth = Math.max(4, Math.round((cat.totalQuantity / maxCategoryQty) * 100));
              return (
                <div key={cat.category} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    <span style={{ color: '#1E293B' }}>{cat.category}</span>
                    <span style={{ color: '#0D9488', fontWeight: 700 }}>
                      {cat.totalQuantity.toLocaleString()} units ({cat.count} items)
                    </span>
                  </div>
                  <div className="progress-track" style={{ height: '10px' }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${barWidth}%`,
                        backgroundColor: '#0D9488'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Priority & Request Status Distributions */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">
              <BarChart3 size={18} color="#2563EB" />
              Request Status &amp; Urgency Distribution
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Percentage Breakdown</span>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '0.65rem' }}>
              Request Status Lifecycle
            </div>
            {statusData.map((s) => (
              <div key={s.label} className="priority-bar-item">
                <div className="priority-bar-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
                    {s.label}
                  </span>
                  <span style={{ fontWeight: 700 }}>{s.count} ({s.percent}%)</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${s.percent}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '1.25rem', paddingTop: '1rem' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '0.65rem' }}>
                Priority Breakdown
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', textAlign: 'center' }}>
                {priorityData.map((p) => (
                  <div key={p.label} style={{ background: '#F8FAFC', padding: '0.5rem', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>{p.label}</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: p.color, marginTop: '0.2rem' }}>
                      {p.count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Allocation History Summary Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Activity size={18} color="#0D9488" />
            Recent Allocation Dispatch History
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Audit verification records</span>
        </div>
        <div className="table-responsive">
          <table className="resqnet-table">
            <thead>
              <tr>
                <th>Allocation ID</th>
                <th>Request Ref</th>
                <th>Affected Zone</th>
                <th>Dispatched Resource</th>
                <th>Quantity</th>
                <th>Volunteer In Charge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allocations.slice(0, 6).map((alc) => (
                <tr key={alc.id}>
                  <td><span className="table-code">{alc.id}</span></td>
                  <td><span style={{ color: '#2563EB', fontWeight: 600, fontSize: '0.8rem' }}>{alc.requestId}</span></td>
                  <td style={{ fontWeight: 600 }}>{alc.area}</td>
                  <td>{alc.resource}</td>
                  <td style={{ fontWeight: 700 }}>{alc.quantity}</td>
                  <td>{alc.volunteer}</td>
                  <td><StatusBadge type="status" value={alc.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

