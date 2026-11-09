export function getMostRecentSunday(date?: Date): string {
  const currentDate = date ?? new Date();
  const sunday = new Date(currentDate);
  sunday.setHours(0, 0, 0, 0);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  const year = sunday.getFullYear();
  const month = String(sunday.getMonth() + 1).padStart(2, '0');
  const day = String(sunday.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatMeetingDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatMeetingType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
