import type { Stats } from '@/types';

export function getTimestampFromDate(date: Date): number {
    return date.getTime();
}

export function getDateFromTimestamp(timestamp: number): Date {
    return new Date(timestamp);
}

export function timestampIsInMonth(
    timestamp: number,
    year: number,
    month: number
): boolean {
    const firstDay = new Date(year, month, 1).getTime();
    const lastDay = new Date(year, month + 1, 0).getTime();
    return timestamp >= firstDay && timestamp <= lastDay;
}

export function timestampIsInDay(timestamp: number, day: Date): boolean {
    const startOfDay = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate()
    ).getTime();
    const endOfDay = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate() + 1
    ).getTime();
    return timestamp >= startOfDay && timestamp <= endOfDay;
}

export function getTimestampOfMonth(timestamps: number[]): number[] {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    return timestamps.filter((timestamp: number) =>
        timestampIsInMonth(timestamp, year, month)
    );
}

export function generateMonthlyStats(timestamps: number[]): Stats[] {
    const today = new Date();
    const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
    ).getDate();
    const stats = [];

    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(today.getFullYear(), today.getMonth(), i);
        const numberOfTimestampsOfToday = getTimestampsOfDate(
            timestamps,
            date
        ).length;
        stats.push({
            date: date.toISOString(),
            pomos: numberOfTimestampsOfToday,
        });
    }

    return stats;
}

export function getDayOfIsoDate(isoDate: string): string {
    return isoDate.split('T')[0].slice(-2);
}

export function timestampIsInWeek(
    timestamp: number,
    firstDayOfWeek: Date,
    lastDayOfWeek: Date
): boolean {
    return (
        timestamp >= firstDayOfWeek.getTime() &&
        timestamp <= lastDayOfWeek.getTime()
    );
}

export function getTimestampsOfWeek(timestamps: number[]): number[] {
    const today = new Date();
    const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
    );
    const lastDayOfWeek = new Date(today.setDate(startOfWeek.getDate() + 6));

    return timestamps.filter((timestamp: number) =>
        timestampIsInWeek(timestamp, startOfWeek, lastDayOfWeek)
    );
}

export function generateWeeklyStats(timestamps: number[]): Stats[] {
    const today = new Date();
    const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay()
    );
    const stats = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(
            startOfWeek.getFullYear(),
            startOfWeek.getMonth(),
            startOfWeek.getDate() + i
        );
        const numberOfTimestampsOfToday = getTimestampsOfDate(
            timestamps,
            date
        ).length;
        stats.push({
            date: date.toISOString(),
            pomos: numberOfTimestampsOfToday,
        });
    }

    return stats;
}

export function getWeekdayNameOfIsoDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString('en-US', { weekday: 'long' });
}

export function getTimestampsOfDate(
    timestamps: number[],
    date: Date
): number[] {
    return timestamps.filter((timestamp: number) =>
        timestampIsInDay(timestamp, date)
    );
}

export function getTimestampsOfToday(timestamps: number[]): number[] {
    return getTimestampsOfDate(timestamps, new Date());
}
