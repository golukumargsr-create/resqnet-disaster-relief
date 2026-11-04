/**
 * ResQNet - Disaster Relief Coordination Platform
 * utils/storage.js
 * 
 * Simple, robust localStorage management for disaster relief records.
 * All functions are written in clear, beginner-friendly JavaScript
 * suitable for explanation during viva examinations.
 */

// LocalStorage Keys as per project requirements
export const STORAGE_KEYS = {
  REQUESTS: 'resqnet_requests',
  RESOURCES: 'resqnet_resources',
  AREAS: 'resqnet_areas',
  VOLUNTEERS: 'resqnet_volunteers',
  ALLOCATIONS: 'resqnet_allocations',
  ACTIVITIES: 'resqnet_activities',
  AUTH: 'resqnet_user'
};

// ==========================================
// SAMPLE INITIAL DEMO DATA
// Realistic fictional disaster relief data
// ==========================================

export const INITIAL_REQUESTS = [
  {
    id: 'REQ-1001',
    area: 'Assam Brahmaputra River Basin',
    resource: 'Ready-to-Eat Food Packets',
    quantity: 500,
    priority: 'Critical',
    date: '2026-11-04',
    contactPerson: 'Dr. Ananya Sharma',
    contactNumber: '9876543210',
    description: 'Urgent dry rations and ready food required for 500 flood-displaced villagers in temporary embankment camp.',
    status: 'Pending'
  },
  {
    id: 'REQ-1002',
    area: 'Wayanad Meppadi Hill Ward',
    resource: 'Purified Drinking Water (1L)',
    quantity: 800,
    priority: 'High',
    date: '2026-11-04',
    contactPerson: 'Rajesh Nair',
    contactNumber: '9876543211',
    description: 'Local piped water supply contaminated by mudslide runoff. Clean drinking water packets required immediately.',
    status: 'Approved'
  },
  {
    id: 'REQ-1003',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Emergency Medical Trauma Kits',
    quantity: 60,
    priority: 'Critical',
    date: '2026-11-03',
    contactPerson: 'Sister Mary Thomas',
    contactNumber: '9876543212',
    description: 'Field medical post treating hypothermia and trauma injuries from sudden flash flooding.',
    status: 'In Progress'
  },
  {
    id: 'REQ-1004',
    area: 'Cuddalore Coastal Belt',
    resource: 'Woolen Thermal Blankets',
    quantity: 350,
    priority: 'Medium',
    date: '2026-11-03',
    contactPerson: 'K. Saravanan',
    contactNumber: '9876543213',
    description: 'Coastal relief shelter housing fishermen families during cyclone storm surge.',
    status: 'Completed'
  },
  {
    id: 'REQ-1005',
    area: 'Kutch Rann Border Villages',
    resource: 'Weatherproof Family Shelter Tents',
    quantity: 40,
    priority: 'High',
    date: '2026-11-02',
    contactPerson: 'Mohammed Irfan',
    contactNumber: '9876543214',
    description: 'Tremors damaged traditional adobe huts; weatherproof temporary family tents needed before cold night temperatures.',
    status: 'Pending'
  },
  {
    id: 'REQ-1006',
    area: 'Majuli River Island',
    resource: 'High-Protein Baby & Infant Food',
    quantity: 120,
    priority: 'Critical',
    date: '2026-11-04',
    contactPerson: 'Bikram Das',
    contactNumber: '9876543215',
    description: 'Over 80 mothers with nursing infants isolated on higher ground school compound.',
    status: 'Approved'
  },
  {
    id: 'REQ-1007',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Heavy Duty Rechargeable Flashlights',
    quantity: 90,
    priority: 'Low',
    date: '2026-11-01',
    contactPerson: 'Sunil Rawat',
    contactNumber: '9876543216',
    description: 'Grid electricity damaged; rechargeable searchlights needed for community night security and search paths.',
    status: 'Pending'
  },
  {
    id: 'REQ-1008',
    area: 'Cuddalore Coastal Belt',
    resource: 'Waterproof Tarpaulins (12x18 ft)',
    quantity: 200,
    priority: 'Medium',
    date: '2026-11-02',
    contactPerson: 'Debasish Mohanty',
    contactNumber: '9876543217',
    description: 'Covering grain reserves and roof leaks at the primary school emergency distribution center.',
    status: 'Completed'
  },
  {
    id: 'REQ-1009',
    area: 'Wayanad Meppadi Hill Ward',
    resource: 'Emergency Medical Trauma Kits',
    quantity: 25,
    priority: 'High',
    date: '2026-11-04',
    contactPerson: 'Preethi Kurian',
    contactNumber: '9876543218',
    description: 'First aid and splinting supplies for landslide evacuation route waystations.',
    status: 'In Progress'
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 'RES-2001',
    name: 'Ready-to-Eat Food Packets',
    category: 'Food',
    quantity: 1200,
    unit: 'packets',
    location: 'Warehouse Guwahati - Sector 4',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-2002',
    name: 'Purified Drinking Water (1L)',
    category: 'Drinking Water',
    quantity: 2400,
    unit: 'bottles',
    location: 'Central Water Hub Kochi',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-2003',
    name: 'Emergency Medical Trauma Kits',
    category: 'Medical Kits',
    quantity: 85,
    unit: 'kits',
    location: 'District Medical Depot Dehradun',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-2004',
    name: 'Broad Spectrum Antibiotics & Paracetamol',
    category: 'Medicines',
    quantity: 450,
    unit: 'strips',
    location: 'Medical Depot Chennai',
    lastUpdated: '2026-11-03'
  },
  {
    id: 'RES-2005',
    name: 'Woolen Thermal Blankets',
    category: 'Blankets',
    quantity: 650,
    unit: 'pieces',
    location: 'Relief Warehouse Ahmedabad',
    lastUpdated: '2026-11-02'
  },
  {
    id: 'RES-2006',
    name: 'Weatherproof Family Shelter Tents',
    category: 'Shelter Equipment',
    quantity: 45,
    unit: 'units',
    location: 'Disaster Base Camp Bhuj',
    lastUpdated: '2026-11-01'
  },
  {
    id: 'RES-2007',
    name: 'High-Protein Baby & Infant Food',
    category: 'Food',
    quantity: 180,
    unit: 'packs',
    location: 'Child Nutrition Center Jorhat',
    lastUpdated: '2026-11-04'
  },
  {
    id: 'RES-2008',
    name: 'Heavy Duty Rechargeable Flashlights',
    category: 'Other Essentials',
    quantity: 140,
    unit: 'units',
    location: 'Hill Logistics Hub Rishikesh',
    lastUpdated: '2026-11-03'
  },
  {
    id: 'RES-2009',
    name: 'Waterproof Tarpaulins (12x18 ft)',
    category: 'Shelter Equipment',
    quantity: 310,
    unit: 'sheets',
    location: 'Coastal Relief Store Bhubaneswar',
    lastUpdated: '2026-11-02'
  },
  {
    id: 'RES-2010',
    name: 'Emergency Life Jackets (Adult/Child)',
    category: 'Other Essentials',
    quantity: 38,
    unit: 'units',
    location: 'River Rescue Station Alappuzha',
    lastUpdated: '2026-11-03'
  },
  {
    id: 'RES-2011',
    name: 'Family Personal Hygiene Kits',
    category: 'Other Essentials',
    quantity: 520,
    unit: 'kits',
    location: 'National Red Cross Supply Center',
    lastUpdated: '2026-11-04'
  }
];

