const PHONE_PATTERN = /^\+?[0-9][0-9\s\-().]{5,20}$/;

export const PHONE_PLACEHOLDER = "+251 9XX XXX XXX";

export function normalizePhone(value: string) {
  return value.replace(/[\s\-().]/g, "");
}

export function isValidPhone(value: string) {
  const digits = normalizePhone(value).replace(/^\+/, "");
  return digits.length >= 7 && digits.length <= 15 && PHONE_PATTERN.test(value.trim());
}
