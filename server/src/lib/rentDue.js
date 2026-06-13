export function computeRentDueDate(month, year, dueDay = 5) {
  const calendarMonth = Number(month);
  const calendarYear = Number(year);
  const lastDay = new Date(calendarYear, calendarMonth, 0).getDate();
  const day = Math.min(Math.max(1, Number(dueDay) || 5), lastDay);
  return `${calendarYear}-${String(calendarMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
