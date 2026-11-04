# ResQNet – Disaster Relief Resource Coordination Platform

> **"Connecting Resources. Coordinating Relief. Saving Lives."**

[![Deploy to GitHub Pages](https://github.com/golukumargsr-create/resqnet-disaster-relief/actions/workflows/deploy.yml/badge.svg)](https://github.com/golukumargsr-create/resqnet-disaster-relief/actions/workflows/deploy.yml)

- 🌐 **Live Website (GitHub Pages):** [https://golukumargsr-create.github.io/resqnet-disaster-relief/](https://golukumargsr-create.github.io/resqnet-disaster-relief/)
- 💻 **GitHub Repository:** [https://github.com/golukumargsr-create/resqnet-disaster-relief](https://github.com/golukumargsr-create/resqnet-disaster-relief)
- 🚀 **Local Dev Server:** [http://localhost:5173/](http://localhost:5173/)

ResQNet is a specialized, responsive, web-based emergency management command center designed to centralize and coordinate disaster relief operations. Developed for academic evaluation in Internet Programming, it demonstrates practical concepts of **HTML, CSS, JavaScript, and React with Vite**, operating fully independently in the browser using client-side **`localStorage`**.

---

## Table of Contents

1. [Project Introduction](#1-project-introduction)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Features & Capabilities](#4-features--capabilities)
5. [Technologies Used](#5-technologies-used)
6. [Project Folder Structure](#6-project-folder-structure)
7. [How LocalStorage Works](#7-how-localstorage-works)
8. [How CRUD Operations Work](#8-how-crud-operations-work)
9. [How Resource Allocation Works](#9-how-resource-allocation-works)
10. [How Priority Management Works](#10-how-priority-management-works)
11. [How Dashboard Statistics are Calculated](#11-how-dashboard-statistics-are-calculated)
12. [Project Limitations](#12-project-limitations)
13. [Future Improvements](#13-future-improvements)
14. [Steps to Run the Project](#14-steps-to-run-the-project)

---

## 1. Project Introduction

During severe environmental catastrophes such as cyclones, flash floods, earthquakes, and landslides, timely emergency response saves lives. Relief organizations face severe logistical challenges: tracking supplies, matching real-time needs of affected zones, avoiding duplicate consignments, preventing stock exhaustion, and dispatching volunteer personnel.

**ResQNet** acts as an emergency operations center (EOC) software system. It connects:
- **Relief Requisitions** from field camps.
- **Resource Inventory** located in regional supply depots.
- **Affected Areas** segmented by severity and population.
- **Volunteer Personnel** equipped with specific skillsets.

---

## 2. Problem Statement

Disaster relief coordination often suffers from:
1. **Fragmented Information:** Disconnected spreadsheets or phone records cause delay and confusion.
2. **Resource Imbalances:** Some camps receive surplus food while others suffer acute drinking water or medicine shortages.
3. **Over-Allocation:** Allocating supplies that exceed warehouse stock balances, causing logistics gridlock.
4. **Lack of Volunteer Tracking:** Inability to know which field volunteers are currently deployed (`Busy`) versus ready for immediate dispatch (`Available`).

ResQNet addresses these pain points by offering a unified, single-pane command center that verifies available stock in real-time, prioritizes requests, and manages the end-to-end lifecycle of emergency deliveries.

---

## 3. Project Objectives

- **Centralized Data Hub:** Provide a single dashboard to record, update, and monitor disaster relief assets.
- **Real-Time Validation:** Ensure allocation quantities never exceed warehouse stock and never allow negative inventory balances.
- **Dynamic Prioritization:** Categorize incoming relief requisitions into Critical, High, Medium, and Low tiers to guide resource routing.
- **Audit & Historical Tracking:** Log every relief action, volunteer deployment, and delivery completion in an immutable activity timeline.
- **Zero-Backend Portability:** Deliver 100% functionality inside the browser without requiring external database setups, Docker containers, or cloud credentials.

---

## 4. Features & Capabilities

### A. Authentication & Role Switcher
- Academic demo access supporting three roles:
  - **Administrator:** Full operational privileges.
  - **Relief Coordinator:** Allocation, inventory adjustments, and request approvals.
  - **Field Volunteer:** View tasks and update deployment statuses.
- One-click demo credential pre-fill buttons for quick presentation during viva.

### B. Command Center Dashboard
- **4 Major Metrics:** Total Relief Requests, Available Resources, Active Volunteers, and Affected Areas.
- **4 Secondary Metrics:** Pending, Approved, Completed, and Critical Priority Requests.
- **Resource Overview Cards:** Real-time stock counters for Food Packages, Drinking Water, Medical Kits, Blankets, and Shelter Equipment.
- **Priority Breakdown Bar:** Visual percentage breakdown of request urgency.
- **Live Activity Feed:** Audit trail tracking all system actions with timestamps.
- **Quick Action Triggers:** One-click shortcuts to add requests, inventory, volunteers, or zones.

### C. Relief Request Management
- Full CRUD operations (Create, Read, Update, Delete) with modal dialogs.
- Multi-parameter search (by Request ID, Area, Resource, or Contact).
- Filters for **Priority** (`Critical`, `High`, `Medium`, `Low`) and **Status** (`Pending`, `Approved`, `In Progress`, `Completed`, `Rejected`).
- Date sorting (Newest first, Oldest first).
- Detailed dossier modal viewing complete situational notes and contact information.

### D. Resource Inventory Logistics
- Categorized supplies: Food, Drinking Water, Medicines, Medical Kits, Blankets, Clothing, Shelter Equipment, Other Essentials.
- Strict inventory logic: stock reductions on allocation, immediate negative-balance prevention.
- Automatic **Low-Stock Alert** indicators when inventory drops below 50 units.
- Category filters and warehouse location tracking.

### E. Affected Areas Registry
- Disaster classification: Flood, Earthquake, Cyclone, Landslide, Other.
- Severity levels with color-coded status badges.
- Estimated population impact tracking and required assistance briefings.

### F. Volunteer Management System
- Personnel tracking with specialized skillsets (e.g., Emergency Triage, 4x4 Transport, River Speedboat Pilot, Radio Communication).
- Dynamic availability lifecycle:
  - `Available`: Ready for immediate dispatch.
  - `Busy`: Currently assigned to an active relief zone.
  - `Unavailable`: On medical leave or rest.
- Direct "Deploy" modal to assign an available volunteer to an affected zone.
- "Free Up" button to restore volunteer availability upon mission completion.

### G. Centralized Resource Allocation Hub
- Direct linkage between Requests, Warehouses, Zones, and Volunteers.
- Step-by-step dispatch workflow:
  1. Select pending or approved relief request.
  2. Auto-populates affected area and requested supply.
  3. Displays live warehouse stock balance.
  4. Enforces strict input validation: `0 < quantity <= stock` and `quantity <= request`.
  5. Selects an available volunteer.
  6. Deducts inventory immediately from localStorage.
  7. Updates Request status to `In Progress`.
  8. Updates Volunteer availability to `Busy`.
  9. Creates historical consignment record (`ALC-XXXX`).
- "Mark Delivered" button: Sets allocation and associated request to `Completed`, and releases volunteer back to `Available`.

### H. Analytics & CSV Export
- Aggregated metrics and CSS-driven distribution graphs.
- **Native Browser CSV Export** for:
  - Relief Requests (`ResQNet_Relief_Requests.csv`)
  - Inventory Stock (`ResQNet_Resource_Inventory.csv`)

### I. System Controls & Demo Reset
- One-click "Reset Demo Data" button with confirmation dialog to restore the default baseline dataset at any time during faculty examination.

---

## 5. Technologies Used

| Technology | Purpose | Why Chosen |
|---|---|---|
| **React 18** | UI Component Architecture | Modular, reusable UI components (`useState`, `useEffect`) |
| **Vite 5** | Build Tool & Dev Server | Ultra-fast Hot Module Replacement (HMR) and optimized bundling |
| **Vanilla JavaScript (ES6+)** | Business Logic & Calculations | Clean, beginner-friendly, and easy to explain during practical viva |
| **Vanilla CSS (index.css)** | Styling & Layout | Modern responsive design using CSS Grid, Flexbox, and CSS Variables |
| **HTML5 LocalStorage API** | Client-Side Persistence | Offline-capable, zero server configuration, retains data after refresh |
| **Lucide React** | Icons | Crisp, modern SVG icons representing command center controls |

---

## 6. Project Folder Structure

```
html/
├── dist/                     # Optimized production build artifacts
├── node_modules/             # Installed dependencies
├── public/                   # Static public assets
├── src/
│   ├── components/           # Reusable UI elements
│   │   ├── ConfirmDialog.jsx # Confirmation modal for delete/reset
│   │   ├── Modal.jsx         # Accessible dialog backdrop with Esc listener
│   │   ├── Navbar.jsx        # Top command bar with notifications & user profile
│   │   ├── Sidebar.jsx       # Collapsible navigation drawer
│   │   ├── StatCard.jsx      # Metric display cards with icons & status
│   │   ├── StatusBadge.jsx   # Priority & status color-coded tags
│   │   └── Toast.jsx         # Floating toast alert notification stack
│   ├── pages/                # Main platform views
│   │   ├── About.jsx         # Documentation, tech architecture, & reset
│   │   ├── Allocations.jsx   # Centralized resource allocation hub
│   │   ├── Areas.jsx         # Disaster-affected zones registry
│   │   ├── Dashboard.jsx     # Executive overview with 8 stats & live feed
│   │   ├── Inventory.jsx     # Supply warehouse stock management
│   │   ├── Login.jsx         # Demo role-based welcome screen
│   │   ├── Reports.jsx       # Charts, metrics & CSV export tools
│   │   ├── Requests.jsx      # Relief requisitions CRUD module
│   │   └── Volunteers.jsx   # Personnel roster & deployment center
│   ├── utils/                # Pure JavaScript business logic
│   │   ├── calculations.js   # Dynamic calculation of dashboard statistics
│   │   ├── exportCsv.js      # Client-side CSV generation & download
│   │   ├── storage.js        # LocalStorage keys, seed data, & CRUD engine
│   │   └── validation.js     # Form field and allocation boundary validation
│   ├── App.jsx               # Application root, routing, & centralized state
│   ├── index.css             # Unified CSS styles & responsive rules
│   └── main.jsx              # React DOM mounting entrypoint
├── index.html                # Main HTML5 template
├── package.json              # Project metadata & scripts
├── README.md                 # Full project technical manual
├── vite.config.js            # Vite configuration
└── VIVA_NOTES.md             # 25+ viva questions with beginner-friendly answers
```

---

## 7. How LocalStorage Works

`localStorage` is part of the standard HTML5 Web Storage API. It enables web applications to store key-value pairs (up to ~5MB) directly in the user's browser with **no expiration date**. Data remains intact even after closing the browser tab or restarting the computer.

In ResQNet, all records are stored as JSON strings under structured keys:
- `resqnet_requests`
- `resqnet_resources`
- `resqnet_areas`
- `resqnet_volunteers`
- `resqnet_allocations`
- `resqnet_activities`
- `resqnet_user`

### Code Example from `src/utils/storage.js`:

```javascript
// Reading data: deserialize JSON string to JavaScript Array
export function getStorageItem(key, fallbackData = []) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackData;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key}:`, err);
    return fallbackData;
  }
}

// Writing data: serialize JavaScript Object to JSON string
export function setStorageItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error(`Error writing ${key}:`, err);
    return false;
  }
}
```

---

## 8. How CRUD Operations Work

CRUD represents the four fundamental database actions: **Create, Read, Update, Delete**. In ResQNet, these are implemented using standard JavaScript array methods without any complex ORMs:

1. **Create (`unshift` / `push`):**
   ```javascript
   export function addRequest(requestData) {
     const list = getRequests();
     const newId = generateId('REQ', list); // e.g. REQ-1010
     const newRecord = { ...requestData, id: newId, status: 'Pending' };
     list.unshift(newRecord); // Prepend to list
     saveRequests(list);
     return newRecord;
   }
   ```

2. **Read (`getItem` + `JSON.parse`):**
   Fetched using `getRequests()`, which loads all stored relief requisitions into React state on component mount.

3. **Update (`findIndex` + property spread):**
   ```javascript
   export function updateRequest(id, updatedFields) {
     const list = getRequests();
     const index = list.findIndex(r => r.id === id);
     if (index !== -1) {
       list[index] = { ...list[index], ...updatedFields };
       saveRequests(list);
     }
     return list[index];
   }
   ```

4. **Delete (`filter`):**
   ```javascript
   export function deleteRequest(id) {
     const list = getRequests();
     const filtered = list.filter(r => r.id !== id);
     saveRequests(filtered);
     return true;
   }
   ```

---

## 9. How Resource Allocation Works

The **Resource Allocation Hub** is the central logistical engine of ResQNet. It coordinates four independent entities: Relief Requests, Inventory, Areas, and Volunteers.

### Operational Sequence:
1. **Selection:** The coordinator selects an active relief request (e.g. `REQ-1001: 500 Food Packets for Assam`).
2. **Auto-Populate:** The system matches the target zone and finds the corresponding resource in warehouse storage.
3. **Validation Check:**
   - Allocation quantity must be $> 0$.
   - Quantity $\le$ available warehouse stock.
   - Quantity $\le$ requested camp requirement.
4. **Execution:**
   - **Warehouse Inventory:** Stock is deducted (`availableQuantity = availableQuantity - allocatedQuantity`).
   - **Request Status:** Transitions from `Pending` or `Approved` to `In Progress`.
   - **Volunteer Availability:** Changes from `Available` to `Busy`, with `assignedArea` updated to the target zone.
   - **Allocation Record:** Stored in `resqnet_allocations` (`ALC-XXXX`).
   - **Audit Entry:** Dispatched event added to `resqnet_activities`.
5. **Fulfillment ("Mark Delivered"):**
   - Allocation and Request are marked `Completed`.
   - Volunteer availability resets back to `Available`.

```javascript
// Excerpt from allocateResource() in storage.js
resources[resIndex].quantity = Math.max(0, currentResource.quantity - qtyToAllocate);
saveResources(resources);

requests[reqIndex].status = 'In Progress';
saveRequests(requests);

volunteers[volIndex].availability = 'Busy';
volunteers[volIndex].assignedArea = area;
saveVolunteers(volunteers);
```

---

## 10. How Priority Management Works

ResQNet uses a standardized four-tier triage priority system:

| Priority | Visual Indicator | Meaning / Response Time | Example Incident |
|---|---|---|---|
| **Critical** | Red (`#EF4444`) | Immediate life hazard (0-6 hours) | Drinking water failure in stranded island camp |
| **High** | Orange (`#F97316`) | Severe urgency (6-12 hours) | Emergency trauma kits for landslide injuries |
| **Medium** | Yellow (`#EAB308`) | Essential stability (24-48 hours) | Blankets and tarpaulins for coastal shelters |
| **Low** | Green (`#10B981`) | General replenishment (48+ hours) | Rechargeable flashlights and hygiene kits |

All priority levels render through `<StatusBadge type="priority" value={item.priority} />`, ensuring uniform color coding across every screen.

---

## 11. How Dashboard Statistics are Calculated

**No dashboard metric is hardcoded.** Every statistic is computed dynamically whenever state updates:

```javascript
// Excerpt from src/utils/calculations.js
export function calculateDashboardStats(requests, resources, volunteers, areas) {
  return {
    totalRequests: requests.length,
    totalResourceUnits: resources.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0),
    activeVolunteers: volunteers.filter(v => v.availability === 'Busy').length,
    totalAreas: areas.length,
    pendingRequests: requests.filter(r => r.status === 'Pending').length,
    criticalRequests: requests.filter(r => r.priority === 'Critical').length,
    categoryTotals: {
      food: resources.filter(r => r.category === 'Food').reduce((s, r) => s + Number(r.quantity), 0),
      water: resources.filter(r => r.category === 'Drinking Water').reduce((s, r) => s + Number(r.quantity), 0),
      medical: resources.filter(r => r.category === 'Medical Kits' || r.category === 'Medicines').reduce((s, r) => s + Number(r.quantity), 0),
      blankets: resources.filter(r => r.category === 'Blankets').reduce((s, r) => s + Number(r.quantity), 0),
      shelter: resources.filter(r => r.category === 'Shelter Equipment').reduce((s, r) => s + Number(r.quantity), 0)
    }
  };
}
```

---

## 12. Project Limitations

1. **Browser-Scoped Storage:** Because data is kept in `localStorage`, records are specific to the individual browser instance and are not shared across separate physical computers without an external database.
2. **Storage Capacity:** Standard browser localStorage is restricted to approximately 5MB of serialized text (ample for thousands of relief records, but not for heavy binary media).
3. **Simulation Authentication:** Authentication is client-side for academic demonstration; it does not utilize cryptographic password hashing (bcrypt) or signed JWT tokens.

---

## 13. Future Improvements

1. **Backend Integration:** Connect to a RESTful or GraphQL API using Node.js/Express with PostgreSQL or MongoDB.
2. **Interactive GIS Maps:** Integrate Leaflet.js or Mapbox to display relief camps, flood inundation layers, and road accessibility visually.
3. **SMS / WhatsApp Alerts:** Integrate Twilio or Web Push Notifications to broadcast urgent dispatch orders directly to volunteer mobile phones.
4. **QR Code Verification:** Generate verifiable QR codes on dispatch delivery slips to verify consignment handoffs at field camps.

---

## 14. Steps to Run the Project

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18.x or 20.x+ recommended)
- Modern web browser (Chrome, Edge, Firefox, or Safari)

### Installation & Execution

1. **Open Terminal / PowerShell** in the project folder:
   ```bash
   cd c:\Users\sonof\OneDrive\Desktop\html
   ```

2. **Install Dependencies** (if not already installed):
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   The terminal will provide a local URL (typically `http://localhost:5173/`).

4. **Open in Browser:**
   Navigate to `http://localhost:5173/` in your web browser.

5. **Demo Logins:**
   On the login screen, click any of the one-click demo buttons (**Administrator**, **Coordinator**, or **Volunteer**) and click **Enter Command Center**.

6. **Production Build & Preview:**
   ```bash
   npm run build
   npm run preview
   ```

---

*ResQNet – Built with precision for the Academic Internet Programming Practical Examination & Viva.*

