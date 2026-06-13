export function getRoomRent(room) {
  return room?.rentAmount ?? room?.rent ?? 0;
}

export function getSharingCapacity(room) {
  return room?.sharingCapacity ?? room?.numberOfGuests ?? 1;
}

export function getRoomStatus(room) {
  const occupancy = room?.currentOccupancy ?? 0;
  const capacity = getSharingCapacity(room);
  if (occupancy <= 0) return 'vacant';
  if (occupancy >= capacity) return 'full';
  return 'partial';
}

export function getRoomHouseNumber(room) {
  return room?.roomNumber ?? room?.houseNumber ?? '';
}

export function getTenantHouseNumber(tenant) {
  return tenant?.roomNumber ?? '';
}

export const ROOM_STATUS_STYLES = {
  vacant: 'bg-orange-100 text-orange-700',
  partial: 'bg-yellow-100 text-yellow-700',
  full: 'bg-green-100 text-green-700',
  occupied: 'bg-yellow-100 text-yellow-700',
};

export const TENANT_STATUS_STYLES = {
  active: 'bg-green-100 text-green-700',
  notice_period: 'bg-yellow-100 text-yellow-700',
  moved_out: 'bg-gray-100 text-gray-600',
};

export const TENANT_STATUS_LABELS = {
  active: 'Active',
  notice_period: 'Notice Period',
  moved_out: 'Moved Out',
};
