/**
 * ============================================================================
 * ResQNet – Disaster Relief Resource Coordination Platform
 * Vanilla JavaScript Core Engine (script.js)
 * Clean, Modular, and Beginner-Friendly Academic Implementation
 * ============================================================================
 */

// ============================================================================
// 1. STORAGE KEYS & SEED DEMONSTRATION DATA
// ============================================================================

const STORAGE_KEYS = {
  DISASTERS: 'resqnet_disasters',
  REQUESTS: 'resqnet_requests',
  RESOURCES: 'resqnet_resources',
  VOLUNTEERS: 'resqnet_volunteers',
  ALLOCATIONS: 'resqnet_allocations',
  ACTIVITIES: 'resqnet_activities'
};

const INITIAL_DISASTERS = [
  {
    id: 'DIS-101',
    name: 'Assam Brahmaputra River Basin',
    district: 'Kamrup & Morigaon',
    state: 'Assam',
    type: 'Flood',
    severity: 'Critical',
    population: 45000,
    status: 'Active',
    assistance: 'Ready food rations, water purification kits, rescue speedboats, relief tents',
    date: '2026-11-01'
  },
  {
    id: 'DIS-102',
    name: 'Wayanad Meppadi Hill Ward',
    district: 'Wayanad',
    state: 'Kerala',
    type: 'Landslide',
    severity: 'Critical',
    population: 8500,
    status: 'Active',
    assistance: 'Search & rescue gear, drinking water, trauma emergency medical supplies',
    date: '2026-11-02'
  },
  {
    id: 'DIS-103',
    name: 'Cuddalore Coastal Belt',
    district: 'Cuddalore',
    state: 'Tamil Nadu',
    type: 'Cyclone',
    severity: 'High',
    population: 22000,
    status: 'Active',
    assistance: 'Thermal blankets, dry provisions, portable dewatering pumps',
    date: '2026-11-03'
  },
  {
    id: 'DIS-104',
    name: 'Chamoli Alaknanda Valley',
    district: 'Chamoli',
    state: 'Uttarakhand',
    type: 'Flood',
    severity: 'High',
    population: 6200,
    status: 'Active',
    assistance: 'Emergency antibiotics, warm blankets, solar emergency searchlights',
    date: '2026-11-02'
  },
  {
    id: 'DIS-105',
    name: 'Kutch Rann Border Villages',
    district: 'Kutch',
    state: 'Gujarat',
    type: 'Earthquake',
    severity: 'Medium',
    population: 14000,
    status: 'Monitoring',
    assistance: 'Weatherproof family shelter tents, potable water storage drums',
    date: '2026-10-30'
  },
  {
    id: 'DIS-106',
    name: 'Majuli River Island Camp',
    district: 'Majuli',
    state: 'Assam',
    type: 'Flood',
    severity: 'Critical',
    population: 18000,
    status: 'Active',
    assistance: 'High-protein baby food, emergency boat ambulances, halogen searchlights',
    date: '2026-11-03'
  }
];

const INITIAL_REQUESTS = [
  {
    id: 'REQ-1001',
    area: 'Assam Brahmaputra River Basin',
    resource: 'Ready-to-Eat Food Packets',
    quantity: 500,
    priority: 'Critical',
    status: 'Pending',
    contactPerson: 'Dr. Ananya Sharma',
    contactNumber: '9876543210',
    description: 'Urgent dry food packets required for 500 flood-displaced villagers in temporary embankment camp.',
    date: '2026-11-04'
  },
  {
    id: 'REQ-1002',
    area: 'Wayanad Meppadi Hill Ward',
    resource: 'Purified Drinking Water (1L)',
    quantity: 800,
    priority: 'High',
    status: 'Pending',
    contactPerson: 'Rajesh Nair',
    contactNumber: '9876543211',
    description: 'Piped water line damaged by mudslide runoff. Bottled water packets required urgently.',
    date: '2026-11-04'
  },
  {
    id: 'REQ-1003',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Emergency Medical Trauma Kits',
    quantity: 60,
    priority: 'Critical',
    status: 'In Progress',
    contactPerson: 'Sister Mary Thomas',
    contactNumber: '9876543212',
    description: 'Field medical post treating trauma injuries and hypothermia from flash flood.',
    date: '2026-11-03'
  },
  {
    id: 'REQ-1004',
    area: 'Cuddalore Coastal Belt',
    resource: 'Woolen Thermal Blankets',
    quantity: 350,
    priority: 'Medium',
    status: 'Completed',
    contactPerson: 'K. Saravanan',
    contactNumber: '9876543213',
    description: 'Coastal relief shelter housing fishermen families during cyclone storm surge.',
    date: '2026-11-03'
  },
  {
    id: 'REQ-1005',
    area: 'Kutch Rann Border Villages',
    resource: 'Weatherproof Family Shelter Tents',
    quantity: 40,
    priority: 'High',
    status: 'Pending',
    contactPerson: 'Mohammed Irfan',
    contactNumber: '9876543214',
    description: 'Mud huts collapsed after tremors; weatherproof temporary family tents needed.',
    date: '2026-11-02'
  },
  {
    id: 'REQ-1006',
    area: 'Majuli River Island Camp',
    resource: 'High-Protein Baby & Infant Food',
    quantity: 120,
    priority: 'Critical',
    status: 'Pending',
    contactPerson: 'Bikram Das',
    contactNumber: '9876543215',
    description: 'Nursing mothers and infants isolated in flood relief primary school.',
    date: '2026-11-04'
  },
  {
    id: 'REQ-1007',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Heavy Duty Rechargeable Flashlights',
    quantity: 90,
    priority: 'Low',
    status: 'Pending',
    contactPerson: 'Sunil Rawat',
    contactNumber: '9876543216',
    description: 'Power grid collapsed; searchlights needed for night security and search paths.',
    date: '2026-11-01'
  },
  {
    id: 'REQ-1008',
    area: 'Cuddalore Coastal Belt',
    resource: 'Waterproof Tarpaulins (12x18 ft)',
    quantity: 200,
    priority: 'Medium',
    status: 'Completed',
    contactPerson: 'Debasish Mohanty',
    contactNumber: '9876543217',
    description: 'Protecting community center roof from heavy cyclone rainfall.',
    date: '2026-11-02'
  }
];

const INITIAL_RESOURCES = [
  {
    id: 'RES-201',
    name: 'Ready-to-Eat Food Packets',
    category: 'Food',
    quantity: 1200,
    unit: 'packets',
    location: 'Warehouse Guwahati - Depot 4',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-202',
    name: 'Purified Drinking Water (1L)',
    category: 'Drinking Water',
    quantity: 2400,
    unit: 'bottles',
    location: 'Central Water Hub Kochi',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-203',
    name: 'Emergency Medical Trauma Kits',
    category: 'Medical Kits',
    quantity: 85,
    unit: 'kits',
    location: 'District Medical Store Dehradun',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-204',
    name: 'Broad Spectrum Antibiotics & Paracetamol',
    category: 'Medicines',
    quantity: 450,
    unit: 'strips',
    location: 'Medical Depot Chennai',
    lastUpdated: '2026-11-03'
  },
  {
    id: 'RES-205',
    name: 'Woolen Thermal Blankets',
    category: 'Blankets',
    quantity: 650,
    unit: 'pieces',
    location: 'Relief Depot Ahmedabad',
    lastUpdated: '2026-11-02'
  },
  {
    id: 'RES-206',
    name: 'Weatherproof Family Shelter Tents',
    category: 'Shelter Equipment',
    quantity: 45, // Low stock alert!
    unit: 'units',
    location: 'Disaster Base Camp Bhuj',
    lastUpdated: '2026-11-01'
  },
  {
    id: 'RES-207',
    name: 'High-Protein Baby & Infant Food',
    category: 'Food',
    quantity: 180,
    unit: 'packs',
    location: 'Child Relief Depot Jorhat',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-208',
    name: 'Heavy Duty Rechargeable Flashlights',
    category: 'Other Essentials',
    quantity: 140,
    unit: 'units',
    location: 'Hill Response Hub Rishikesh',
    lastUpdated: '2026-11-03'
  },
  {
    id: 'RES-209',
    name: 'Waterproof Tarpaulins (12x18 ft)',
    category: 'Shelter Equipment',
    quantity: 310,
    unit: 'sheets',
    location: 'Coastal Relief Store Bhubaneswar',
    lastUpdated: '2026-11-02'
  },
  {
    id: 'RES-210',
    name: 'Emergency Life Jackets (Adult/Child)',
    category: 'Other Essentials',
    quantity: 38, // Low stock alert!
    unit: 'units',
    location: 'River Rescue Point Alappuzha',
    lastUpdated: '2026-11-03'
  }
];

