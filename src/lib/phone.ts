const PHONE_PATTERN = /^\+\d[\d\s\-().]{5,20}$/;
const E164_DIGITS = /^[1-9]\d{6,14}$/;

export const PHONE_PLACEHOLDER = "+<country code> XXX XXX XXX";

export const PHONE_ERROR_MESSAGE =
    "Enter a valid phone number with your country code, e.g. +251 912 345 678";

export function normalizePhone(value: string) {
    return value.replace(/[\s\-().]/g, "");
}

export function isValidPhone(value: string) {
    const raw = value.trim();
    if (!PHONE_PATTERN.test(raw)) return false;
    return E164_DIGITS.test(normalizePhone(raw).slice(1));
}
