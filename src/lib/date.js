const MONTH_YEAR = { month: "short", year: "numeric" };

export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", MONTH_YEAR);
}

export function formatPeriod(startDate, endDate, isCurrentlyWorking) {
  const start = formatDate(startDate);
  const end = isCurrentlyWorking ? "Present" : formatDate(endDate);
  return `${start} – ${end}`;
}
