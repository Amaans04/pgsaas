export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

export function validateEmail(email) {
  const normalized = normalizeEmail(email);
  if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    return 'Enter a valid email address';
  }
  if (normalized.length > 254) {
    return 'Email address is too long';
  }
  return null;
}

export function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (password.length > 128) {
    return 'Password must be at most 128 characters';
  }
  if (!/[a-zA-Z]/.test(password)) {
    return 'Password must include at least one letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must include at least one number';
  }
  return null;
}

export function validatePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return 'Enter a valid phone number (10–15 digits)';
  }
  return null;
}

export function validateName(name) {
  const trimmed = String(name || '').trim();
  if (trimmed.length < 2) {
    return 'Name must be at least 2 characters';
  }
  if (trimmed.length > 80) {
    return 'Name is too long';
  }
  return null;
}
