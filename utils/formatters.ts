// utils/formatters.ts

/**
 * Formats an ISO 8601 date string into a more readable format.
 * @param isoDate The ISO date string to format.
 * @returns A formatted date string (e.g., "October 20, 2023").
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a number as Indonesian Rupiah (IDR).
 * @param amount The number to format.
 * @returns A formatted currency string (e.g., "Rp 2,500,000,000").
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
