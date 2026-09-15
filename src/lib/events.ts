import type { CollectionEntry } from 'astro:content';

type Event = CollectionEntry<'events'>;

function startOfToday(date: Date): Date {
  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  return today;
}

function eventEndDate(event: Event): Date | undefined {
  return event.data.endDate ?? event.data.startDate;
}

function ascendingByStartDate(a: Event, b: Event): number {
  return (a.data.startDate?.getTime() ?? Infinity) - (b.data.startDate?.getTime() ?? Infinity);
}

function descendingByStartDate(a: Event, b: Event): number {
  return (b.data.startDate?.getTime() ?? 0) - (a.data.startDate?.getTime() ?? 0);
}

export function getEventListings(events: Event[], date = new Date()) {
  const today = startOfToday(date);
  const published = events.filter((event) => event.data.published);
  const upcoming = published
    .filter((event) => {
      const endDate = eventEndDate(event);
      return !endDate || endDate >= today;
    })
    .sort(ascendingByStartDate);
  const past = published
    .filter((event) => {
      const endDate = eventEndDate(event);
      return endDate && endDate < today;
    })
    .sort(descendingByStartDate);

  return { upcoming, past };
}

export function getCurrentOrLatestEvent(events: Event[], date = new Date()): Event | undefined {
  const { upcoming, past } = getEventListings(events, date);
  return upcoming[0] ?? past[0];
}
