import React, { useState } from 'react';
import {
  Info,
  ShieldAlert,
  RotateCcw,
  CheckCircle,
  Code2,
  Database,
  Layers,
  Heart,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

export default function About({ onResetData, showToast }) {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  function handleConfirmReset() {
    onResetData();
    showToast('success', 'Demo Data Restored', 'All tables have been reset to initial baseline demo records.');
  }

  return (
    <div className="about-page">
      {/* Platform Mission Card */}
      <div className="card" style={{ padding: '1.75rem', marginBottom: '1.5rem', borderLeft: '4px solid #0D9488' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <div className="brand-icon-box" style={{ width: '42px', height: '42px' }}>
            <ShieldAlert size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#10243A' }}>
              ResQNet – Disaster Relief Coordination Platform
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#0D9488', fontWeight: 600 }}>
              Connecting Resources. Coordinating Relief. Saving Lives.
            </p>
          </div>
        </div>

        <p style={{ color: '#334155', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '0.5rem' }}>
          ResQNet is an academic Internet Programming application engineered to simulate a centralized emergency operations command center. During catastrophic events such as floods, earthquakes, landslides, and cyclones, disaster relief authorities must orchestrate critical supplies—food rations, drinking water, medical kits, and blankets—across geographically dispersed affected areas while matching limited inventory and directing on-ground volunteers.
        </p>
      </div>

      {/* 3 Column Grid: Objective, Workflow, Tech Stack */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Core Objectives */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">
              <CheckCircle size={18} color="#0D9488" />
              Primary Objectives
            </h3>
          </div>
          <div className="card-body">
            <ul style={{ paddingLeft: '1.25rem', color: '#334155', fontSize: '0.84rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <strong>Centralized Requirement Capture:</strong> Real-time recording of supply requisitions with urgency classification (Critical to Low).
              </li>
              <li>
                <strong>Inventory Safeguards:</strong> Real-time stock validation preventing over-allocation or negative inventory balances.
              </li>
              <li>
                <strong>Volunteer Logistics:</strong> Seamless personnel dispatching with dynamic availability status tracking (Available &harr; Busy).
              </li>
              <li>
                <strong>Audit &amp; Accountability:</strong> Historical logging of all consignments from dispatch through delivery completion.
              </li>
            </ul>
          </div>
        </div>

        {/* Operational Workflow */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">
              <Layers size={18} color="#2563EB" />
              Operational Workflow
            </h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</span>
                <div><strong>Requirement Submission:</strong> Camp coordinator registers request with required item &amp; quantity.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</span>
                <div><strong>Inventory Match:</strong> System verifies warehouse quantities; ensures allocation doesn't exceed stock.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</span>
                <div><strong>Dispatch &amp; Assignment:</strong> Stock is deducted immediately, volunteer status changes to Busy.</div>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>4</span>
                <div><strong>Delivery Verification:</strong> Mark allocation completed to close request and free up personnel.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <h3 className="card-title">
              <Code2 size={18} color="#10B981" />
              Technology Architecture
            </h3>
          </div>
          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.82rem' }}>
              <div>
                <strong>UI Framework:</strong> React 18 + Vite (Lightning-fast client bundler)
              </div>
              <div>
                <strong>Language:</strong> Standard ES6+ JavaScript (Beginner-friendly, no TypeScript complexity)
              </div>
              <div>
                <strong>Styling:</strong> Pure CSS (CSS custom variables, flexbox, CSS grid, responsive media queries)
              </div>
              <div>
                <strong>Persistence:</strong> HTML5 Web Storage API (localStorage keys for requests, stock, areas, volunteers)
              </div>
              <div>
                <strong>Icons:</strong> Lucide React (Clean, vector SVGs)
              </div>
              <div>
                <strong>Independence:</strong> 100% Client-side. Zero external backend dependencies or server setup required!
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Project Info & Reset Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <BookOpen size={18} color="#854D0E" />
            Academic Examination &amp; Viva Demonstrations
          </h3>
        </div>
        <div className="card-body">
          <p style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.5' }}>
            This project is configured specifically for faculty viva evaluations. All calculations, state transitions, array operations (<code className="table-code">filter</code>, <code className="table-code">map</code>, <code className="table-code">reduce</code>), and localStorage interactions are implemented with clean, transparent JavaScript code.
          </p>

          <div style={{ marginTop: '1.25rem', padding: '1.25rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10243A' }}>
                Reset Demonstration Records
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '0.2rem' }}>
                Restore all relief requests, warehouse inventories, affected areas, and volunteer rosters to their default baseline.
              </div>
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsResetModalOpen(true)}
              style={{ color: '#DC2626', borderColor: '#FCA5A5' }}
            >
              <RotateCcw size={15} />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        title="Reset Demo Dataset"
        message="Are you sure you want to restore the default sample dataset? Any newly created custom requests or inventory items will be replaced with standard demo records."
        confirmText="Yes, Restore Demo Data"
        confirmBtnClass="btn-danger"
      />
    </div>
  );
}

