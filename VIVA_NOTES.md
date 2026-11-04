# ResQNet – Practical Viva Examination Guide & Notes

This reference guide contains **25+ commonly asked viva examination questions with concise, beginner-friendly answers**, specifically aligned with the **ResQNet Disaster Relief Resource Coordination Platform** project.

Use this document to prepare for practical questions on **HTML, CSS, JavaScript, React concepts, localStorage, and application architecture**.

---

## Table of Contents
1. [Core Project Overview Questions (Q1 - Q5)](#1-core-project-overview-questions)
2. [HTML5 Concepts in ResQNet (Q6 - Q9)](#2-html5-concepts-in-resqnet)
3. [CSS & Responsive Design Concepts (Q10 - Q13)](#3-css--responsive-design-concepts)
4. [JavaScript Core & ES6+ Concepts (Q14 - Q17)](#4-javascript-core--es6-concepts)
5. [React Basics & Functional Components (Q18 - Q21)](#5-react-basics--functional-components)
6. [LocalStorage & Data Persistence (Q22 - Q24)](#6-localstorage--data-persistence)
7. [Resource Allocation & Business Logic (Q25 - Q28)](#7-resource-allocation--business-logic)

---

## 1. Core Project Overview Questions

### Q1. What is ResQNet and what problem does it solve?
**Answer:**
ResQNet is a centralized web-based disaster relief resource coordination platform. During catastrophes like floods, cyclones, or earthquakes, relief materials (food packets, drinking water, medical kits, tents) and volunteer personnel must be deployed rapidly across affected areas. ResQNet prevents logistics failures by:
1. Recording real-time relief requests with urgency priorities (Critical, High, Medium, Low).
2. Tracking inventory in regional warehouses.
3. Preventing over-allocation or negative inventory balances.
4. Managing volunteer assignments to avoid duplicate deployments.

---

### Q2. Why did you choose React with Vite for this project instead of plain HTML/JS or Next.js?
**Answer:**
- **React** allows us to divide the UI into modular, reusable functional components (like `StatCard`, `Modal`, `StatusBadge`, `Navbar`, `Sidebar`). When state changes (e.g. allocating supplies), React re-renders only the affected parts of the DOM efficiently.
- **Vite** is a modern build tool that provides instantaneous server startup and Hot Module Replacement (HMR) using native ES Modules, which makes development significantly faster than older tools like Webpack.
- We deliberately avoided heavy backend frameworks (like Next.js with server-side rendering or Supabase) to keep the project completely understandable, client-side, and simple to demonstrate during viva without server configuration hurdles.

---

### Q3. How does ResQNet maintain data without a database like MongoDB or MySQL?
**Answer:**
ResQNet uses the browser's built-in **HTML5 Web Storage API (`localStorage`)**. Data is serialized into JSON strings and stored on the user's computer under dedicated keys (e.g., `resqnet_requests`, `resqnet_resources`). This allows full CRUD capability and persistent state across page reloads without requiring an external backend database server.

---

### Q4. Can multiple users edit data simultaneously in this architecture?
**Answer:**
In this client-side academic version, data is stored in the local browser's `localStorage`, meaning it is scoped to the specific computer and browser instance. In a future production upgrade, the storage utility functions (`src/utils/storage.js`) can easily be pointed to REST API endpoints connected to a multi-user database such as PostgreSQL or MongoDB.

---

### Q5. What are the main user roles in the platform and how do they differ?
**Answer:**
1. **Administrator:** Full authority across all modules—creating requests, adjusting warehouse quantities, deploying volunteers, and resetting demo data.
2. **Relief Coordinator:** Focused on evaluating incoming requests, reviewing warehouse stock, and executing supply dispatches through the Allocation Hub.
3. **Field Volunteer:** Focused on inspecting mission assignments, viewing target affected zones, and updating field status upon delivery.

---

## 2. HTML5 Concepts in ResQNet

### Q6. How are HTML concepts utilized inside React JSX?
**Answer:**
JSX (JavaScript XML) is a syntax extension that allows writing HTML-like markup inside JavaScript files. At build time, Vite transpile JSX into standard `React.createElement()` JavaScript function calls.
- Class names use `className` instead of `class` because `class` is a reserved keyword in JavaScript.
- Event listeners use camelCase syntax (e.g., `onClick`, `onChange`, `onSubmit`).
- Form elements like `<input>`, `<select>`, and `<textarea>` are rendered using semantic HTML tags.

---

### Q7. What semantic HTML tags did you use in ResQNet?
**Answer:**
We used semantic HTML elements to ensure accessibility and clear document structure:
- `<header>` for the top navigation bar (`Navbar.jsx`).
- `<aside>` for the collapsible navigation drawer (`Sidebar.jsx`).
- `<main>` for the central view container where page content renders.
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` for structured tabular data in Requests, Inventory, Areas, and Volunteers.
- `<form>`, `<label>`, `<input>`, `<select>`, `<button>` for all user input forms.

---

### Q8. What is the role of `index.html` in a Single Page Application (SPA)?
**Answer:**
In an SPA, `index.html` is the only physical HTML file served to the browser. It contains a single root mount point:
```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```
React mounts the entire component hierarchy inside this `<div id="root">` dynamically using `ReactDOM.createRoot()`.

---

### Q9. How did you implement form validation using HTML and JavaScript?
**Answer:**
We used controlled input properties combined with JavaScript validation logic in `src/utils/validation.js`:
- Phone numbers are verified for exactly 10 numeric digits using regex: `/^\d{10}$/.test(cleaned)`.
- Quantities are checked for positive non-zero numbers: `Number(quantity) > 0`.
- Allocation quantities are compared against available stock before permitting submission.
- Validation errors are displayed under each form input with red error tags (`<span className="form-error">`).

---

## 3. CSS & Responsive Design Concepts

### Q10. What are CSS Custom Properties (Variables) and where did you use them?
**Answer:**
CSS Custom Properties (Variables) store reusable values defined with a `--` prefix in the `:root` pseudo-class. They allow consistent theming and easy maintenance.
In `src/index.css`:
```css
:root {
  --primary: #10243A;      /* Deep Navy Blue */
  --secondary: #0D9488;    /* Teal */
  --bg-page: #F4F7FA;      /* Light Grey */
  --priority-critical: #EF4444; /* Red */
  --priority-high: #F97316;     /* Orange */
}
```
If we need to adjust the primary brand color, modifying `--primary` in `:root` automatically updates the sidebar, table headers, and command titles across the entire app.

---

### Q11. How is responsive design implemented in ResQNet?
**Answer:**
We use a mobile-first approach with CSS Media Queries (`@media`), CSS Flexbox, and CSS Grid:
1. **Desktop ($> 1024\text{px}$):** Sidebar is fixed on the left (`width: 260px`), dashboard stat cards render in a 4-column grid (`grid-template-columns: repeat(4, 1fr)`).
2. **Tablet ($\le 1024\text{px}$):** Stat cards collapse into a 2-column grid.
3. **Mobile ($\le 768\text{px}$):**
   - Sidebar transforms off-screen (`transform: translateX(-100%)`) and opens as a sliding drawer via a mobile hamburger button.
   - Tables are wrapped in `.table-responsive` with `overflow-x: auto` to prevent horizontal clipping.
   - Form grids collapse from 2 columns to a single stacked column.

---

### Q12. Explain CSS Grid vs CSS Flexbox with examples from your code.
**Answer:**
- **CSS Grid** is 2-dimensional (handles rows and columns simultaneously). We used Grid for:
  - The 4-card dashboard metric row: `grid-template-columns: repeat(4, 1fr); gap: 1.25rem;`
  - Two-column modal form layouts: `grid-template-columns: repeat(2, 1fr);`
- **CSS Flexbox** is 1-dimensional (handles either a row OR a column). We used Flexbox for:
  - Aligning navbar items: `display: flex; align-items: center; justify-content: space-between;`
  - Badges: `display: inline-flex; align-items: center; gap: 0.3rem;`

---

### Q13. How did you create the pulsing live indicator in the top navbar?
**Answer:**
Using pure CSS `@keyframes`:
```css
.pulse-dot {
  width: 8px;
  height: 8px;
  background: #22C55E;
  border-radius: 50%;
  animation: pulse-green 2s infinite;
}
@keyframes pulse-green {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}
```

---

## 4. JavaScript Core & ES6+ Concepts

### Q14. What JavaScript array methods are used in this project?
**Answer:**
We extensively used standard ES6 array methods across `src/utils/`:
1. **`filter()`:** To search records and filter by status/priority without mutating original data.
   ```javascript
   const pending = requests.filter(r => r.status === 'Pending');
   ```
2. **`map()`:** To render lists in JSX and transform objects for charts.
   ```javascript
   requests.map(req => <tr key={req.id}>...</tr>)
   ```
3. **`reduce()`:** To calculate cumulative numbers, such as total affected population:
   ```javascript
   const totalPop = areas.reduce((sum, a) => sum + Number(a.population), 0);
   ```
4. **`findIndex()`:** To locate an item's array position for updates:
   ```javascript
   const idx = list.findIndex(item => item.id === targetId);
   ```
5. **`sort()`:** To sort requests chronologically by date:
   ```javascript
   list.sort((a, b) => new Date(b.date) - new Date(a.date));
   ```

---

### Q15. What is the Object Spread Operator (`...`) and where did you use it?
**Answer:**
The spread operator (`...`) creates a shallow copy of an object or array, allowing immutable updates.
When editing a request in `src/utils/storage.js`:
```javascript
list[index] = { ...list[index], ...updatedFields };
```
This preserves existing fields (like `id` and `date`) while overwriting only the updated fields (like `status` or `priority`).

---

### Q16. How does the CSV Export feature work in pure JavaScript?
**Answer:**
In `src/utils/exportCsv.js`:
1. Extract object keys as header strings joined by commas.
2. Iterate through each row and escape special characters.
3. Instantiate a browser `Blob` object:
   ```javascript
   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
   ```
4. Generate a temporary object URL with `URL.createObjectURL(blob)`.
5. Create an invisible `<a>` element, set `download="filename.csv"`, programmatically trigger `.click()`, and revoke the URL.
This requires zero backend dependencies!

---

### Q17. How do you generate unique IDs like `REQ-1001` or `RES-2001`?
**Answer:**
In `src/utils/storage.js`, the `generateId(prefix, existingList)` function inspects all existing IDs for that prefix, parses the integer suffix (e.g. `1009`), finds the highest existing number, and increments it by 1 (`1010`), returning `${prefix}-${nextNum}`.

---

## 5. React Basics & Functional Components

### Q18. What is the difference between State and Props in React?
**Answer:**
- **State (`useState`)**: Internal data owned and managed directly within a component that can change over time (e.g. `requests`, `searchTerm`, `isModalOpen`). When state changes, the component re-renders.
- **Props**: External inputs passed down from a parent component to a child component (e.g. `<StatCard label="Total Requests" value={12} />`). Props are read-only for the child component.

---

### Q19. How did you use the `useState` hook in ResQNet?
**Answer:**
`useState` declares a state variable and its updater function.
For example, managing modal visibility:
```javascript
const [isFormModalOpen, setIsFormModalOpen] = useState(false);
```
When the user clicks "Create Request", we execute `setIsFormModalOpen(true)`, which updates the state and causes the modal to render.

---

### Q20. How did you use the `useEffect` hook in ResQNet?
**Answer:**
`useEffect` performs side effects in functional components:
1. **Initial data seed loading:** In `App.jsx`, checking and seeding `localStorage` once when the application mounts (`[]` dependency array):
   ```javascript
   useEffect(() => {
     initializeStorage();
   }, []);
   ```
2. **Global keyboard listeners:** In `Modal.jsx`, attaching a `keydown` listener to close modals when the user presses the `Escape` key, and cleaning it up when unmounted.

---

### Q21. Why is the `key` prop essential when rendering lists in React?
**Answer:**
When mapping an array to JSX (e.g., `requests.map(req => <tr key={req.id}>...</tr>)`), the `key` prop gives each DOM node a stable identity. React's virtual DOM reconciliation algorithm uses keys to identify which items have changed, been added, or been removed, avoiding unnecessary re-renders of the entire list.

---

## 6. LocalStorage & Data Persistence

### Q22. What are the advantages and limitations of `localStorage`?
**Answer:**
- **Advantages:**
  - Persists data across browser refreshes and tab closures.
  - No server, database, or connection string setup needed.
  - Synchronous and easy to read/write with `getItem()` and `setItem()`.
- **Limitations:**
  - Only stores DOMString data (requires `JSON.stringify()` and `JSON.parse()`).
  - Restricted to ~5MB per origin.
  - Accessible only within the same browser origin (no cross-machine syncing).

---

### Q23. Why do we need `JSON.stringify()` and `JSON.parse()` with `localStorage`?
**Answer:**
`localStorage` only stores strings.
- `JSON.stringify(object)`: Converts a complex JavaScript array or object into a serialized JSON string so it can be stored.
- `JSON.parse(string)`: Deserializes the JSON text back into a live JavaScript array or object so we can use array methods like `.filter()` and `.map()`.

---

### Q24. How does ResQNet ensure existing user data isn't wiped out on page reload?
**Answer:**
In `src/utils/storage.js`, the `initializeStorage()` function checks if a key already exists before writing default seed data:
```javascript
if (!localStorage.getItem('resqnet_requests')) {
  setStorageItem('resqnet_requests', INITIAL_REQUESTS);
}
```
If the user added new requests, `localStorage.getItem('resqnet_requests')` returns true, so existing user data is completely preserved.

---

## 7. Resource Allocation & Business Logic

### Q25. Explain the step-by-step logic when an emergency resource is allocated.
**Answer:**
In `allocateResource()` inside `src/utils/storage.js`:
1. **Validation:** Checks that $0 < \text{allocatedQuantity} \le \text{availableStock}$. If insufficient stock, it returns `{ success: false, message: 'Insufficient inventory' }`.
2. **Inventory Deduction:** Reduces warehouse stock:
   $$\text{quantity}_{\text{new}} = \text{quantity}_{\text{old}} - \text{allocatedQuantity}$$
3. **Request State Transition:** Updates the linked Relief Request status from `Pending`/`Approved` to `In Progress`.
4. **Volunteer Assignment:** Updates the assigned volunteer's availability from `Available` to `Busy`, and sets their `assignedArea`.
5. **Consignment Record:** Generates an allocation ID (`ALC-5005`) and prepends it to `resqnet_allocations`.
6. **Activity Log:** Appends an entry to `resqnet_activities`.

---

### Q26. How do you prevent negative inventory balances?
**Answer:**
We employ a two-layer safeguard:
1. **UI Layer:** The input field has `min="1"` and `max={availableStock}`, and `validateAllocation()` blocks form submission if quantity exceeds stock.
2. **Storage Logic Layer:** In `allocateResource()`:
   ```javascript
   if (currentResource.quantity < qtyToAllocate) {
     return { success: false, message: 'Insufficient inventory' };
   }
   resources[resIndex].quantity = Math.max(0, currentResource.quantity - qtyToAllocate);
   ```
   `Math.max(0, ...)` guarantees that quantity can never become negative.

---

### Q27. What happens when an allocation is marked "Delivered / Completed"?
**Answer:**
In `completeAllocation(allocationId)`:
1. The allocation record status becomes `Completed`.
2. The associated relief request status is automatically updated to `Completed`.
3. The assigned volunteer's availability status is set back to `Available`, freeing them for their next deployment.
4. A completion record is added to the live incident activity feed.

---

### Q28. How is the "Reset Demo Data" feature implemented safely?
**Answer:**
1. In `src/pages/About.jsx`, clicking "Reset Demo Data" opens a `<ConfirmDialog>`.
2. The dialog requires explicit user confirmation to prevent accidental loss.
3. Upon confirmation, `resetToDemoData()` rewrites all localStorage keys back to `INITIAL_REQUESTS`, `INITIAL_RESOURCES`, `INITIAL_AREAS`, and `INITIAL_VOLUNTEERS`, and logs a platform reset activity.
4. The React state refreshes immediately without requiring a browser reload.

---

*End of Viva Notes – Prepared for Computer Science & Engineering Practical Examination.*