export const INITIAL_AREAS = [
  {
    id: 'AREA-3001',
    name: 'Assam Brahmaputra River Basin',
    district: 'Kamrup & Morigaon',
    state: 'Assam',
    disasterType: 'Flood',
    population: 45000,
    severity: 'Critical',
    requiredAssistance: 'Ready-to-eat food, clean water purification, power boats, flood tents',
    status: 'Active',
    dateReported: '2026-11-01'
  },
  {
    id: 'AREA-3002',
    name: 'Wayanad Meppadi Hill Ward',
    district: 'Wayanad',
    state: 'Kerala',
    disasterType: 'Landslide',
    population: 8500,
    severity: 'Critical',
    requiredAssistance: 'Search & rescue gear, bottled water, trauma emergency medical kits',
    status: 'Active',
    dateReported: '2026-11-02'
  },
  {
    id: 'AREA-3003',
    name: 'Cuddalore Coastal Belt',
    district: 'Cuddalore',
    state: 'Tamil Nadu',
    disasterType: 'Cyclone',
    population: 22000,
    severity: 'High',
    requiredAssistance: 'Thermal blankets, dry provisions, emergency water extraction pumps',
    status: 'Active',
    dateReported: '2026-11-03'
  },
  {
    id: 'AREA-3004',
    name: 'Chamoli Alaknanda Valley',
    district: 'Chamoli',
    state: 'Uttarakhand',
    disasterType: 'Flood',
    population: 6200,
    severity: 'High',
    requiredAssistance: 'Emergency antibiotics, warm blankets, heavy duty solar searchlights',
    status: 'Active',
    dateReported: '2026-11-02'
  },
  {
    id: 'AREA-3005',
    name: 'Kutch Rann Border Villages',
    district: 'Kutch',
    state: 'Gujarat',
    disasterType: 'Earthquake',
    population: 14000,
    severity: 'Medium',
    requiredAssistance: 'Prefabricated weather tents, potable water storage drums, food packets',
    status: 'Monitoring',
    dateReported: '2026-10-30'
  },
  {
    id: 'AREA-3006',
    name: 'Majuli River Island',
    district: 'Majuli',
    state: 'Assam',
    disasterType: 'Flood',
    population: 18000,
    severity: 'Critical',
    requiredAssistance: 'High-protein baby food, emergency boat ambulances, halogen flashlights',
    status: 'Active',
    dateReported: '2026-11-03'
  }
];

