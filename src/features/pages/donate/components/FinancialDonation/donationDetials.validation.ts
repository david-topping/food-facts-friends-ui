export const PRESETS = [10, 25, 50] as const;
export const MIN_AMOUNT = 1;
export const MAX_AMOUNT = 10000;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isNumericInput(value: string) {
  return value === "" || /^\d*\.?\d*$/.test(value);
}
