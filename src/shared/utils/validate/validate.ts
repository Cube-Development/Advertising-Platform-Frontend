import { formDataLength } from "@entities/wallet";

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

export function isValidEmailCode(value: string): boolean {
  const length = formDataLength.email_code - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidINN(value: string): boolean {
  const length = formDataLength.INN - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidAmount(value: string): boolean {
  const length = formDataLength.INN - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidPNFL(value: string): boolean {
  const length = formDataLength.PNFL - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidMFO(value: string): boolean {
  const length = formDataLength.bank_mfo - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidAccount(value: string): boolean {
  const length = formDataLength.account - 1;
  const Regex = new RegExp(`^[1-9]\\d{${length}}$`);
  return Regex.test(value);
}

export function isValidPhoneNumber(value: string): boolean {
  const phoneRegex = /^(\+?998)[1-9]\d{8}$/;
  return phoneRegex.test(value);
}

export function isValidFullDate(value: string): boolean {
  const dateRegex =
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19[0-9]{2}|20[0-4][0-9]|2050)$/;
  if (!dateRegex.test(value)) {
    return false;
  }
  const [day, month, year] = value.split(".").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export function isValidCardDate(value: string): boolean {
  const cardDateRegex = /^(0[1-9]|1[0-2])\/(2[3-9]|[3-9][0-9])$/;
  if (!cardDateRegex.test(value)) {
    return false;
  }
  const [month, year] = value.split("/").map(Number);
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }
  return true;
}
