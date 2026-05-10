import { describe, it, expect } from 'vitest';
import formatDate, {
	formatDateTime,
	formatDateWithMilliseconds,
	formatDateTimeWithSecondsAndTimezone,
	getCalendarDayInZone,
	startOfDayInZone,
	convertDateToTimezone,
	formatDateInZone,
	formatDateTimeInZone,
} from './format_date';

describe('format_date utils', () => {
	const TEST_DATE_STRING = '2026-05-09T10:30:00Z'; // UTC time

	describe('formatDate', () => {
		it('formats a date string correctly', () => {
			// In local time, this might be May 9, depending on the machine's timezone
			const formatted = formatDate(TEST_DATE_STRING);
			expect(formatted).toContain('May');
			expect(formatted).toContain('2026');
		});

		it('handles invalid dates gracefully', () => {
			expect(formatDate('invalid-date')).toBe('Invalid Date');
		});
	});

	describe('formatDateTime', () => {
		it('formats a date and time string correctly', () => {
			const formatted = formatDateTime(TEST_DATE_STRING);
			expect(formatted).toContain('May');
			expect(formatted).toContain('2026');
			expect(formatted).toMatch(/\d{2}:\d{2} (AM|PM)/);
		});

		it('handles invalid dates', () => {
			expect(formatDateTime('invalid')).toBe('Invalid Date');
		});
	});

	describe('formatDateWithMilliseconds', () => {
		it('formats a date with seconds correctly', () => {
			const formatted = formatDateWithMilliseconds(TEST_DATE_STRING);
			// The function currently doesn't add milliseconds as per the code, but it adds seconds
			expect(formatted).toMatch(/\d{2}:\d{2}:\d{2} (AM|PM)/);
		});
	});

	describe('formatDateTimeWithSecondsAndTimezone', () => {
		it('includes timezone abbreviation', () => {
			const formatted = formatDateTimeWithSecondsAndTimezone(TEST_DATE_STRING);
			// Note: this function uses hour12: false
			expect(formatted).toContain('2026');
			// Look for a standard timezone abbreviation or GMT offset
			expect(formatted).toMatch(/[A-Z]{3,4}|GMT[+-]\d{1,2}/);
		});
	});

	describe('Timezone specific formatting', () => {
		it('getCalendarDayInZone (utc)', () => {
			const date = new Date('2026-05-09T23:30:00Z');
			const { year, month, date: d } = getCalendarDayInZone(date, 'utc');
			expect(year).toBe(2026);
			expect(month).toBe(4); // 0-indexed, so 4 is May
			expect(d).toBe(9);
		});

		it('startOfDayInZone (utc)', () => {
			const startOfDay = startOfDayInZone(2026, 4, 9, 'utc');
			expect(startOfDay.toISOString()).toBe('2026-05-09T00:00:00.000Z');
		});

		it('convertDateToTimezone (utc -> local -> utc)', () => {
			const originalDate = new Date('2026-05-09T23:30:00Z');
			const sameDate = convertDateToTimezone(originalDate, 'utc', 'utc');
			expect(sameDate.getTime()).toBe(originalDate.getTime());
		});

		it('formatDateInZone (utc)', () => {
			const date = new Date('2026-05-09T23:30:00Z');
			const formatted = formatDateInZone(date, 'utc');
			expect(formatted).toBe('May 09, 2026');
		});

		it('formatDateTimeInZone (utc)', () => {
			const date = new Date('2026-05-09T23:30:00Z');
			const formatted = formatDateTimeInZone(date, 'utc');
			expect(formatted).toContain('May 09, 2026');
			expect(formatted).toContain('11:30 PM');
		});
	});
});
