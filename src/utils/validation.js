/**
 * ResQNet - Disaster Relief Coordination Platform
 * utils/validation.js
 * 
 * Simple form validation functions.
 * Returns { isValid: boolean, errors: { [field]: string } }
 */

// Basic phone number validation (10 digits)
export function isValidPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^\d{10}$/.test(cleaned);
}

// Relief Request Form Validation
export function validateRequest(data) {
  const errors = {};

  if (!data.area || !data.area.trim()) {
    errors.area = 'Affected area name is required.';
  }
  if (!data.resource || !data.resource.trim()) {
    errors.resource = 'Resource requirement is required.';
  }
  if (!data.quantity || Number(data.quantity) <= 0) {
    errors.quantity = 'Quantity must be a positive number greater than 0.';
  }
  if (!data.priority) {
    errors.priority = 'Priority level is required.';
  }
  if (!data.contactPerson || !data.contactPerson.trim()) {
    errors.contactPerson = 'Contact person name is required.';
  }
  if (!data.contactNumber || !data.contactNumber.trim()) {
    errors.contactNumber = 'Contact number is required.';
  } else if (!isValidPhone(data.contactNumber)) {
    errors.contactNumber = 'Please enter a valid 10-digit phone number.';
  }
  if (!data.description || !data.description.trim()) {
    errors.description = 'Brief emergency situation description is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Resource Inventory Form Validation
export function validateResource(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Resource item name is required.';
  }
  if (!data.category || !data.category.trim()) {
    errors.category = 'Resource category is required.';
  }
  if (data.quantity === '' || data.quantity === undefined || Number(data.quantity) < 0) {
    errors.quantity = 'Quantity must be 0 or a positive number.';
  }
  if (!data.unit || !data.unit.trim()) {
    errors.unit = 'Measurement unit is required (e.g., packets, bottles, kits).';
  }
  if (!data.location || !data.location.trim()) {
    errors.location = 'Storage warehouse or hub location is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Affected Area Form Validation
export function validateArea(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Area/Zone name is required.';
  }
  if (!data.district || !data.district.trim()) {
    errors.district = 'District name is required.';
  }
  if (!data.state || !data.state.trim()) {
    errors.state = 'State is required.';
  }
  if (!data.disasterType) {
    errors.disasterType = 'Disaster classification is required.';
  }
  if (data.population === '' || data.population === undefined || Number(data.population) < 0) {
    errors.population = 'Estimated affected population must be a positive number.';
  }
  if (!data.severity) {
    errors.severity = 'Disaster severity level is required.';
  }
  if (!data.requiredAssistance || !data.requiredAssistance.trim()) {
    errors.requiredAssistance = 'Immediate assistance requirements must be stated.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Volunteer Form Validation
export function validateVolunteer(data) {
  const errors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'Volunteer full name is required.';
  }
  if (!data.contact || !data.contact.trim()) {
    errors.contact = 'Contact phone number is required.';
  } else if (!isValidPhone(data.contact)) {
    errors.contact = 'Please enter a valid 10-digit phone number.';
  }
  if (!data.assignedTask || !data.assignedTask.trim()) {
    errors.assignedTask = 'Assigned emergency skill or task is required.';
  }
  if (!data.availability) {
    errors.availability = 'Availability status is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Resource Allocation Validation
export function validateAllocation(data, availableStock = 0, requestedQty = null) {
  const errors = {};

  if (!data.area || !data.area.trim()) {
    errors.area = 'Target affected area is required.';
  }
  if (!data.resourceId) {
    errors.resourceId = 'Please select a resource from inventory.';
  }
  
  const allocQty = Number(data.quantity);
  if (!data.quantity || isNaN(allocQty) || allocQty <= 0) {
    errors.quantity = 'Allocation quantity must be a positive number greater than 0.';
  } else if (allocQty > availableStock) {
    errors.quantity = `Allocation quantity (${allocQty}) exceeds currently available stock (${availableStock})!`;
  } else if (requestedQty !== null && allocQty > requestedQty) {
    errors.quantity = `Allocation quantity (${allocQty}) exceeds the total requested requirement (${requestedQty}).`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

