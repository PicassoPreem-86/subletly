import {
  format,
  parseISO,
  isWithinInterval,
  eachDayOfInterval,
  isBefore,
  isAfter,
  addMonths,
  startOfMonth,
  endOfMonth,
  isSameDay,
  differenceInDays,
} from 'date-fns';

/**
 * Check if a date is within the available range
 */
export function isDateAvailable(
  date: Date,
  availableFrom: string,
  availableTo: string
): boolean {
  try {
    const from = parseISO(availableFrom);
    const to = parseISO(availableTo);

    return isWithinInterval(date, { start: from, end: to });
  } catch {
    return false;
  }
}

/**
 * Get all available dates in a range
 */
export function getAvailableDates(
  availableFrom: string,
  availableTo: string
): Date[] {
  try {
    const from = parseISO(availableFrom);
    const to = parseISO(availableTo);

    return eachDayOfInterval({ start: from, end: to });
  } catch (error) {
    return [];
  }
}

/**
 * Check if a date is in the past
 */
export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isBefore(date, today);
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return isAfter(date, today);
}

/**
 * Format date for display
 */
export function formatDateForDisplay(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
}

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
}

/**
 * Get months to display in calendar
 */
export function getCalendarMonths(
  availableFrom: string,
  availableTo: string,
  maxMonths: number = 3
): Date[] {
  try {
    const from = parseISO(availableFrom);
    const to = parseISO(availableTo);
    const monthsToShow: Date[] = [];

    let currentMonth = startOfMonth(from);
    const endMonth = endOfMonth(to);

    while (
      (isBefore(currentMonth, endMonth) || isSameDay(currentMonth, endMonth)) &&
      monthsToShow.length < maxMonths
    ) {
      monthsToShow.push(currentMonth);
      currentMonth = addMonths(currentMonth, 1);
    }

    return monthsToShow;
  } catch (error) {
    return [new Date()];
  }
}

/**
 * Get disabled dates (past dates and dates outside available range)
 */
export function getDisabledDates(
  availableFrom: string,
  availableTo: string
): { before?: Date; after?: Date } {
  try {
    const from = parseISO(availableFrom);
    const to = parseISO(availableTo);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Disable dates before today or before availableFrom (whichever is later)
    const beforeDate = isAfter(from, today) ? from : today;

    return {
      before: beforeDate,
      after: to,
    };
  } catch (error) {
    return {
      before: new Date(),
    };
  }
}

/**
 * Calculate length of stay in days
 */
export function calculateStayLength(checkIn: Date, checkOut: Date): number {
  return differenceInDays(checkOut, checkIn);
}

/**
 * Check if stay meets minimum requirement
 */
export function meetsMinimumStay(
  checkIn: Date,
  checkOut: Date,
  minStayMonths: number | null
): boolean {
  if (!minStayMonths) return true;

  const stayDays = calculateStayLength(checkIn, checkOut);
  const minStayDays = minStayMonths * 30; // Approximate

  return stayDays >= minStayDays;
}

/**
 * Generate time slots for tour scheduling (9 AM - 5 PM)
 */
export function generateTimeSlots(): { value: string; label: string }[] {
  const slots: { value: string; label: string }[] = [];

  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const period = hour >= 12 ? 'PM' : 'AM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;

      slots.push({
        value: time24,
        label: time12,
      });
    }
  }

  return slots;
}

/**
 * Get minimum selectable date (today or availableFrom, whichever is later)
 */
export function getMinSelectableDate(availableFrom: string): Date {
  const from = parseISO(availableFrom);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return isAfter(from, today) ? from : today;
}

/**
 * Format date range for display
 */
export function formatDateRange(from: string, to: string): string {
  const fromDate = parseISO(from);
  const toDate = parseISO(to);

  return `${format(fromDate, 'MMM dd, yyyy')} - ${format(toDate, 'MMM dd, yyyy')}`;
}

/**
 * Check if dates are the same day
 */
export function areSameDay(date1: Date, date2: Date): boolean {
  return isSameDay(date1, date2);
}