const INITIAL_VOLUNTEERS = [
  {
    id: 'VOL-301',
    name: 'Dr. Rohan Mehra',
    contact: '9823011221',
    task: 'Emergency Medical Triage & First Aid',
    area: 'Assam Brahmaputra River Basin',
    availability: 'Busy'
  },
  {
    id: 'VOL-302',
    name: 'Priya Swaminathan',
    contact: '9823011222',
    task: 'Warehouse Supply Chain & Logistics',
    area: 'None',
    availability: 'Available'
  },
  {
    id: 'VOL-303',
    name: 'Subhash Chandra',
    contact: '9823011223',
    task: 'Mountain Search & Medical Convoy Escort',
    area: 'Chamoli Alaknanda Valley',
    availability: 'Busy'
  },
  {
    id: 'VOL-304',
    name: 'Kavita Deshmukh',
    contact: '9823011224',
    task: 'Community Food Kitchen Management',
    area: 'None',
    availability: 'Available'
  },
  {
    id: 'VOL-305',
    name: 'Arjun Varma',
    contact: '9823011225',
    task: 'Heavy 4x4 Off-Road Transport Driver',
    area: 'Wayanad Meppadi Hill Ward',
    availability: 'Busy'
  },
  {
    id: 'VOL-306',
    name: 'Sneha Sen',
    contact: '9823011226',
    task: 'Nursing & Infant Medical Care',
    area: 'None',
    availability: 'Available'
  },
  {
    id: 'VOL-307',
    name: 'Amitav Roy',
    contact: '9823011227',
    task: 'Rescue Speedboat Pilot',
    area: 'None',
    availability: 'Unavailable'
  },
  {
    id: 'VOL-308',
    name: 'Harpreet Singh',
    contact: '9823011228',
    task: 'Satellite Radio & Field Communications',
    area: 'None',
    availability: 'Available'
  }
];

const INITIAL_ALLOCATIONS = [
  {
    id: 'ALC-401',
    requestId: 'REQ-1004',
    area: 'Cuddalore Coastal Belt',
    resource: 'Woolen Thermal Blankets',
    resourceId: 'RES-205',
    quantity: 350,
    volunteer: 'Priya Swaminathan',
    date: '2026-11-03',
    status: 'Completed',
    notes: 'Delivered directly to coastal storm shelter.'
  },
  {
    id: 'ALC-402',
    requestId: 'REQ-1003',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Emergency Medical Trauma Kits',
    resourceId: 'RES-203',
    quantity: 60,
    volunteer: 'Subhash Chandra',
    date: '2026-11-04',
    status: 'In Progress',
    notes: 'Transporting via medical convoy through mountain route.'
  },
  {
    id: 'ALC-403',
    requestId: 'REQ-1008',
    area: 'Cuddalore Coastal Belt',
    resource: 'Waterproof Tarpaulins (12x18 ft)',
    resourceId: 'RES-209',
    quantity: 200,
    volunteer: 'Arjun Varma',
    date: '2026-11-02',
    status: 'Completed',
    notes: 'Shelter roof sealed before storm.'
  }
];

const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-001',
    type: 'request',
    title: 'New Disaster Requisition Logged',
    desc: 'REQ-1001 for 500 Food Packets submitted from Assam Brahmaputra River Basin.',
    time: '2026-11-04 10:15'
  },
  {
    id: 'ACT-002',
    type: 'allocation',
    title: 'Supply Consignment Dispatched',
    desc: 'ALC-402: 60 Trauma Kits dispatched to Chamoli Valley under Subhash Chandra.',
    time: '2026-11-04 09:30'
  },
  {
    id: 'ACT-003',
    type: 'completion',
    title: 'Relief Operation Delivered',
    desc: 'ALC-401 completed. 350 Thermal Blankets distributed at Cuddalore.',
    time: '2026-11-03 16:45'
  },
  {
    id: 'ACT-004',
    type: 'disaster',
    title: 'Critical Incident Reported',
    desc: 'Wayanad Landslide Sector 3 registered with 8,500 affected citizens.',
    time: '2026-11-02 11:20'
  }
];

// ============================================================================
// 2. STORAGE ENGINE (LocalStorage Helpers)
// ============================================================================

function getData(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.error(`Storage read error for ${key}:`, err);
    return fallback;
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`Storage write error for ${key}:`, err);
    return false;
  }
}

function initStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.DISASTERS)) {
    saveData(STORAGE_KEYS.DISASTERS, INITIAL_DISASTERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    saveData(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    saveData(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
    saveData(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALLOCATIONS)) {
    saveData(STORAGE_KEYS.ALLOCATIONS, INITIAL_ALLOCATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    saveData(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
}

function resetAllData() {
  saveData(STORAGE_KEYS.DISASTERS, INITIAL_DISASTERS);
  saveData(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  saveData(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  saveData(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS);
  saveData(STORAGE_KEYS.ALLOCATIONS, INITIAL_ALLOCATIONS);
  saveData(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  logActivity('system', 'System Demo Data Reset', 'Platform restored to baseline academic demo records.');
}

function logActivity(type, title, desc) {
  const current = getData(STORAGE_KEYS.ACTIVITIES, []);
  const now = new Date();
  const timeStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
  const newAct = {
    id: 'ACT-' + Date.now().toString().slice(-4),
    type,
    title,
    desc,
    time: timeStr
  };
  current.unshift(newAct);
  saveData(STORAGE_KEYS.ACTIVITIES, current.slice(0, 40));
}

// Generate unique ID
function makeId(prefix, list) {
  let maxNum = 100;
  if (prefix === 'REQ') maxNum = 1000;
  if (prefix === 'RES') maxNum = 200;
  if (prefix === 'VOL') maxNum = 300;
  if (prefix === 'ALC') maxNum = 400;

  list.forEach(item => {
    if (item.id && item.id.startsWith(prefix + '-')) {
      const num = parseInt(item.id.split('-')[1], 10);
      if (!isNaN(num) && num > maxNum) maxNum = num;
    }
  });
  return `${prefix}-${maxNum + 1}`;
}

// ============================================================================
// 3. UI CONTROLS & NAVIGATION
// ============================================================================

const SECTION_TITLES = {
  'sec-dashboard': {
    title: '<i class="fa-solid fa-gauge-high" style="color:var(--teal-primary)"></i> Disaster Relief Command Dashboard',
    desc: 'Live operational overview of disaster incidents, resource stock, and volunteer deployment'
  },
  'sec-disasters': {
    title: '<i class="fa-solid fa-triangle-exclamation" style="color:var(--emergency-orange)"></i> Disaster Incident Reports',
    desc: 'Record and track affected emergency zones, disaster types, and required assistance'
  },
  'sec-requests': {
    title: '<i class="fa-solid fa-hand-holding-hand" style="color:var(--teal-primary)"></i> Relief Supply Requests',
    desc: 'Submit and monitor critical supply requests from on-ground field shelters'
  },
  'sec-inventory': {
    title: '<i class="fa-solid fa-boxes-stacked" style="color:var(--teal-primary)"></i> Resource Inventory & Logistics',
    desc: 'Monitor warehouse stocks, supply categories, and automated low-stock warnings'
  },
  'sec-volunteers': {
    title: '<i class="fa-solid fa-users" style="color:var(--teal-primary)"></i> Volunteer Personnel Registry',
    desc: 'Manage relief workforce, emergency skillsets, and field deployment assignments'
  },
  'sec-allocations': {
    title: '<i class="fa-solid fa-truck-fast" style="color:var(--emergency-orange)"></i> Resource Allocation Hub',
    desc: 'Safely allocate warehouse resources to verified requests without over-depleting stock'
  },
  'sec-reports': {
    title: '<i class="fa-solid fa-chart-column" style="color:var(--teal-primary)"></i> Operational Analytics & Reports',
    desc: 'Review summary charts and export verified data directly to CSV spreadsheets'
  },
  'sec-about': {
    title: '<i class="fa-solid fa-circle-info" style="color:var(--teal-primary)"></i> About ResQNet & Architecture',
    desc: 'Academic evaluation notes, viva reference guide, and demo data reset'
  }
};

function switchSection(targetId) {
  // Update nav link active classes
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-target') === targetId);
  });
  document.querySelectorAll('.android-nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-target') === targetId);
  });

  // Switch sections visibility
  document.querySelectorAll('.app-section').forEach(sec => {
    sec.classList.remove('active-section');
  });
  const activeSec = document.getElementById(targetId);
  if (activeSec) {
    activeSec.classList.add('active-section');
  }

  // Update header titles
  const meta = SECTION_TITLES[targetId] || SECTION_TITLES['sec-dashboard'];
  document.getElementById('pageTitle').innerHTML = meta.title;
  document.getElementById('pageSubtitle').textContent = meta.desc;

  // Close mobile sidebar if open
  toggleMobileSidebar(false);

  // Refresh tables and charts for that section
  renderCurrentSection(targetId);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebarCollapse() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
  const icon = document.getElementById('collapseIcon');
  if (sidebar.classList.contains('collapsed')) {
    icon.classList.remove('fa-chevron-left');
    icon.classList.add('fa-chevron-right');
  } else {
    icon.classList.remove('fa-chevron-right');
    icon.classList.add('fa-chevron-left');
  }
}

function toggleMobileSidebar(open) {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  if (open) {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('mobile-open');
  } else {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('mobile-open');
  }
}

function showToast(type, title, message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconClass = 'fa-solid fa-circle-check';
  if (type === 'error') iconClass = 'fa-solid fa-circle-xmark';
  if (type === 'warning') iconClass = 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <div class="toast-icon"><i class="${iconClass}"></i></div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Modal helper
function openModal(id) {
  document.getElementById(id).classList.add('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

// ============================================================================
// 4. DASHBOARD CALCULATIONS & RENDERING
// ============================================================================

function renderDashboard() {
  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const requests = getData(STORAGE_KEYS.REQUESTS, []);
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const volunteers = getData(STORAGE_KEYS.VOLUNTEERS, []);
  const allocations = getData(STORAGE_KEYS.ALLOCATIONS, []);
  const activities = getData(STORAGE_KEYS.ACTIVITIES, []);

  // 1. Total Disaster Reports & Active zones
  document.getElementById('statTotalDisasters').textContent = disasters.length;
  const activeZones = disasters.filter(d => d.status === 'Active').length;
  document.getElementById('statActiveAreasSubtext').textContent = `${activeZones} Active emergency zones`;

  // 2. Active Relief Requests
  const activeReqs = requests.filter(r => r.status !== 'Completed').length;
  const pendingReqs = requests.filter(r => r.status === 'Pending').length;
  document.getElementById('statActiveRequests').textContent = activeReqs;
  document.getElementById('statPendingRequestsSubtext').textContent = `${pendingReqs} pending review`;

  // Update sidebar badge
  const pendingBadge = document.getElementById('sidebarPendingBadge');
  if (pendingReqs > 0) {
    pendingBadge.style.display = 'inline-block';
    pendingBadge.textContent = pendingReqs;
  } else {
    pendingBadge.style.display = 'none';
  }

  // 3. Available Resources Units
  const totalUnits = resources.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
  document.getElementById('statAvailableResources').textContent = totalUnits.toLocaleString();

  // 4. Registered Volunteers & Busy
  document.getElementById('statTotalVolunteers').textContent = volunteers.length;
  const busyVolunteers = volunteers.filter(v => v.availability === 'Busy').length;
  document.getElementById('statActiveVolunteersSubtext').textContent = `${busyVolunteers} currently deployed`;

  // 5. Completed Operations
  const completedOps = allocations.filter(a => a.status === 'Completed').length;
  document.getElementById('statCompletedOps').textContent = completedOps;

  // Mini summary units
  const foodQty = resources.filter(r => r.category === 'Food').reduce((s, r) => s + Number(r.quantity), 0);
  const waterQty = resources.filter(r => r.category === 'Drinking Water').reduce((s, r) => s + Number(r.quantity), 0);
  const medQty = resources.filter(r => r.category === 'Medical Kits' || r.category === 'Medicines').reduce((s, r) => s + Number(r.quantity), 0);
  const blanketQty = resources.filter(r => r.category === 'Blankets').reduce((s, r) => s + Number(r.quantity), 0);
  const shelterQty = resources.filter(r => r.category === 'Shelter Equipment').reduce((s, r) => s + Number(r.quantity), 0);

  document.getElementById('dashFoodUnits').textContent = foodQty.toLocaleString();
  document.getElementById('dashWaterUnits').textContent = waterQty.toLocaleString();
  document.getElementById('dashMedicalUnits').textContent = medQty.toLocaleString();
  document.getElementById('dashBlanketUnits').textContent = blanketQty.toLocaleString();
  document.getElementById('dashShelterUnits').textContent = shelterQty.toLocaleString();

  // Priority Bars
  const totalReqCount = requests.length || 1;
  const critCount = requests.filter(r => r.priority === 'Critical').length;
  const highCount = requests.filter(r => r.priority === 'High').length;
  const medCount = requests.filter(r => r.priority === 'Medium').length;
  const lowCount = requests.filter(r => r.priority === 'Low').length;

  const priorityHtml = `
    <div class="progress-item">
      <div class="progress-item-label">
        <span style="color:#B91C1C; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.55rem; color:var(--emergency-red)"></i> Critical Priority</span>
        <strong>${critCount} (${Math.round((critCount/totalReqCount)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(critCount/totalReqCount)*100}%; background:var(--emergency-red);"></div></div>
    </div>
    <div class="progress-item" style="margin-top:0.75rem;">
      <div class="progress-item-label">
        <span style="color:#C2410C; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.55rem; color:var(--emergency-orange)"></i> High Priority</span>
        <strong>${highCount} (${Math.round((highCount/totalReqCount)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(highCount/totalReqCount)*100}%; background:var(--emergency-orange);"></div></div>
    </div>
    <div class="progress-item" style="margin-top:0.75rem;">
      <div class="progress-item-label">
        <span style="color:#A16207; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.55rem; color:var(--emergency-yellow)"></i> Medium Priority</span>
        <strong>${medCount} (${Math.round((medCount/totalReqCount)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(medCount/totalReqCount)*100}%; background:var(--emergency-yellow);"></div></div>
    </div>
    <div class="progress-item" style="margin-top:0.75rem;">
      <div class="progress-item-label">
        <span style="color:#047857; font-weight:700;"><i class="fa-solid fa-circle" style="font-size:0.55rem; color:var(--emergency-green)"></i> Low Priority</span>
        <strong>${lowCount} (${Math.round((lowCount/totalReqCount)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(lowCount/totalReqCount)*100}%; background:var(--emergency-green);"></div></div>
    </div>
  `;
  document.getElementById('priorityBarsContainer').innerHTML = priorityHtml;

  // Activity Feed
  const actContainer = document.getElementById('dashActivityList');
  if (activities.length === 0) {
    actContainer.innerHTML = '<p style="color:#64748B; font-size:0.8rem;">No incident activities logged.</p>';
  } else {
    actContainer.innerHTML = activities.slice(0, 5).map(act => {
      let iconColor = '#2563EB';
      let iconBg = '#EFF6FF';
      let icon = 'fa-bell';
      if (act.type === 'request') { iconColor = '#D97706'; iconBg = '#FEF3C7'; icon = 'fa-hand-holding-hand'; }
      if (act.type === 'allocation') { iconColor = '#0D9488'; iconBg = '#F0FDFA'; icon = 'fa-truck-fast'; }
      if (act.type === 'completion') { iconColor = '#10B981'; iconBg = '#ECFDF5'; icon = 'fa-circle-check'; }
      if (act.type === 'disaster') { iconColor = '#DC2626'; iconBg = '#FEE2E2'; icon = 'fa-triangle-exclamation'; }

      return `
        <div class="activity-feed-item">
          <div class="activity-badge-icon" style="background:${iconBg}; color:${iconColor};">
            <i class="fa-solid ${icon}"></i>
          </div>
          <div class="activity-content">
            <div class="activity-title">${act.title}</div>
            <div class="activity-desc">${act.desc}</div>
            <div class="activity-time"><i class="fa-regular fa-clock"></i> ${act.time}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Dashboard Recent Requests (Latest 5)
  const tbody = document.getElementById('dashRecentRequestsTbody');
  const latestRequests = requests.slice(0, 5);
  if (latestRequests.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center" style="padding:1.5rem; color:#64748B;">No relief requests recorded.</td></tr>';
  } else {
    tbody.innerHTML = latestRequests.map(r => `
      <tr>
        <td><span class="code-pill">${r.id}</span></td>
        <td><strong>${r.area}</strong></td>
        <td>${r.resource}</td>
        <td><strong>${r.quantity}</strong></td>
        <td>${renderBadge(r.priority, 'priority')}</td>
        <td>${renderBadge(r.status, 'status')}</td>
        <td>
          <button type="button" class="btn btn-secondary btn-sm" onclick="switchSection('sec-requests')">
            Manage
          </button>
        </td>
      </tr>
    `).join('');
  }
}

// Render Status and Priority badges helper
function renderBadge(val, type) {
  if (!val) return '';
  const norm = val.toLowerCase().replace(/\s+/g, '-');
  return `<span class="badge badge-${norm}"><span class="badge-dot"></span>${val}</span>`;
}

// ============================================================================
// 5. DISASTER INCIDENT REPORTS CRUD
// ============================================================================

function renderDisastersTable() {
  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const search = (document.getElementById('disasterSearchInput')?.value || '').toLowerCase();
  const typeFilter = document.getElementById('disasterTypeFilter')?.value || 'All';
  const severityFilter = document.getElementById('disasterSeverityFilter')?.value || 'All';

  const filtered = disasters.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(search) ||
      d.name.toLowerCase().includes(search) ||
      d.district.toLowerCase().includes(search) ||
      d.state.toLowerCase().includes(search);
    const matchType = typeFilter === 'All' || d.type === typeFilter;
    const matchSev = severityFilter === 'All' || d.severity === severityFilter;
    return matchSearch && matchType && matchSev;
  });

  const tbody = document.getElementById('disastersTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
            <div class="empty-state-title">No Disaster Records Found</div>
            <div class="empty-state-text">No reports match your search query or filter selection.</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(d => `
    <tr>
      <td><span class="code-pill">${d.id}</span></td>
      <td><strong>${d.name}</strong></td>
      <td>${d.district}, ${d.state}</td>
      <td><span style="font-weight:700; color:#0369A1; background:#E0F2FE; padding:2px 8px; border-radius:4px; font-size:0.75rem;">${d.type}</span></td>
      <td>${renderBadge(d.severity, 'priority')}</td>
      <td><strong>${Number(d.population).toLocaleString()}</strong></td>
      <td>${renderBadge(d.status === 'Active' ? 'Critical' : 'Low', 'priority')}</td>
      <td style="color:#64748B; font-size:0.78rem;">${d.date}</td>
      <td style="text-align:right;">
        <div class="table-actions" style="justify-content:flex-end;">
          <button type="button" class="btn btn-secondary btn-icon-only" title="Edit" onclick="editDisaster('${d.id}')">
            <i class="fa-solid fa-pen-to-square" style="color:#2563EB"></i>
          </button>
          <button type="button" class="btn btn-secondary btn-icon-only" title="Delete" onclick="deleteDisaster('${d.id}')">
            <i class="fa-solid fa-trash-can" style="color:#DC2626"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openDisasterModal(editId = null) {
  document.getElementById('disasterEditId').value = editId || '';
  document.getElementById('disasterForm').reset();

  if (editId) {
    const list = getData(STORAGE_KEYS.DISASTERS, []);
    const item = list.find(d => d.id === editId);
    if (item) {
      document.getElementById('disasterModalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Disaster: ${item.id}`;
      document.getElementById('disasterName').value = item.name;
      document.getElementById('disasterDistrict').value = item.district;
      document.getElementById('disasterState').value = item.state;
      document.getElementById('disasterType').value = item.type;
      document.getElementById('disasterSeverity').value = item.severity;
      document.getElementById('disasterPopulation').value = item.population;
      document.getElementById('disasterStatus').value = item.status;
      document.getElementById('disasterAssistance').value = item.assistance;
    }
  } else {
    document.getElementById('disasterModalTitle').innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color:var(--emergency-orange)"></i> Report Disaster Incident`;
  }
  openModal('disasterModal');
}

function handleDisasterSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('disasterEditId').value;
  const list = getData(STORAGE_KEYS.DISASTERS, []);

  const record = {
    name: document.getElementById('disasterName').value.trim(),
    district: document.getElementById('disasterDistrict').value.trim(),
    state: document.getElementById('disasterState').value.trim(),
    type: document.getElementById('disasterType').value,
    severity: document.getElementById('disasterSeverity').value,
    population: Number(document.getElementById('disasterPopulation').value) || 0,
    status: document.getElementById('disasterStatus').value,
    assistance: document.getElementById('disasterAssistance').value.trim(),
    date: new Date().toISOString().slice(0, 10)
  };

  if (editId) {
    const idx = list.findIndex(d => d.id === editId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...record };
      saveData(STORAGE_KEYS.DISASTERS, list);
      showToast('success', 'Incident Updated', `Disaster record ${editId} updated.`);
      logActivity('disaster', 'Disaster Record Modified', `${editId}: ${record.name} updated.`);
    }
  } else {
    const newId = makeId('DIS', list);
    list.unshift({ ...record, id: newId });
    saveData(STORAGE_KEYS.DISASTERS, list);
    showToast('success', 'Incident Logged', `New disaster record ${newId} recorded.`);
    logActivity('disaster', 'New Disaster Reported', `${newId}: ${record.name} (${record.type}, ${record.severity} Severity) added.`);
  }

  closeModal('disasterModal');
  renderDisastersTable();
  renderDashboard();
}

function editDisaster(id) {
  openDisasterModal(id);
}

function deleteDisaster(id) {
  openConfirmDialog(
    'Delete Disaster Record',
    `Are you sure you want to delete incident ${id}? All local data for this zone will be permanently removed.`,
    () => {
      let list = getData(STORAGE_KEYS.DISASTERS, []);
      list = list.filter(d => d.id !== id);
      saveData(STORAGE_KEYS.DISASTERS, list);
      showToast('success', 'Record Deleted', `Disaster incident ${id} removed.`);
      renderDisastersTable();
      renderDashboard();
    }
  );
}

// ============================================================================
// 6. RELIEF REQUESTS CRUD & STATUS UPDATES
// ============================================================================

function renderRequestsTable() {
  const requests = getData(STORAGE_KEYS.REQUESTS, []);
  const search = (document.getElementById('requestSearchInput')?.value || '').toLowerCase();
  const priorityFilter = document.getElementById('requestPriorityFilter')?.value || 'All';
  const statusFilter = document.getElementById('requestStatusFilter')?.value || 'All';

  const filtered = requests.filter(r => {
    const matchSearch = r.id.toLowerCase().includes(search) ||
      r.area.toLowerCase().includes(search) ||
      r.resource.toLowerCase().includes(search) ||
      r.contactPerson.toLowerCase().includes(search) ||
      r.contactNumber.includes(search);
    const matchPri = priorityFilter === 'All' || r.priority === priorityFilter;
    const matchStat = statusFilter === 'All' || r.status === statusFilter;
    return matchSearch && matchPri && matchStat;
  });

  const tbody = document.getElementById('requestsTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-hand-holding-hand"></i></div>
            <div class="empty-state-title">No Relief Requests Found</div>
            <div class="empty-state-text">No records match your filter criteria.</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td><span class="code-pill">${r.id}</span></td>
      <td><strong>${r.area}</strong></td>
      <td>${r.resource}</td>
      <td><strong>${r.quantity}</strong></td>
      <td>${renderBadge(r.priority, 'priority')}</td>
      <td>
        <select class="filter-select" style="font-size:0.75rem; padding:2px 6px;" onchange="updateRequestStatus('${r.id}', this.value)">
          <option value="Pending" ${r.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Completed" ${r.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>
        <div style="font-size:0.8rem; font-weight:700;">${r.contactPerson}</div>
        <div style="font-size:0.72rem; color:#64748B;"><i class="fa-solid fa-phone"></i> ${r.contactNumber}</div>
      </td>
      <td style="color:#64748B; font-size:0.76rem;">${r.date}</td>
      <td style="text-align:right;">
        <div class="table-actions" style="justify-content:flex-end;">
          <button type="button" class="btn btn-secondary btn-icon-only" title="Edit" onclick="editRequest('${r.id}')">
            <i class="fa-solid fa-pen-to-square" style="color:#2563EB"></i>
          </button>
          <button type="button" class="btn btn-secondary btn-icon-only" title="Delete" onclick="deleteRequest('${r.id}')">
            <i class="fa-solid fa-trash-can" style="color:#DC2626"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function updateRequestStatus(id, newStatus) {
  const list = getData(STORAGE_KEYS.REQUESTS, []);
  const idx = list.findIndex(r => r.id === id);
  if (idx !== -1) {
    list[idx].status = newStatus;
    saveData(STORAGE_KEYS.REQUESTS, list);
    showToast('success', 'Status Updated', `Request ${id} status changed to ${newStatus}.`);
    logActivity('request', 'Request Status Updated', `${id} marked as ${newStatus}.`);
    renderRequestsTable();
    renderDashboard();
  }
}

function openRequestModal(editId = null) {
  document.getElementById('requestEditId').value = editId || '';
  document.getElementById('requestForm').reset();

  // Populate Area Select from Disasters
  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const areaSelect = document.getElementById('requestAreaSelect');
  areaSelect.innerHTML = disasters.map(d => `<option value="${d.name}">${d.name} (${d.district}, ${d.state})</option>`).join('');

  // Populate Resource Select from Inventory
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const resSelect = document.getElementById('requestResourceSelect');
  resSelect.innerHTML = resources.map(r => `<option value="${r.name}">${r.name} (${r.category})</option>`).join('') +
    '<option value="Other Custom Essential">Other Custom Essential</option>';

  if (editId) {
    const list = getData(STORAGE_KEYS.REQUESTS, []);
    const item = list.find(r => r.id === editId);
    if (item) {
      document.getElementById('requestModalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Relief Request: ${item.id}`;
      document.getElementById('requestAreaSelect').value = item.area;
      document.getElementById('requestResourceSelect').value = item.resource;
      document.getElementById('requestQuantity').value = item.quantity;
      document.getElementById('requestPriority').value = item.priority;
      document.getElementById('requestStatus').value = item.status;
      document.getElementById('requestContactPerson').value = item.contactPerson;
      document.getElementById('requestContactNumber').value = item.contactNumber;
      document.getElementById('requestDescription').value = item.description || '';
    }
  } else {
    document.getElementById('requestModalTitle').innerHTML = `<i class="fa-solid fa-hand-holding-hand" style="color:var(--teal-primary)"></i> Create Relief Supply Request`;
  }

  openModal('requestModal');
}

function handleRequestSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('requestEditId').value;
  const list = getData(STORAGE_KEYS.REQUESTS, []);

  const phone = document.getElementById('requestContactNumber').value.trim();
  if (!/^\d{10}$/.test(phone)) {
    showToast('error', 'Validation Error', 'Please enter a valid 10-digit phone number.');
    return;
  }

  const record = {
    area: document.getElementById('requestAreaSelect').value,
    resource: document.getElementById('requestResourceSelect').value,
    quantity: Number(document.getElementById('requestQuantity').value) || 0,
    priority: document.getElementById('requestPriority').value,
    status: document.getElementById('requestStatus').value,
    contactPerson: document.getElementById('requestContactPerson').value.trim(),
    contactNumber: phone,
    description: document.getElementById('requestDescription').value.trim(),
    date: new Date().toISOString().slice(0, 10)
  };

  if (editId) {
    const idx = list.findIndex(r => r.id === editId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...record };
      saveData(STORAGE_KEYS.REQUESTS, list);
      showToast('success', 'Request Updated', `Request ${editId} updated.`);
      logActivity('request', 'Relief Request Modified', `${editId}: ${record.resource} for ${record.area}.`);
    }
  } else {
    const newId = makeId('REQ', list);
    list.unshift({ ...record, id: newId });
    saveData(STORAGE_KEYS.REQUESTS, list);
    showToast('success', 'Request Created', `New relief request ${newId} recorded.`);
    logActivity('request', 'New Request Registered', `${newId}: ${record.quantity} ${record.resource} for ${record.area}.`);
  }

  closeModal('requestModal');
  renderRequestsTable();
  renderDashboard();
}

function editRequest(id) {
  openRequestModal(id);
}

function deleteRequest(id) {
  openConfirmDialog(
    'Delete Relief Request',
    `Are you sure you want to delete relief request ${id}?`,
    () => {
      let list = getData(STORAGE_KEYS.REQUESTS, []);
      list = list.filter(r => r.id !== id);
      saveData(STORAGE_KEYS.REQUESTS, list);
      showToast('success', 'Request Removed', `Request ${id} deleted.`);
      renderRequestsTable();
      renderDashboard();
    }
  );
}

// ============================================================================
// 7. RESOURCE INVENTORY CRUD
// ============================================================================

function renderInventoryTable() {
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const search = (document.getElementById('inventorySearchInput')?.value || '').toLowerCase();
  const catFilter = document.getElementById('inventoryCategoryFilter')?.value || 'All';
  const stockFilter = document.getElementById('inventoryStockFilter')?.value || 'All';

  const filtered = resources.filter(res => {
    const matchSearch = res.id.toLowerCase().includes(search) ||
      res.name.toLowerCase().includes(search) ||
      res.location.toLowerCase().includes(search);
    const matchCat = catFilter === 'All' || res.category === catFilter;

    let matchStock = true;
    const q = Number(res.quantity) || 0;
    if (stockFilter === 'Low') matchStock = q < 50;
    if (stockFilter === 'Normal') matchStock = q >= 50;

    return matchSearch && matchCat && matchStock;
  });

  const tbody = document.getElementById('inventoryTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-boxes-stacked"></i></div>
            <div class="empty-state-title">No Inventory Items Found</div>
            <div class="empty-state-text">No resources match your search or category filter.</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(res => {
    const q = Number(res.quantity) || 0;
    const isLow = q < 50;

    return `
      <tr>
        <td><span class="code-pill">${res.id}</span></td>
        <td><strong>${res.name}</strong></td>
        <td><span style="font-size:0.75rem; font-weight:700; color:#475569; background:#F1F5F9; padding:2px 8px; border-radius:4px;">${res.category}</span></td>
        <td>
          <span style="font-size:1.05rem; font-weight:800; color:${isLow ? 'var(--emergency-red)' : 'var(--navy-dark)'};">
            ${q.toLocaleString()}
          </span>
          <span style="font-size:0.75rem; color:#64748B;"> ${res.unit}</span>
        </td>
        <td><i class="fa-solid fa-warehouse" style="color:var(--teal-primary)"></i> ${res.location}</td>
        <td>
          ${isLow
            ? '<span class="badge badge-critical"><span class="badge-dot"></span>Low Stock (&lt;50)</span>'
            : '<span class="badge badge-low"><span class="badge-dot"></span>Adequate Stock</span>'
          }
        </td>
        <td style="color:#64748B; font-size:0.76rem;">${res.lastUpdated}</td>
        <td style="text-align:right;">
          <div class="table-actions" style="justify-content:flex-end;">
            <button type="button" class="btn btn-secondary btn-icon-only" title="Edit" onclick="editResource('${res.id}')">
              <i class="fa-solid fa-pen-to-square" style="color:#2563EB"></i>
            </button>
            <button type="button" class="btn btn-secondary btn-icon-only" title="Delete" onclick="deleteResource('${res.id}')">
              <i class="fa-solid fa-trash-can" style="color:#DC2626"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openResourceModal(editId = null) {
  document.getElementById('resourceEditId').value = editId || '';
  document.getElementById('resourceForm').reset();

  if (editId) {
    const list = getData(STORAGE_KEYS.RESOURCES, []);
    const item = list.find(r => r.id === editId);
    if (item) {
      document.getElementById('resourceModalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Resource: ${item.id}`;
      document.getElementById('resourceName').value = item.name;
      document.getElementById('resourceCategory').value = item.category;
      document.getElementById('resourceUnit').value = item.unit;
      document.getElementById('resourceQuantity').value = item.quantity;
      document.getElementById('resourceLocation').value = item.location;
    }
  } else {
    document.getElementById('resourceModalTitle').innerHTML = `<i class="fa-solid fa-boxes-stacked" style="color:var(--teal-primary)"></i> Add Inventory Supply`;
  }
  openModal('resourceModal');
}

function handleResourceSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('resourceEditId').value;
  const list = getData(STORAGE_KEYS.RESOURCES, []);

  const record = {
    name: document.getElementById('resourceName').value.trim(),
    category: document.getElementById('resourceCategory').value,
    unit: document.getElementById('resourceUnit').value.trim(),
    quantity: Math.max(0, Number(document.getElementById('resourceQuantity').value) || 0),
    location: document.getElementById('resourceLocation').value.trim(),
    lastUpdated: new Date().toISOString().slice(0, 10)
  };

  if (editId) {
    const idx = list.findIndex(r => r.id === editId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...record };
      saveData(STORAGE_KEYS.RESOURCES, list);
      showToast('success', 'Supply Updated', `${record.name} updated.`);
      logActivity('inventory', 'Resource Stock Updated', `${editId}: ${record.name} set to ${record.quantity} ${record.unit}.`);
    }
  } else {
    const newId = makeId('RES', list);
    list.push({ ...record, id: newId });
    saveData(STORAGE_KEYS.RESOURCES, list);
    showToast('success', 'Supply Added', `${record.name} added to inventory.`);
    logActivity('inventory', 'New Resource Stock Added', `${newId}: ${record.name} (${record.quantity} ${record.unit}).`);
  }

  closeModal('resourceModal');
  renderInventoryTable();
  renderDashboard();
}

function editResource(id) {
  openResourceModal(id);
}

function deleteResource(id) {
  openConfirmDialog(
    'Delete Inventory Supply',
    `Are you sure you want to remove item ${id} from warehouse records?`,
    () => {
      let list = getData(STORAGE_KEYS.RESOURCES, []);
      list = list.filter(r => r.id !== id);
      saveData(STORAGE_KEYS.RESOURCES, list);
      showToast('success', 'Item Deleted', `Resource ${id} removed.`);
      renderInventoryTable();
      renderDashboard();
    }
  );
}

// ============================================================================
// 8. VOLUNTEER MANAGEMENT CRUD
// ============================================================================

function renderVolunteersTable() {
  const volunteers = getData(STORAGE_KEYS.VOLUNTEERS, []);
  const search = (document.getElementById('volunteerSearchInput')?.value || '').toLowerCase();
  const availFilter = document.getElementById('volunteerAvailabilityFilter')?.value || 'All';

  const filtered = volunteers.filter(v => {
    const matchSearch = v.id.toLowerCase().includes(search) ||
      v.name.toLowerCase().includes(search) ||
      v.contact.includes(search) ||
      v.task.toLowerCase().includes(search) ||
      v.area.toLowerCase().includes(search);
    const matchAvail = availFilter === 'All' || v.availability === availFilter;
    return matchSearch && matchAvail;
  });

  const tbody = document.getElementById('volunteersTableBody');
  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-users"></i></div>
            <div class="empty-state-title">No Volunteers Found</div>
            <div class="empty-state-text">No volunteer matches your search or availability filter.</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(v => `
    <tr>
      <td><span class="code-pill">${v.id}</span></td>
      <td><strong>${v.name}</strong></td>
      <td><i class="fa-solid fa-phone" style="color:var(--teal-primary)"></i> ${v.contact}</td>
      <td>${v.task}</td>
      <td>
        ${v.area && v.area !== 'None'
          ? `<span style="color:#C2410C; font-weight:700;"><i class="fa-solid fa-location-dot"></i> ${v.area}</span>`
          : '<span style="color:#94A3B8;">Unassigned</span>'
        }
      </td>
      <td>${renderBadge(v.availability, 'status')}</td>
      <td style="text-align:right;">
        <div class="table-actions" style="justify-content:flex-end;">
          ${v.availability === 'Busy'
            ? `<button type="button" class="btn btn-secondary btn-sm" style="color:#059669; border-color:#A7F3D0;" title="Release Volunteer" onclick="freeUpVolunteer('${v.id}')"><i class="fa-solid fa-circle-check"></i> Free Up</button>`
            : `<button type="button" class="btn btn-primary btn-sm" title="Deploy" onclick="deployVolunteerPrompt('${v.id}')"><i class="fa-solid fa-paper-plane"></i> Deploy</button>`
          }
          <button type="button" class="btn btn-secondary btn-icon-only" title="Edit" onclick="editVolunteer('${v.id}')">
            <i class="fa-solid fa-pen-to-square" style="color:#2563EB"></i>
          </button>
          <button type="button" class="btn btn-secondary btn-icon-only" title="Delete" onclick="deleteVolunteer('${v.id}')">
            <i class="fa-solid fa-trash-can" style="color:#DC2626"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function freeUpVolunteer(id) {
  const list = getData(STORAGE_KEYS.VOLUNTEERS, []);
  const idx = list.findIndex(v => v.id === id);
  if (idx !== -1) {
    list[idx].availability = 'Available';
    list[idx].area = 'None';
    saveData(STORAGE_KEYS.VOLUNTEERS, list);
    showToast('success', 'Volunteer Released', `${list[idx].name} is now Available.`);
    logActivity('volunteer', 'Volunteer Available', `${list[idx].name} completed field duty.`);
    renderVolunteersTable();
    renderDashboard();
  }
}

function deployVolunteerPrompt(id) {
  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  if (disasters.length === 0) {
    showToast('warning', 'Notice', 'No active disaster zones available to assign.');
    return;
  }
  const areaName = prompt('Enter target zone to deploy volunteer (e.g. ' + disasters[0].name + '):', disasters[0].name);
  if (areaName && areaName.trim()) {
    const list = getData(STORAGE_KEYS.VOLUNTEERS, []);
    const idx = list.findIndex(v => v.id === id);
    if (idx !== -1) {
      list[idx].availability = 'Busy';
      list[idx].area = areaName.trim();
      saveData(STORAGE_KEYS.VOLUNTEERS, list);
      showToast('success', 'Volunteer Deployed', `${list[idx].name} deployed to ${areaName}.`);
      logActivity('volunteer', 'Volunteer Deployed', `${list[idx].name} assigned to ${areaName}.`);
      renderVolunteersTable();
      renderDashboard();
    }
  }
}

function openVolunteerModal(editId = null) {
  document.getElementById('volunteerEditId').value = editId || '';
  document.getElementById('volunteerForm').reset();

  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const areaSelect = document.getElementById('volunteerAreaSelect');
  areaSelect.innerHTML = '<option value="None">None (Unassigned)</option>' +
    disasters.map(d => `<option value="${d.name}">${d.name}</option>`).join('');

  if (editId) {
    const list = getData(STORAGE_KEYS.VOLUNTEERS, []);
    const item = list.find(v => v.id === editId);
    if (item) {
      document.getElementById('volunteerModalTitle').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Volunteer: ${item.id}`;
      document.getElementById('volunteerName').value = item.name;
      document.getElementById('volunteerContact').value = item.contact;
      document.getElementById('volunteerAvailability').value = item.availability;
      document.getElementById('volunteerTask').value = item.task;
      document.getElementById('volunteerAreaSelect').value = item.area;
    }
  } else {
    document.getElementById('volunteerModalTitle').innerHTML = `<i class="fa-solid fa-user-plus" style="color:var(--teal-primary)"></i> Register Emergency Volunteer`;
  }
  openModal('volunteerModal');
}

function handleVolunteerSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('volunteerEditId').value;
  const list = getData(STORAGE_KEYS.VOLUNTEERS, []);

  const phone = document.getElementById('volunteerContact').value.trim();
  if (!/^\d{10}$/.test(phone)) {
    showToast('error', 'Validation Error', 'Please enter a valid 10-digit phone number.');
    return;
  }

  const record = {
    name: document.getElementById('volunteerName').value.trim(),
    contact: phone,
    availability: document.getElementById('volunteerAvailability').value,
    task: document.getElementById('volunteerTask').value.trim(),
    area: document.getElementById('volunteerAreaSelect').value
  };

  if (editId) {
    const idx = list.findIndex(v => v.id === editId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...record };
      saveData(STORAGE_KEYS.VOLUNTEERS, list);
      showToast('success', 'Volunteer Updated', `${record.name} record updated.`);
      logActivity('volunteer', 'Volunteer Profile Updated', `${editId}: ${record.name}.`);
    }
  } else {
    const newId = makeId('VOL', list);
    list.push({ ...record, id: newId });
    saveData(STORAGE_KEYS.VOLUNTEERS, list);
    showToast('success', 'Volunteer Registered', `${record.name} added to roster.`);
    logActivity('volunteer', 'New Volunteer Enrolled', `${newId}: ${record.name} (${record.task}).`);
  }

  closeModal('volunteerModal');
  renderVolunteersTable();
  renderDashboard();
}

function editVolunteer(id) {
  openVolunteerModal(id);
}

function deleteVolunteer(id) {
  openConfirmDialog(
    'Delete Volunteer Record',
    `Are you sure you want to remove volunteer ${id}?`,
    () => {
      let list = getData(STORAGE_KEYS.VOLUNTEERS, []);
      list = list.filter(v => v.id !== id);
      saveData(STORAGE_KEYS.VOLUNTEERS, list);
      showToast('success', 'Volunteer Removed', `Volunteer ${id} deleted.`);
      renderVolunteersTable();
      renderDashboard();
    }
  );
}

// ============================================================================
// 9. RESOURCE ALLOCATION HUB (Strict Inventory Deductions)
// ============================================================================

function renderAllocationsTable() {
  const allocations = getData(STORAGE_KEYS.ALLOCATIONS, []);
  const tbody = document.getElementById('allocationsTableBody');

  if (allocations.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9">
          <div class="empty-state">
            <div class="empty-state-icon"><i class="fa-solid fa-truck-fast"></i></div>
            <div class="empty-state-title">No Allocation Dispatches Recorded</div>
            <div class="empty-state-text">Execute a supply allocation to dispatch materials to camps.</div>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = allocations.map(a => `
    <tr>
      <td><span class="code-pill">${a.id}</span></td>
      <td><span style="font-weight:700; color:#2563EB;">${a.requestId || 'Direct'}</span></td>
      <td><strong>${a.area}</strong></td>
      <td>${a.resource}</td>
      <td><strong>${a.quantity}</strong></td>
      <td><i class="fa-solid fa-user-check" style="color:var(--teal-primary)"></i> ${a.volunteer || 'Logistics'}</td>
      <td style="color:#64748B; font-size:0.76rem;">${a.date}</td>
      <td>${renderBadge(a.status, 'status')}</td>
      <td style="text-align:right;">
        ${a.status === 'In Progress'
          ? `<button type="button" class="btn btn-primary btn-sm" onclick="completeAllocation('${a.id}')"><i class="fa-solid fa-circle-check"></i> Mark Delivered</button>`
          : '<span style="color:#10B981; font-weight:700; font-size:0.75rem;"><i class="fa-solid fa-check"></i> Delivered</span>'
        }
      </td>
    </tr>
  `).join('');
}

function openAllocationModal() {
  const requests = getData(STORAGE_KEYS.REQUESTS, []).filter(r => r.status !== 'Completed');
  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const volunteers = getData(STORAGE_KEYS.VOLUNTEERS, []).filter(v => v.availability === 'Available');

  // Requests dropdown
  const reqSelect = document.getElementById('allocRequestSelect');
  reqSelect.innerHTML = '<option value="">-- Choose Relief Request --</option>' +
    requests.map(r => `<option value="${r.id}">${r.id}: ${r.area} (${r.quantity} ${r.resource}) - ${r.priority} Priority</option>`).join('');

  // Areas dropdown
  const areaSelect = document.getElementById('allocAreaSelect');
  areaSelect.innerHTML = disasters.map(d => `<option value="${d.name}">${d.name}</option>`).join('');

  // Resources dropdown
  const resSelect = document.getElementById('allocResourceSelect');
  resSelect.innerHTML = '<option value="">-- Choose Inventory Item --</option>' +
    resources.map(r => `<option value="${r.id}">${r.name} (${r.quantity} ${r.unit} available)</option>`).join('');

  // Volunteers dropdown
  const volSelect = document.getElementById('allocVolunteerSelect');
  volSelect.innerHTML = '<option value="">-- General Logistics Team --</option>' +
    volunteers.map(v => `<option value="${v.id}">${v.name} (${v.task})</option>`).join('');

  document.getElementById('allocQuantity').value = '';
  document.getElementById('allocNotes').value = '';
  document.getElementById('allocStockBanner').style.display = 'none';

  openModal('allocationModal');
}

function onAllocRequestChosen() {
  const reqId = document.getElementById('allocRequestSelect').value;
  if (!reqId) return;

  const requests = getData(STORAGE_KEYS.REQUESTS, []);
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  // Pre-fill target area
  document.getElementById('allocAreaSelect').value = req.area;
  document.getElementById('allocQuantity').value = req.quantity;

  // Try auto-matching resource
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const matchRes = resources.find(r => r.name.toLowerCase() === req.resource.toLowerCase());
  if (matchRes) {
    document.getElementById('allocResourceSelect').value = matchRes.id;
    updateAllocStockDisplay();
  }
}

function updateAllocStockDisplay() {
  const resId = document.getElementById('allocResourceSelect').value;
  const banner = document.getElementById('allocStockBanner');
  const valSpan = document.getElementById('allocStockValue');

  if (!resId) {
    banner.style.display = 'none';
    return;
  }

  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const res = resources.find(r => r.id === resId);
  if (res) {
    banner.style.display = 'flex';
    valSpan.textContent = `${res.quantity} ${res.unit}`;
    if (res.quantity < 50) {
      valSpan.style.color = 'var(--emergency-red)';
    } else {
      valSpan.style.color = 'var(--teal-primary)';
    }
  }
}

function handleAllocationSubmit(e) {
  e.preventDefault();

  const reqId = document.getElementById('allocRequestSelect').value;
  const area = document.getElementById('allocAreaSelect').value;
  const resourceId = document.getElementById('allocResourceSelect').value;
  const qtyToAlloc = Number(document.getElementById('allocQuantity').value);
  const volunteerId = document.getElementById('allocVolunteerSelect').value;
  const notes = document.getElementById('allocNotes').value.trim();

  if (isNaN(qtyToAlloc) || qtyToAlloc <= 0) {
    showToast('error', 'Validation Error', 'Dispatch quantity must be a positive number.');
    return;
  }

  // Check inventory stock
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const resIndex = resources.findIndex(r => r.id === resourceId);
  if (resIndex === -1) {
    showToast('error', 'Error', 'Please select a valid inventory resource.');
    return;
  }

  const selectedRes = resources[resIndex];
  if (selectedRes.quantity < qtyToAlloc) {
    showToast('error', 'Stock Exhausted!', `Insufficient stock! Only ${selectedRes.quantity} ${selectedRes.unit} of ${selectedRes.name} available.`);
    return;
  }

  // 1. Deduct Inventory (never negative)
  selectedRes.quantity = Math.max(0, selectedRes.quantity - qtyToAlloc);
  selectedRes.lastUpdated = new Date().toISOString().slice(0, 10);
  saveData(STORAGE_KEYS.RESOURCES, resources);

  // 2. Update Request Status to In Progress
  let requestObj = null;
  if (reqId) {
    const requests = getData(STORAGE_KEYS.REQUESTS, []);
    const reqIndex = requests.findIndex(r => r.id === reqId);
    if (reqIndex !== -1) {
      requests[reqIndex].status = 'In Progress';
      saveData(STORAGE_KEYS.REQUESTS, requests);
      requestObj = requests[reqIndex];
    }
  }

  // 3. Update Volunteer to Busy
  let volunteerName = 'General Logistics Team';
  if (volunteerId) {
    const volunteers = getData(STORAGE_KEYS.VOLUNTEERS, []);
    const volIndex = volunteers.findIndex(v => v.id === volunteerId);
    if (volIndex !== -1) {
      volunteers[volIndex].availability = 'Busy';
      volunteers[volIndex].area = area;
      saveData(STORAGE_KEYS.VOLUNTEERS, volunteers);
      volunteerName = volunteers[volIndex].name;
    }
  }

  // 4. Create Allocation Record
  const allocations = getData(STORAGE_KEYS.ALLOCATIONS, []);
  const newAllocId = makeId('ALC', allocations);
  const newRecord = {
    id: newAllocId,
    requestId: reqId || 'Direct Dispatch',
    area: area,
    resource: selectedRes.name,
    resourceId: selectedRes.id,
    quantity: qtyToAlloc,
    volunteer: volunteerName,
    date: new Date().toISOString().slice(0, 10),
    status: 'In Progress',
    notes: notes || 'Dispatched from central command hub.'
  };

  allocations.unshift(newRecord);
  saveData(STORAGE_KEYS.ALLOCATIONS, allocations);

  // 5. Activity Log
  logActivity('allocation', 'Resource Consignment Dispatched', `${newAllocId}: ${qtyToAlloc} ${selectedRes.unit} of ${selectedRes.name} to ${area}. Assigned: ${volunteerName}.`);

  showToast('success', 'Supplies Dispatched!', `Allocation ${newAllocId} confirmed. Inventory deducted.`);
  closeModal('allocationModal');
  renderAllocationsTable();
  renderDashboard();
}

function completeAllocation(allocId) {
  const allocations = getData(STORAGE_KEYS.ALLOCATIONS, []);
  const idx = allocations.findIndex(a => a.id === allocId);
  if (idx === -1) return;

  allocations[idx].status = 'Completed';
  const alloc = allocations[idx];
  saveData(STORAGE_KEYS.ALLOCATIONS, allocations);

  // Update Request to Completed
  if (alloc.requestId && alloc.requestId.startsWith('REQ-')) {
    const requests = getData(STORAGE_KEYS.REQUESTS, []);
    const reqIdx = requests.findIndex(r => r.id === alloc.requestId);
    if (reqIdx !== -1) {
      requests[reqIdx].status = 'Completed';
      saveData(STORAGE_KEYS.REQUESTS, requests);
    }
  }

  // Free Volunteer
  if (alloc.volunteer && alloc.volunteer !== 'General Logistics Team') {
    const volunteers = getData(STORAGE_KEYS.VOLUNTEERS, []);
    const volIdx = volunteers.findIndex(v => v.name === alloc.volunteer);
    if (volIdx !== -1) {
      volunteers[volIdx].availability = 'Available';
      volunteers[volIdx].area = 'None';
      saveData(STORAGE_KEYS.VOLUNTEERS, volunteers);
    }
  }

  logActivity('completion', 'Consignment Verified Delivered', `Allocation ${allocId} marked Delivered. Relief verified on-ground.`);
  showToast('success', 'Operation Completed', `Consignment ${allocId} verified delivered.`);
  renderAllocationsTable();
  renderDashboard();
}

// ============================================================================
// 10. REPORTS & CSV EXPORT
// ============================================================================

function renderReports() {
  const resources = getData(STORAGE_KEYS.RESOURCES, []);
  const requests = getData(STORAGE_KEYS.REQUESTS, []);

  // Category bars
  const categories = ['Food', 'Drinking Water', 'Medicines', 'Medical Kits', 'Blankets', 'Shelter Equipment', 'Other Essentials'];
  const catTotals = categories.map(c => {
    const total = resources.filter(r => r.category === c).reduce((sum, r) => sum + Number(r.quantity), 0);
    return { category: c, total };
  });

  const maxTotal = Math.max(...catTotals.map(c => c.total), 1);
  const catContainer = document.getElementById('reportsCategoryBars');
  catContainer.innerHTML = catTotals.map(c => {
    const pct = Math.max(4, Math.round((c.total / maxTotal) * 100));
    return `
      <div class="progress-item">
        <div class="progress-item-label">
          <strong>${c.category}</strong>
          <span style="color:var(--teal-primary); font-weight:700;">${c.total.toLocaleString()} units</span>
        </div>
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%; background:var(--teal-primary);"></div></div>
      </div>
    `;
  }).join('');

  // Status bars
  const totalR = requests.length || 1;
  const pend = requests.filter(r => r.status === 'Pending').length;
  const prog = requests.filter(r => r.status === 'In Progress').length;
  const comp = requests.filter(r => r.status === 'Completed').length;

  const statusContainer = document.getElementById('reportsStatusBars');
  statusContainer.innerHTML = `
    <div class="progress-item">
      <div class="progress-item-label">
        <span style="color:#B45309; font-weight:700;"><i class="fa-solid fa-clock"></i> Pending Requisitions</span>
        <strong>${pend} (${Math.round((pend/totalR)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(pend/totalR)*100}%; background:#F59E0B;"></div></div>
    </div>
    <div class="progress-item" style="margin-top:0.75rem;">
      <div class="progress-item-label">
        <span style="color:#1D4ED8; font-weight:700;"><i class="fa-solid fa-truck-fast"></i> In Progress (In Transit)</span>
        <strong>${prog} (${Math.round((prog/totalR)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(prog/totalR)*100}%; background:#2563EB;"></div></div>
    </div>
    <div class="progress-item" style="margin-top:0.75rem;">
      <div class="progress-item-label">
        <span style="color:#047857; font-weight:700;"><i class="fa-solid fa-circle-check"></i> Completed Deliveries</span>
        <strong>${comp} (${Math.round((comp/totalR)*100)}%)</strong>
      </div>
      <div class="progress-track"><div class="progress-fill" style="width:${(comp/totalR)*100}%; background:#10B981;"></div></div>
    </div>
  `;
}

// Native CSV Generator
function downloadCSV(filename, data) {
  if (!data || data.length === 0) {
    showToast('warning', 'Notice', 'No data records available to export.');
    return;
  }
  const headers = Object.keys(data[0]);
  const rows = [];
  rows.push(headers.map(h => `"${h}"`).join(','));

  data.forEach(item => {
    const row = headers.map(h => {
      let val = item[h] !== undefined && item[h] !== null ? String(item[h]) : '';
      val = val.replace(/"/g, '""');
      return `"${val}"`;
    });
    rows.push(row.join(','));
  });

  const csvString = rows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('success', 'CSV Exported', `Downloaded ${filename}.csv.`);
}

function exportRequestsToCSV() {
  const list = getData(STORAGE_KEYS.REQUESTS, []);
  downloadCSV('ResQNet_Relief_Requests', list);
}

function exportInventoryToCSV() {
  const list = getData(STORAGE_KEYS.RESOURCES, []);
  downloadCSV('ResQNet_Resource_Inventory', list);
}

// ============================================================================
// 11. CONFIRMATION MODAL & SYSTEM CONTROLS
// ============================================================================

let currentConfirmCallback = null;

function openConfirmDialog(title, message, onConfirm) {
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  currentConfirmCallback = onConfirm;
  openModal('confirmModal');
}

document.getElementById('confirmActionBtn')?.addEventListener('click', () => {
  if (currentConfirmCallback) {
    currentConfirmCallback();
    currentConfirmCallback = null;
  }
  closeModal('confirmModal');
});

function confirmResetDemoData() {
  openConfirmDialog(
    'Reset Demonstration Data',
    'Are you sure you want to restore default sample records? Any newly created disaster reports, requests, or stock updates will be replaced with clean baseline data for viva presentation.',
    () => {
      resetAllData();
      showToast('success', 'Reset Complete', 'Default demo records restored.');
      renderAll();
    }
  );
}

// ============================================================================
// 12. RENDER CONTROLLER & INITIALIZATION
// ============================================================================

function renderCurrentSection(secId) {
  if (secId === 'sec-dashboard') renderDashboard();
  if (secId === 'sec-disasters') renderDisastersTable();
  if (secId === 'sec-requests') renderRequestsTable();
  if (secId === 'sec-inventory') renderInventoryTable();
  if (secId === 'sec-volunteers') renderVolunteersTable();
  if (secId === 'sec-allocations') renderAllocationsTable();
  if (secId === 'sec-reports') renderReports();
}

function renderAll() {
  renderDashboard();
  renderDisastersTable();
  renderRequestsTable();
  renderInventoryTable();
  renderVolunteersTable();
  renderAllocationsTable();
  renderReports();
  renderCampHelplines();
}

// ============================================================================
// 13. EMERGENCY HELPLINE DIRECTORY & CAMP SOS CONTROLLER
// ============================================================================

function openEmergencyHelplineModal() {
  renderCampHelplines();
  openModal('helplineModal');
}

function renderCampHelplines() {
  const container = document.getElementById('campHelplinesContainer');
  if (!container) return;

  const disasters = getData(STORAGE_KEYS.DISASTERS, []);
  const activeDisasters = disasters.filter(d => d.status === 'Active');

  if (activeDisasters.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:1.5rem; background:#F8FAFC; border:1px dashed #CBD5E1; border-radius:8px; font-size:0.8rem; color:#64748B;">
        <i class="fa-solid fa-circle-check" style="color:#10B981; font-size:1.2rem; margin-bottom:0.4rem; display:block;"></i>
        All disaster zones currently marked as Resolved or Monitoring. No active critical relief camps required at this moment.
      </div>
    `;
    return;
  }

  // Pre-configured official emergency field camp coordinators for active zones
  const sampleOfficers = [
    { name: 'Dr. Ananya Sharma', phone: '+91 98765 43210', role: 'Camp Relief Lead' },
    { name: 'Officer Rajesh Nair', phone: '+91 98765 43211', role: 'Field Incident Commander' },
    { name: 'Sister Mary Thomas', phone: '+91 98765 43212', role: 'Emergency Triage Lead' },
    { name: 'K. Saravanan', phone: '+91 98765 43213', role: 'Logistics Liaison Officer' },
    { name: 'Capt. Vikram Patel', phone: '+91 98765 43214', role: 'Evacuation Squad Head' },
    { name: 'Sunil Barman', phone: '+91 98765 43215', role: 'Island Camp Coordinator' }
  ];

  container.innerHTML = activeDisasters.map((d, index) => {
    const officer = sampleOfficers[index % sampleOfficers.length];
    const cleanPhone = officer.phone.replace(/[^0-9]/g, '');

    return `
      <div class="camp-helpline-card">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.25rem;">
            <span class="camp-card-zone">${escapeHTML(d.name)}</span>
            <span class="badge ${d.severity === 'Critical' ? 'badge-critical' : 'badge-high'}" style="font-size:0.62rem; padding:0.1rem 0.4rem;">${d.severity}</span>
          </div>
          <div class="camp-card-loc">
            <i class="fa-solid fa-location-dot" style="color:var(--emergency-red); margin-right:3px;"></i>
            ${escapeHTML(d.district)}, ${escapeHTML(d.state)}
          </div>
          <div class="camp-card-officer" style="margin-top:0.4rem;">
            <i class="fa-solid fa-user-shield" style="color:var(--teal-primary)"></i>
            <strong>${escapeHTML(officer.name)}</strong>
            <span style="font-size:0.68rem; color:#64748B;">(${officer.role})</span>
          </div>
        </div>
        <div class="camp-card-footer">
          <a href="tel:${cleanPhone}" class="camp-phone-link" title="Call Field Camp In-Charge">
            <i class="fa-solid fa-phone"></i>
            <span>${officer.phone}</span>
          </a>
          <button type="button" class="btn btn-copy-helpline" style="padding:0.25rem 0.55rem; font-size:0.7rem;" onclick="copyHelplineNumber('${cleanPhone}', '${escapeHTML(d.name)} Camp')">
            <i class="fa-regular fa-copy"></i> Copy
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function copyHelplineNumber(number, serviceName) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(number).then(() => {
      showToast('info', 'Helpline Copied', `${serviceName} (${number}) copied to clipboard.`);
    }).catch(() => {
      fallbackCopy(number, serviceName);
    });
  } else {
    fallbackCopy(number, serviceName);
  }
}

function fallbackCopy(number, serviceName) {
  const tempInput = document.createElement('input');
  tempInput.value = number;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  showToast('info', 'Helpline Copied', `${serviceName} (${number}) copied to clipboard.`);
}

function triggerAndroidSOSShare() {
  const portalUrl = window.location.href;
  const distressText = `🚨 [ResQNet EMERGENCY SOS DISASTER BROADCAST]\nImmediate disaster relief coordination activated.\n\n📞 24x7 Official Helplines:\n• National Emergency: 112\n• NDMA Disaster Helpline: 1078\n• Emergency Ambulance: 108\n• State EOC Control: 1070\n\nAccess Live ResQNet Disaster Command Portal:\n${portalUrl}`;

  if (navigator.share) {
    navigator.share({
      title: 'ResQNet – Disaster Emergency SOS Broadcast',
      text: distressText,
      url: portalUrl
    }).then(() => {
      showToast('success', 'SOS Broadcast Shared', 'Distress details shared successfully.');
    }).catch((err) => {
      if (err.name !== 'AbortError') {
        copyHelplineNumber('112', 'SOS Distress Alert Details');
      }
    });
  } else {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(distressText).then(() => {
        showToast('info', 'SOS Alert Copied', 'Full distress bulletin copied to clipboard. Ready to paste in WhatsApp/SMS.');
      });
    } else {
      copyHelplineNumber('112', 'National Emergency 112');
    }
  }
}

// DOMContentLoaded Entrypoint
document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  renderAll();

  // Close modals when clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Close modals on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        modal.classList.remove('active');
      });
    }
  });

  console.log('✓ ResQNet Emergency Operations System (Vanilla JS) initialized.');
});

