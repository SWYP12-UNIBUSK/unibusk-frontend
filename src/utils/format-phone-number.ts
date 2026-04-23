export function formatPhoneNumber(value: string): string {
  const raw = value.replace(/\D/g, '');

  if (raw.startsWith('02')) {
    const digits = raw.slice(0, 10);
    if (digits.length <= 2)
      return digits;
    if (digits.length <= 5)
      return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9)
      return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  const digits = raw.slice(0, 11);
  if (digits.length <= 3)
    return digits;
  if (digits.length <= 7)
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}
