import React from 'react';
import {
  ClipboardList,
  Boxes,
  Users,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  PlusCircle,
  Package,
  Droplets,
  HeartPulse,
  Bed,
  Home,
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import { calculateDashboardStats, calculatePriorityBreakdown } from '../utils/calculations';

export default function Dashboard({
  requests = [],
  resources = [],
  volunteers = [],
  areas = [],
  activities = [],
  onNavigate,
  onOpenQuickModal
}) {
  // Dynamically calculate all statistics from current records
  const stats = calculateDashboardStats(requests, resources, volunteers, areas);
  const priorityBreakdown = calculatePriorityBreakdown(requests);
  const recentRequests = requests.slice(0, 5);
  const recentActivitiesList = activities.slice(0, 5);

  return (
    <div className="dashboard-page">
      {/* Quick Actions Bar */}
      <div className="quick-actions-bar">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onOpenQuickModal('request')}
        >
          <PlusCircle size={16} />
          <span>Create Relief Request</span>
        </button>

        <button
          type="button"
          className="btn btn-navy"
          onClick={() => onOpenQuickModal('resource')}
        >
          <Boxes size={16} />
          <span>Add Resource</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onOpenQuickModal('volunteer')}
        >
          <Users size={16} />
          <span>Register Volunteer</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onOpenQuickModal('area')}
        >
          <MapPin size={16} />
          <span>Add Affected Area</span>
        </button>
      </div>

      {/* Primary 4 Major Statistics */}
      <div className="stats-grid-primary">
        <StatCard
          label="Total Relief Requests"
          value={stats.totalRequests}
          icon={ClipboardList}
          iconBg="#EFF6FF"
          iconColor="#2563EB"
          subtext={`${stats.pendingRequests} pending verification`}
          onClick={() => onNavigate('requests')}
        />

        <StatCard
          label="Available Resources"
          value={stats.totalResourceUnits.toLocaleString()}
          icon={Boxes}
          iconBg="#F0FDFA"
          iconColor="#0D9488"
          subtext={`Across ${stats.totalResourceItems} supply categories`}
          onClick={() => onNavigate('inventory')}
        />

        <StatCard
          label="Active Volunteers"
          value={`${stats.activeVolunteers} / ${stats.totalVolunteers}`}
          icon={Users}
          iconBg="#FEF3C7"
          iconColor="#D97706"
          subtext={`${stats.availableVolunteers} ready for rapid deployment`}
          onClick={() => onNavigate('volunteers')}
        />

        <StatCard
          label="Affected Areas"
          value={stats.totalAreas}
          icon={MapPin}
          iconBg="#FEE2E2"
          iconColor="#DC2626"
          subtext={`${stats.totalAffectedPopulation.toLocaleString()} affected individuals`}
          onClick={() => onNavigate('areas')}
        />
      </div>

      {/* Secondary 4 Statistics */}
      <div className="stats-grid-secondary">
        <StatCard
          label="Pending Requests"
          value={stats.pendingRequests}
          icon={Clock}
          iconBg="#FEF3C7"
          iconColor="#B45309"
          subtext="Awaiting coordinator approval"
          onClick={() => onNavigate('requests')}
        />

        <StatCard
          label="Approved Requests"
          value={stats.approvedRequests}
          icon={CheckCircle2}
          iconBg="#F0FDFA"
          iconColor="#0D9488"
          subtext="Ready for resource allocation"
          onClick={() => onNavigate('requests')}
        />

        <StatCard
          label="Completed Requests"
          value={stats.completedRequests}
          icon={TrendingUp}
          iconBg="#ECFDF5"
          iconColor="#10B981"
          subtext="Relief successfully delivered"
          onClick={() => onNavigate('requests')}
        />

        <StatCard
          label="Critical Priority"
          value={stats.criticalRequests}
          icon={Flame}
          iconBg="#FEE2E2"
          iconColor="#EF4444"
          subtext="Immediate life-saving urgency"
          onClick={() => onNavigate('requests')}
        />
      </div>

      {/* Section 1: Resource Overview */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <Boxes size={18} color="#0D9488" />
              Resource Inventory Overview
            </h2>
            <p className="card-subtitle">
              Live stock levels of essential disaster relief supplies in regional warehouses
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => onNavigate('inventory')}
          >
            Manage Inventory &rarr;
          </button>
        </div>
        <div className="card-body">
          <div className="resource-overview-grid">
            <div className="resource-mini-card">
              <Package size={26} color="#0D9488" style={{ margin: '0 auto' }} />
              <div className="resource-mini-val">{stats.categoryTotals.food.toLocaleString()}</div>
              <div className="resource-mini-label">Food Packages</div>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Rations &amp; dry food</span>
            </div>

            <div className="resource-mini-card">
              <Droplets size={26} color="#0284C7" style={{ margin: '0 auto' }} />
              <div className="resource-mini-val">{stats.categoryTotals.water.toLocaleString()}</div>
              <div className="resource-mini-label">Drinking Water</div>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Purified bottles (L)</span>
            </div>

            <div className="resource-mini-card">
              <HeartPulse size={26} color="#DC2626" style={{ margin: '0 auto' }} />
              <div className="resource-mini-val">{stats.categoryTotals.medical.toLocaleString()}</div>
              <div className="resource-mini-label">Medical Supplies</div>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Trauma kits &amp; meds</span>
            </div>

            <div className="resource-mini-card">
              <Bed size={26} color="#854D0E" style={{ margin: '0 auto' }} />
              <div className="resource-mini-val">{stats.categoryTotals.blankets.toLocaleString()}</div>
              <div className="resource-mini-label">Blankets</div>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Thermal &amp; bedding</span>
            </div>

            <div className="resource-mini-card">
              <Home size={26} color="#4F46E5" style={{ margin: '0 auto' }} />
              <div className="resource-mini-val">{stats.categoryTotals.shelter.toLocaleString()}</div>
              <div className="resource-mini-label">Shelter Capacity</div>
              <span style={{ fontSize: '0.68rem', color: '#64748B' }}>Tents &amp; tarpaulins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Priority Overview + Recent Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Section 3: Priority Overview */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">
                <AlertTriangle size={18} color="#F59E0B" />
                Priority Overview
              </h2>
              <p className="card-subtitle">Distribution of relief requests by urgency</p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('requests')}
            >
              Filter Requests
            </button>
          </div>
          <div className="card-body">
            {priorityBreakdown.map((item) => (
              <div key={item.label} className="priority-bar-item">
                <div className="priority-bar-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span 
                      style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        background: item.color 
                      }} 
                    />
                    {item.label} Priority
                  </span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Recent Activities */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <h2 className="card-title">
                <Activity size={18} color="#2563EB" />
                Live Incident Activity Feed
              </h2>
              <p className="card-subtitle">Audit trail of relief requests, dispatches, and updates</p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => onNavigate('reports')}
            >
              Full Log &rarr;
            </button>
          </div>
          <div className="card-body">
            {recentActivitiesList.length === 0 ? (
              <p style={{ color: '#64748B', fontSize: '0.85rem' }}>No logged activities yet.</p>
            ) : (
              <div className="activity-list">
                {recentActivitiesList.map((act) => (
                  <div key={act.id} className="activity-item">
                    <div className={`activity-icon-wrapper ${act.type || 'request'}`}>
                      <Activity size={16} />
                    </div>
                    <div className="activity-details">
                      <div className="activity-title">{act.title}</div>
                      <div className="activity-desc">{act.description}</div>
                      <div className="activity-time">
                        <Clock size={12} />
                        <span>{act.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Recent Relief Requests */}
      <div className="card">
        <div className="card-header">
          <div>
            <h2 className="card-title">
              <ClipboardList size={18} color="#0D9488" />
              Recent Relief Requests (Latest 5)
            </h2>
            <p className="card-subtitle">
              Most recent incoming requirements from affected emergency zones
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('requests')}
          >
            <span>View All ({requests.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="table-responsive">
          <table className="resqnet-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Affected Area</th>
                <th>Required Resource</th>
                <th>Quantity</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => onNavigate('requests')}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

