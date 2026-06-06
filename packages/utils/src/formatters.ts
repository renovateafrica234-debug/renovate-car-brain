export const displayCurrency = (amount: number): string =>
  `₦${amount.toLocaleString("en-NG")}`;

export const formatDate = (date: string | Date): string =>
  new Date(date).toISOString();