export const INITIAL_VOLUNTEERS = [
  {
    id: 'VOL-4001',
    name: 'Dr. Rohan Mehra',
    contact: '9823011221',
    assignedArea: 'Assam Brahmaputra River Basin',
    assignedTask: 'Emergency Triage & Waterborne Disease Control',
    availability: 'Busy',
    status: 'Active'
  },
  {
    id: 'VOL-4002',
    name: 'Priya Swaminathan',
    contact: '9823011222',
    assignedArea: 'None',
    assignedTask: 'Logistics & Supply Inventory Management',
    availability: 'Available',
    status: 'Unassigned'
  },
  {
    id: 'VOL-4003',
    name: 'Subhash Chandra',
    contact: '9823011223',
    assignedArea: 'Chamoli Alaknanda Valley',
    assignedTask: 'High-Altitude Search & Medical Convoy Escort',
    availability: 'Busy',
    status: 'Active'
  },
  {
    id: 'VOL-4004',
    name: 'Kavita Deshmukh',
    contact: '9823011224',
    assignedArea: 'None',
    assignedTask: 'Community Food Kitchen Distribution',
    availability: 'Available',
    status: 'Unassigned'
  },
  {
    id: 'VOL-4005',
    name: 'Arjun Varma',
    contact: '9823011225',
    assignedArea: 'Wayanad Meppadi Hill Ward',
    assignedTask: 'Off-Road 4x4 Relief Transport',
    availability: 'Busy',
    status: 'Active'
  },
  {
    id: 'VOL-4006',
    name: 'Sneha Sen',
    contact: '9823011226',
    assignedArea: 'None',
    assignedTask: 'Pediatric Care & Orphaned Children Aid',
    availability: 'Available',
    status: 'Unassigned'
  },
  {
    id: 'VOL-4007',
    name: 'Amitav Roy',
    contact: '9823011227',
    assignedArea: 'None',
    assignedTask: 'River Speedboat Evacuation Pilot',
    availability: 'Unavailable',
    status: 'On Medical Leave'
  },
  {
    id: 'VOL-4008',
    name: 'Harpreet Singh',
    contact: '9823011228',
    assignedArea: 'None',
    assignedTask: 'Emergency Radio & Satellite Communication',
    availability: 'Available',
    status: 'Unassigned'
  },
  {
    id: 'VOL-4009',
    name: 'Fatima Sheikh',
    contact: '9823011229',
    assignedArea: 'None',
    assignedTask: 'Shelter Camp Hygiene & Sanitation',
    availability: 'Available',
    status: 'Completed Assignment'
  }
];

