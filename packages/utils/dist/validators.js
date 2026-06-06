export const isPhoneNumber = (value) => /^\+?[0-9]{7,15}$/.test(value.trim());
export const isEmail = (value) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
