export const formatCountdown = (seconds: number) => {
    const $minutes = Math.trunc(seconds / 60);
    const $seconds = seconds % 60;

    return [$minutes > 9 ? `${$minutes}` : `0${$minutes}`, $seconds > 9 ? `${$seconds}` : `0${$seconds}`];
};

export const createNotification = (title: string, body: string) => {
    new Notification(title, { body: body })
}

export function getTimestampFromDate(date: Date): number {
    return date.getTime();
}

export function getDateFromTimestamp(timestamp: number): Date {
    return new Date(timestamp);
}

function timestampIsInMonth(timestamp: number, year: number, month: number): boolean {
    const firstDay = new Date(year, month, 1).getTime();
    const lastDay = new Date(year, month + 1, 0).getTime();
    return timestamp >= firstDay && timestamp <= lastDay;
}

function timestampIsInDay(timestamp: number, dayMs: number): boolean {
    const startOfDayMs = new Date(dayMs).setHours(0, 0, 0, 0);
    const endOfDayMs = new Date(dayMs).setHours(23, 59, 59, 999);
    return timestamp >= startOfDayMs && timestamp <= endOfDayMs;
}

export function generateMonthlyStats(timestamps: Array<number>, year: number, month: number) {
    const timestampsOfMonth = timestamps.filter((timestamp: number) => timestampIsInMonth(timestamp, year, month));
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    let stats = []
    for (let i = 1; i <= lastDayOfMonth; i++) {
        let stat = { day: new Date(year, month, i).toISOString(), pomos: 0 }
        for (let j = 0; j <= timestampsOfMonth.length; j++) {
            const dayMs = new Date(year, month, i).getTime()
            if (timestampIsInDay(timestampsOfMonth[j], dayMs)) {
                stat = { ...stat, pomos: stat.pomos + 1 };
            }
        }
        stats.push(stat);
    }
    return stats;
}

export function getDayOfIsoDate(isoDate: string) {
    return isoDate.split('T')[0].slice(-2);
}
