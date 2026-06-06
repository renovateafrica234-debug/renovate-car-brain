export const isPhoneNumber = (value: string): boolean =>
  /^\+?[0-9]{7,15}$/.test(value.trim());

export const isEmail = (value: string): boolean =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.trim());
