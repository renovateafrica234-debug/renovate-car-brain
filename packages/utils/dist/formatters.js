export const displayCurrency = (amount) => `₦${amount.toLocaleString("en-NG")}`;
export const formatDate = (date) => new Date(date).toISOString();