export const INITIAL_ALLOCATIONS = [
  {
    id: 'ALC-5001',
    requestId: 'REQ-1004',
    area: 'Cuddalore Coastal Belt',
    resource: 'Woolen Thermal Blankets',
    resourceId: 'RES-2005',
    quantity: 350,
    volunteer: 'Fatima Sheikh',
    volunteerId: 'VOL-4009',
    date: '2026-11-03',
    status: 'Completed',
    notes: '350 thermal blankets delivered to community shelter camp.'
  },
  {
    id: 'ALC-5002',
    requestId: 'REQ-1003',
    area: 'Chamoli Alaknanda Valley',
    resource: 'Emergency Medical Trauma Kits',
    resourceId: 'RES-2003',
    quantity: 60,
    volunteer: 'Subhash Chandra',
    volunteerId: 'VOL-4003',
    date: '2026-11-04',
    status: 'In Progress',
    notes: 'Transporting via hill ambulance convoy under medical supervision.'
  },
  {
    id: 'ALC-5003',
    requestId: 'REQ-1008',
    area: 'Cuddalore Coastal Belt',
    resource: 'Waterproof Tarpaulins (12x18 ft)',
    resourceId: 'RES-2009',
    quantity: 200,
    volunteer: 'Priya Swaminathan',
    volunteerId: 'VOL-4002',
    date: '2026-11-02',
    status: 'Completed',
    notes: 'Stored and deployed to protect school roof from heavy rains.'
  },
  {
    id: 'ALC-5004',
    requestId: 'REQ-1009',
    area: 'Wayanad Meppadi Hill Ward',
    resource: 'Emergency Medical Trauma Kits',
    resourceId: 'RES-2003',
    quantity: 25,
    volunteer: 'Arjun Varma',
    volunteerId: 'VOL-4005',
    date: '2026-11-04',
    status: 'In Progress',
    notes: 'Escorted delivery via secondary mountain ridge route.'
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: 'ACT-001',
    type: 'request',
    title: 'New Relief Request Submitted',
    description: 'REQ-1001 for 500 Food Packets from Assam Brahmaputra River Basin registered as Critical priority.',
    timestamp: '2026-11-04 10:15'
  },
  {
    id: 'ACT-002',
    type: 'allocation',
    title: 'Resource Allocation In Transit',
    description: 'ALC-5002: 60 Emergency Medical Trauma Kits dispatched to Chamoli Alaknanda Valley by Subhash Chandra.',
    timestamp: '2026-11-04 09:30'
  },
  {
    id: 'ACT-003',
    type: 'completion',
    title: 'Relief Delivery Completed',
    description: 'ALC-5001 marked completed. 350 Blankets successfully delivered to Cuddalore shelters by Fatima Sheikh.',
    timestamp: '2026-11-03 16:45'
  },
  {
    id: 'ACT-004',
    type: 'volunteer',
    title: 'Volunteer Assigned to Critical Zone',
    description: 'Dr. Rohan Mehra assigned to Assam Brahmaputra River Basin for triage assistance.',
    timestamp: '2026-11-03 14:10'
  },
  {
    id: 'ACT-005',
    type: 'inventory',
    title: 'Inventory Stock Inflow',
    description: '2400 units of Purified Drinking Water restocked at Central Water Hub Kochi.',
    timestamp: '2026-11-03 11:00'
  }
];

// ==========================================
// CORE STORAGE ENGINE FUNCTIONS
// ==========================================

/**
 * Generic function to read an item from localStorage
 * Returns fallbackData if key doesn't exist or on parse error
 */
export function getStorageItem(key, fallbackData = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackData;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallbackData;
  }
}

/**
 * Generic function to save data into localStorage
 */
export function setStorageItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
    return false;
  }
}

/**
 * Initializes localStorage with seed demo data if not already present.
 * Does not overwrite existing user edits on refresh!
 */
