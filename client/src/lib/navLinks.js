export const ownerLinks = (pgId) => [
  { to: `/${pgId}/owner/dashboard`, label: 'Dashboard' },
  { to: `/${pgId}/owner/rooms`, label: 'Rooms' },
  { to: `/${pgId}/owner/tenants`, label: 'Tenants' },
  { to: `/${pgId}/owner/add-tenant`, label: 'Add Tenant' },
  { to: `/${pgId}/owner/payments`, label: 'Payments' },
  { to: `/${pgId}/owner/complaints`, label: 'Complaints' },
  { to: `/${pgId}/owner/staff`, label: 'Staff' },
  { to: `/${pgId}/owner/documents`, label: 'Documents' },
];

export const tenantLinks = (pgId) => [
  { to: `/${pgId}/tenant/portal`, label: 'Home' },
  { to: `/${pgId}/tenant/rent`, label: 'Rent' },
  { to: `/${pgId}/tenant/complaints`, label: 'Complaints' },
  { to: `/${pgId}/tenant/documents`, label: 'Documents' },
];

export const staffLinks = (pgId) => [
  { to: `/${pgId}/staff/dashboard`, label: 'Dashboard' },
  { to: `/${pgId}/staff/complaints`, label: 'Complaints' },
];
