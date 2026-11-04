/**
 * ResQNet - Disaster Relief Coordination Platform
 * utils/calculations.js
 * 
 * Simple, pure JavaScript calculation functions.
 * All dashboard metrics and reports are calculated dynamically from actual records.
 * No hardcoded stats!
 */

/**
 * Calculates all primary and secondary statistics for the main dashboard
 */
export function calculateDashboardStats(requests = [], resources = [], volunteers = [], areas = []) {
  // 1. Total Relief Requests
  const totalRequests = requests.length;

  // 2. Total Available Resource units & Total resource catalog items
  const totalResourceUnits = resources.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const totalResourceItems = resources.length;

  // 3. Active Volunteers (volunteers currently deployed/busy)
  const activeVolunteers = volunteers.filter(v => v.availability === 'Busy' || v.status === 'Active').length;
  const totalVolunteers = volunteers.length;
  const availableVolunteers = volunteers.filter(v => v.availability === 'Available').length;

  // 4. Affected Areas
  const totalAreas = areas.length;
  const activeAreas = areas.filter(a => a.status === 'Active').length;
  const totalAffectedPopulation = areas.reduce((sum, a) => sum + (Number(a.population) || 0), 0);

  // Secondary Request status stats
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedRequests = requests.filter(r => r.status === 'Approved').length;
  const inProgressRequests = requests.filter(r => r.status === 'In Progress').length;
  const completedRequests = requests.filter(r => r.status === 'Completed').length;
  const criticalRequests = requests.filter(r => r.priority === 'Critical').length;
  const highRequests = requests.filter(r => r.priority === 'High').length;
  const mediumRequests = requests.filter(r => r.priority === 'Medium').length;
  const lowRequests = requests.filter(r => r.priority === 'Low').length;

  // Resource Overview Categories
  const foodTotal = resources
    .filter(r => r.category === 'Food')
    .reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);

  const waterTotal = resources
    .filter(r => r.category === 'Drinking Water')
    .reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);

  const medicalTotal = resources
    .filter(r => r.category === 'Medical Kits' || r.category === 'Medicines')
    .reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);

  const blanketsTotal = resources
    .filter(r => r.category === 'Blankets')
    .reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);

  const shelterTotal = resources
    .filter(r => r.category === 'Shelter Equipment')
    .reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);

  // Low stock items (quantity < 50)
  const lowStockItems = resources.filter(r => Number(r.quantity) < 50);

  return {
    totalRequests,
    totalResourceUnits,
    totalResourceItems,
    activeVolunteers,
    totalVolunteers,
    availableVolunteers,
    totalAreas,
    activeAreas,
    totalAffectedPopulation,
    pendingRequests,
    approvedRequests,
    inProgressRequests,
    completedRequests,
    criticalRequests,
    highRequests,
    mediumRequests,
    lowRequests,
    categoryTotals: {
      food: foodTotal,
      water: waterTotal,
      medical: medicalTotal,
      blankets: blanketsTotal,
      shelter: shelterTotal
    },
    lowStockCount: lowStockItems.length,
    lowStockItems
  };
}

/**
 * Calculates category breakdown for visual charts
 */
export function calculateCategoryBreakdown(resources = []) {
  const categories = [
    'Food',
    'Drinking Water',
    'Medicines',
    'Medical Kits',
    'Blankets',
    'Shelter Equipment',
    'Other Essentials'
  ];

  const breakdown = categories.map(cat => {
    const items = resources.filter(r => r.category === cat);
    const totalQty = items.reduce((sum, r) => sum + (Number(r.quantity) || 0), 0);
    return {
      category: cat,
      count: items.length,
      totalQuantity: totalQty
    };
  });

  return breakdown;
}

/**
 * Calculates priority percentages for requests
 */
export function calculatePriorityBreakdown(requests = []) {
  const total = requests.length || 1;
  const critical = requests.filter(r => r.priority === 'Critical').length;
  const high = requests.filter(r => r.priority === 'High').length;
  const medium = requests.filter(r => r.priority === 'Medium').length;
  const low = requests.filter(r => r.priority === 'Low').length;

  return [
    { label: 'Critical', count: critical, percent: Math.round((critical / total) * 100), color: '#EF4444' },
    { label: 'High', count: high, percent: Math.round((high / total) * 100), color: '#F97316' },
    { label: 'Medium', count: medium, percent: Math.round((medium / total) * 100), color: '#EAB308' },
    { label: 'Low', count: low, percent: Math.round((low / total) * 100), color: '#10B981' }
  ];
}

/**
 * Calculates status breakdown for requests
 */
export function calculateStatusBreakdown(requests = []) {
  const total = requests.length || 1;
  const pending = requests.filter(r => r.status === 'Pending').length;
  const approved = requests.filter(r => r.status === 'Approved').length;
  const inProgress = requests.filter(r => r.status === 'In Progress').length;
  const completed = requests.filter(r => r.status === 'Completed').length;
  const rejected = requests.filter(r => r.status === 'Rejected').length;

  return [
    { label: 'Pending', count: pending, percent: Math.round((pending / total) * 100), color: '#F59E0B' },
    { label: 'Approved', count: approved, percent: Math.round((approved / total) * 100), color: '#0D9488' },
    { label: 'In Progress', count: inProgress, percent: Math.round((inProgress / total) * 100), color: '#3B82F6' },
    { label: 'Completed', count: completed, percent: Math.round((completed / total) * 100), color: '#10B981' },
    { label: 'Rejected', count: rejected, percent: Math.round((rejected / total) * 100), color: '#64748B' }
  ];
}

