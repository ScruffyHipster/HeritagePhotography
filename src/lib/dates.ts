interface EventDates {
  startDate?: Date;
  endDate?: Date;
  dateLabel?: string;
}

export function formatEventDate(event: EventDates): string {
  if (event.dateLabel) return event.dateLabel;
  if (!event.startDate) return 'Dates TBC';

  const start = event.startDate;
  const end = event.endDate;
  if (!end) {
    return start.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()}–${end.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })}`;
  }

  return `${start.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })}–${end.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
}