export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
    setStorageItem(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESOURCES)) {
    setStorageItem(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AREAS)) {
    setStorageItem(STORAGE_KEYS.AREAS, INITIAL_AREAS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
    setStorageItem(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ALLOCATIONS)) {
    setStorageItem(STORAGE_KEYS.ALLOCATIONS, INITIAL_ALLOCATIONS);
  }
  if (!localStorage.getItem(STORAGE_KEYS.ACTIVITIES)) {
    setStorageItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
  if (!localStorage.getItem(STORAGE_KEYS.AUTH)) {
    // Default demo session: Administrator
    setStorageItem(STORAGE_KEYS.AUTH, {
      username: 'admin',
      fullName: 'Chief Coordinator Verma',
      role: 'Administrator'
    });
  }
}

/**
 * Resets all tables to the clean initial demo dataset
 */
export function resetToDemoData() {
  setStorageItem(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  setStorageItem(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
  setStorageItem(STORAGE_KEYS.AREAS, INITIAL_AREAS);
  setStorageItem(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS);
  setStorageItem(STORAGE_KEYS.ALLOCATIONS, INITIAL_ALLOCATIONS);
  setStorageItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  addActivity(
    'inventory',
    'Platform Data Reset',
    'Administrator triggered a full reset to standard demonstration records.'
  );
}

/**
 * Generates an incrementing human-readable ID
 * Example: REQ-1010, RES-2012, VOL-4010
 */
export function generateId(prefix, existingList) {
  let highestNum = 1000;
  if (prefix === 'RES') highestNum = 2000;
  if (prefix === 'AREA') highestNum = 3000;
  if (prefix === 'VOL') highestNum = 4000;
  if (prefix === 'ALC') highestNum = 5000;
  if (prefix === 'ACT') highestNum = 0;

  existingList.forEach(item => {
    if (item.id && item.id.startsWith(prefix + '-')) {
      const parts = item.id.split('-');
      const num = parseInt(parts[1], 10);
      if (!isNaN(num) && num > highestNum) {
        highestNum = num;
      }
    }
  });

  const nextNum = highestNum + 1;
  const formatted = prefix === 'ACT' ? String(nextNum).padStart(3, '0') : String(nextNum);
  return `${prefix}-${formatted}`;
}

// ==========================================
// ACTIVITY LOGGING
// ==========================================

export function getActivities() {
  return getStorageItem(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
}

export function addActivity(type, title, description) {
  const current = getActivities();
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
  const newActivity = {
    id: generateId('ACT', current),
    type, // 'request' | 'resource' | 'volunteer' | 'allocation' | 'completion'
    title,
    description,
    timestamp: dateStr
  };
  // Prepend so latest appears first, keep latest 50
  const updated = [newActivity, ...current].slice(0, 50);
  setStorageItem(STORAGE_KEYS.ACTIVITIES, updated);
  return newActivity;
}

// ==========================================
// RELIEF REQUEST CRUD
// ==========================================

export function getRequests() {
  return getStorageItem(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
}

export function saveRequests(list) {
  return setStorageItem(STORAGE_KEYS.REQUESTS, list);
}

export function addRequest(requestData) {
  const list = getRequests();
  const newId = generateId('REQ', list);
  const newRecord = {
    ...requestData,
    id: newId,
    date: requestData.date || new Date().toISOString().slice(0, 10),
    status: requestData.status || 'Pending'
  };
  list.unshift(newRecord);
  saveRequests(list);
  addActivity(
    'request',
    'New Relief Request Created',
    `${newId} for ${newRecord.quantity} ${newRecord.resource} in ${newRecord.area} (${newRecord.priority} Priority).`
  );
  return newRecord;
}

export function updateRequest(id, updatedFields) {
  const list = getRequests();
  const index = list.findIndex(r => r.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updatedFields };
  saveRequests(list);
  addActivity(
    'request',
    'Relief Request Updated',
    `${id} details modified. Status: ${list[index].status}, Priority: ${list[index].priority}.`
  );
  return list[index];
}

export function deleteRequest(id) {
  const list = getRequests();
  const target = list.find(r => r.id === id);
  const filtered = list.filter(r => r.id !== id);
  saveRequests(filtered);
  if (target) {
    addActivity('request', 'Relief Request Deleted', `Request ${id} for ${target.area} was removed.`);
  }
  return true;
}

// ==========================================
// RESOURCE INVENTORY CRUD
// ==========================================

export function getResources() {
  return getStorageItem(STORAGE_KEYS.RESOURCES, INITIAL_RESOURCES);
}

export function saveResources(list) {
  return setStorageItem(STORAGE_KEYS.RESOURCES, list);
}

export function addResource(resourceData) {
  const list = getResources();
  const newId = generateId('RES', list);
  const newRecord = {
    ...resourceData,
    id: newId,
    quantity: Number(resourceData.quantity) || 0,
    lastUpdated: new Date().toISOString().slice(0, 10)
  };
  list.push(newRecord);
  saveResources(list);
  addActivity(
    'inventory',
    'Resource Stock Added',
    `${newRecord.name} (${newRecord.quantity} ${newRecord.unit}) added to ${newRecord.location}.`
  );
  return newRecord;
}

export function updateResource(id, updatedFields) {
  const list = getResources();
  const index = list.findIndex(r => r.id === id);
  if (index === -1) return null;
  list[index] = {
    ...list[index],
    ...updatedFields,
    quantity: Number(updatedFields.quantity !== undefined ? updatedFields.quantity : list[index].quantity),
    lastUpdated: new Date().toISOString().slice(0, 10)
  };
  saveResources(list);
  addActivity(
    'inventory',
    'Resource Inventory Updated',
    `${list[index].name} (${id}) updated. Available stock: ${list[index].quantity} ${list[index].unit}.`
  );
  return list[index];
}

export function deleteResource(id) {
  const list = getResources();
  const target = list.find(r => r.id === id);
  const filtered = list.filter(r => r.id !== id);
  saveResources(filtered);
  if (target) {
    addActivity('inventory', 'Resource Stock Deleted', `Resource ${id} (${target.name}) was removed.`);
  }
  return true;
}

// ==========================================
// AFFECTED AREAS CRUD
// ==========================================

export function getAreas() {
  return getStorageItem(STORAGE_KEYS.AREAS, INITIAL_AREAS);
}

export function saveAreas(list) {
  return setStorageItem(STORAGE_KEYS.AREAS, list);
}

export function addArea(areaData) {
  const list = getAreas();
  const newId = generateId('AREA', list);
  const newRecord = {
    ...areaData,
    id: newId,
    population: Number(areaData.population) || 0,
    dateReported: areaData.dateReported || new Date().toISOString().slice(0, 10),
    status: areaData.status || 'Active'
  };
  list.push(newRecord);
  saveAreas(list);
  addActivity(
    'area',
    'Disaster Area Registered',
    `${newRecord.name} (${newRecord.disasterType}, ${newRecord.severity} Severity) added to monitoring system.`
  );
  return newRecord;
}

export function updateArea(id, updatedFields) {
  const list = getAreas();
  const index = list.findIndex(a => a.id === id);
  if (index === -1) return null;
  list[index] = {
    ...list[index],
    ...updatedFields,
    population: Number(updatedFields.population !== undefined ? updatedFields.population : list[index].population)
  };
  saveAreas(list);
  addActivity('area', 'Affected Area Updated', `${list[index].name} (${id}) status/severity modified.`);
  return list[index];
}

export function deleteArea(id) {
  const list = getAreas();
  const target = list.find(a => a.id === id);
  const filtered = list.filter(a => a.id !== id);
  saveAreas(filtered);
  if (target) {
    addActivity('area', 'Affected Area Removed', `Area ${id} (${target.name}) was deleted.`);
  }
  return true;
}

// ==========================================
// VOLUNTEER MANAGEMENT CRUD
// ==========================================

export function getVolunteers() {
  return getStorageItem(STORAGE_KEYS.VOLUNTEERS, INITIAL_VOLUNTEERS);
}

export function saveVolunteers(list) {
  return setStorageItem(STORAGE_KEYS.VOLUNTEERS, list);
}

export function addVolunteer(volunteerData) {
  const list = getVolunteers();
  const newId = generateId('VOL', list);
  const newRecord = {
    ...volunteerData,
    id: newId,
    assignedArea: volunteerData.assignedArea || 'None',
    availability: volunteerData.availability || 'Available',
    status: volunteerData.status || 'Unassigned'
  };
  list.push(newRecord);
  saveVolunteers(list);
  addActivity(
    'volunteer',
    'Volunteer Registered',
    `${newRecord.name} registered with role: ${newRecord.assignedTask || 'Field Support'}.`
  );
  return newRecord;
}

export function updateVolunteer(id, updatedFields) {
  const list = getVolunteers();
  const index = list.findIndex(v => v.id === id);
  if (index === -1) return null;
  list[index] = { ...list[index], ...updatedFields };
  saveVolunteers(list);
  addActivity('volunteer', 'Volunteer Profile Updated', `${list[index].name} (${id}) updated.`);
  return list[index];
}

export function deleteVolunteer(id) {
  const list = getVolunteers();
  const target = list.find(v => v.id === id);
  const filtered = list.filter(v => v.id !== id);
  saveVolunteers(filtered);
  if (target) {
    addActivity('volunteer', 'Volunteer Record Removed', `Volunteer ${id} (${target.name}) was removed.`);
  }
  return true;
}

export function assignVolunteerToArea(volunteerId, areaName, taskName) {
  const list = getVolunteers();
  const index = list.findIndex(v => v.id === volunteerId);
  if (index === -1) return false;

  list[index].assignedArea = areaName;
  if (taskName) list[index].assignedTask = taskName;
  list[index].availability = 'Busy';
  list[index].status = 'Active';
  saveVolunteers(list);
  addActivity(
    'volunteer',
    'Volunteer Assigned',
    `${list[index].name} deployed to ${areaName} for ${list[index].assignedTask}.`
  );
  return true;
}

// ==========================================
// RESOURCE ALLOCATION CENTER LOGIC
// ==========================================

export function getAllocations() {
  return getStorageItem(STORAGE_KEYS.ALLOCATIONS, INITIAL_ALLOCATIONS);
}

export function saveAllocations(list) {
  return setStorageItem(STORAGE_KEYS.ALLOCATIONS, list);
}

/**
 * Key Resource Allocation Logic as specified in Section 5-G:
 * 1. Checks available quantity.
 * 2. Blocks allocation if quantity is insufficient or negative.
 * 3. Decreases available inventory stock.
 * 4. Changes Request status to "In Progress".
 * 5. Changes Volunteer availability to "Busy".
 * 6. Records the allocation in history and activity log.
 */
export function allocateResource({
  requestId,
  area,
  resourceId,
  quantity,
  volunteerId,
  notes
}) {
  const qtyToAllocate = Number(quantity);
  if (isNaN(qtyToAllocate) || qtyToAllocate <= 0) {
    return { success: false, message: 'Allocation quantity must be a positive number greater than 0.' };
  }

  // 1. Fetch current records
  const resources = getResources();
  const requests = getRequests();
  const volunteers = getVolunteers();
  const allocations = getAllocations();

  // Find resource
  const resIndex = resources.findIndex(r => r.id === resourceId);
  if (resIndex === -1) {
    return { success: false, message: 'Selected resource was not found in inventory.' };
  }
  const currentResource = resources[resIndex];

  // 2. Validate sufficient inventory
  if (currentResource.quantity < qtyToAllocate) {
    return {
      success: false,
      message: `Insufficient inventory! Available stock for "${currentResource.name}" is only ${currentResource.quantity} ${currentResource.unit}.`
    };
  }

  // Find request (if chosen)
  let requestObj = null;
  if (requestId) {
    requestObj = requests.find(r => r.id === requestId);
  }

  // Find volunteer (if chosen)
  let volunteerObj = null;
  if (volunteerId) {
    volunteerObj = volunteers.find(v => v.id === volunteerId);
    if (volunteerObj && volunteerObj.availability === 'Unavailable') {
      return { success: false, message: 'Selected volunteer is marked Unavailable and cannot be assigned.' };
    }
  }

  // 3. Deduct inventory safely (never negative)
  resources[resIndex].quantity = Math.max(0, currentResource.quantity - qtyToAllocate);
  resources[resIndex].lastUpdated = new Date().toISOString().slice(0, 10);
  saveResources(resources);

  // 4. Update request status to 'In Progress' if not already completed
  if (requestObj) {
    const reqIndex = requests.findIndex(r => r.id === requestId);
    if (reqIndex !== -1) {
      requests[reqIndex].status = 'In Progress';
      saveRequests(requests);
    }
  }

  // 5. Update volunteer status to 'Busy'
  if (volunteerObj) {
    const volIndex = volunteers.findIndex(v => v.id === volunteerId);
    if (volIndex !== -1) {
      volunteers[volIndex].availability = 'Busy';
      volunteers[volIndex].assignedArea = area;
      volunteers[volIndex].status = 'Active';
      saveVolunteers(volunteers);
    }
  }

  // 6. Record allocation
  const newAllocationId = generateId('ALC', allocations);
  const newAllocation = {
    id: newAllocationId,
    requestId: requestId || 'Direct Dispatch',
    area,
    resource: currentResource.name,
    resourceId: currentResource.id,
    quantity: qtyToAllocate,
    unit: currentResource.unit,
    volunteer: volunteerObj ? volunteerObj.name : 'Logistics Team',
    volunteerId: volunteerId || null,
    date: new Date().toISOString().slice(0, 10),
    status: 'In Progress',
    notes: notes || 'Dispatched from central command warehouse.'
  };

  allocations.unshift(newAllocation);
  saveAllocations(allocations);

  // 7. Log Activity
  addActivity(
    'allocation',
    'Resource Allocated & Dispatched',
    `${newAllocationId}: ${qtyToAllocate} ${currentResource.unit} of ${currentResource.name} dispatched to ${area}. Assigned to ${newAllocation.volunteer}.`
  );

  return { success: true, allocation: newAllocation };
}

/**
 * Marks an allocation as Completed
 * When completed:
 * - Allocation status becomes 'Completed'
 * - Associated relief request is marked 'Completed'
 * - Assigned volunteer availability changes back to 'Available'
 */
export function completeAllocation(allocationId) {
  const allocations = getAllocations();
  const index = allocations.findIndex(a => a.id === allocationId);
  if (index === -1) return { success: false, message: 'Allocation not found.' };

  allocations[index].status = 'Completed';
  const alloc = allocations[index];
  saveAllocations(allocations);

  // Update associated request
  if (alloc.requestId && alloc.requestId.startsWith('REQ-')) {
    const requests = getRequests();
    const reqIndex = requests.findIndex(r => r.id === alloc.requestId);
    if (reqIndex !== -1) {
      requests[reqIndex].status = 'Completed';
      saveRequests(requests);
    }
  }

  // Release volunteer back to Available
  if (alloc.volunteerId) {
    const volunteers = getVolunteers();
    const volIndex = volunteers.findIndex(v => v.id === alloc.volunteerId);
    if (volIndex !== -1) {
      volunteers[volIndex].availability = 'Available';
      volunteers[volIndex].status = 'Completed Assignment';
      volunteers[volIndex].assignedArea = 'None';
      saveVolunteers(volunteers);
    }
  }

  addActivity(
    'completion',
    'Relief Allocation Completed',
    `Allocation ${allocationId} to ${alloc.area} verified delivered. Associated request and volunteer updated.`
  );

  return { success: true, allocation: alloc };
}

// ==========================================
// SIMPLE AUTH & SESSION MANAGEMENT
// ==========================================

export function getCurrentUser() {
  return getStorageItem(STORAGE_KEYS.AUTH, {
    username: 'admin',
    fullName: 'Chief Coordinator Verma',
    role: 'Administrator'
  });
}

export function setCurrentUser(user) {
  return setStorageItem(STORAGE_KEYS.AUTH, user);
}

export function clearUserSession() {
  localStorage.removeItem(STORAGE_KEYS.AUTH);
}

