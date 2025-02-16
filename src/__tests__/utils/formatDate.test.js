import { formatDate, formatTooltip } from '../../utils/formatDate';

test('formats a date correctly', () => {
    expect(formatDate('2025-02-16T15:15:00Z')).toBe('Feb 16, 2025');
});

test('formats a tooltip correctly', () => {
    expect(formatTooltip('2025-02-16T15:15:00Z')).toBe('Feb 16, 2025, 10:15 AM EST');
});
