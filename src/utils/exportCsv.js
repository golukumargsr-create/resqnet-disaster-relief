/**
 * ResQNet - Disaster Relief Coordination Platform
 * utils/exportCsv.js
 * 
 * Simple, vanilla JavaScript CSV export function.
 * Converts an array of objects to downloadable .csv file in the browser.
 */

export function exportToCSV(filename, data) {
  if (!data || !data.length) {
    alert('No data available to export.');
    return;
  }

  // Extract column headers from object keys
  const headers = Object.keys(data[0]);

  // Construct CSV string
  const csvRows = [];
  
  // Header row
  csvRows.push(headers.map(h => `"${h}"`).join(','));

  // Data rows
  data.forEach(item => {
    const row = headers.map(header => {
      let val = item[header] !== undefined && item[header] !== null ? String(item[header]) : '';
      // Escape double quotes inside values
      val = val.replace(/"/g, '""');
      return `"${val}"`;
    });
    csvRows.push(row.join(','));
  });

  const csvString = csvRows.join('\r\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

  // Browser download trigger
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

