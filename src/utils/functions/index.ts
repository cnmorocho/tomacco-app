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

export function timestampIsInMonth(timestamp: number, year: number, month: number): boolean {
    const firstDay = new Date(year, month, 1).getTime();
    const lastDay = new Date(year, month + 1, 0).getTime();
    return timestamp >= firstDay && timestamp <= lastDay;
}

export function timestampIsInDay(timestamp: number, dayMs: number): boolean {
    const startOfDayMs = new Date(dayMs).setHours(0, 0, 0, 0);
    const endOfDayMs = new Date(dayMs).setHours(23, 59, 59, 999);
    return timestamp >= startOfDayMs && timestamp <= endOfDayMs;
}

export function generateMonthlyStats(timestamps: Array<number>) {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const timestampsOfMonth = timestamps.filter((timestamp: number) =>
    timestampIsInMonth(timestamp, year, month),
  );
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
  let stats = [];

  for (let i = 1; i <= lastDayOfMonth; i++) {
    let day = new Date(year, month, i);
    let stat = { day: day.toISOString(), pomos: 0 };

    for (let j = 0; j <= timestampsOfMonth.length; j++) {
      const dayMs = day.getTime();

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

export function timestampIsInWeek(timestamp: number, firstDayOfWeek: Date, lastDayOfWeek: Date) {
    return timestamp >= firstDayOfWeek.getTime() && timestamp <= lastDayOfWeek.getTime();
}

export function generateWeeklyStats(timestamps: Array<number>) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
    const timestampsOfWeek = timestamps.filter((timestamp: number) =>
        timestampIsInWeek(timestamp, firstDayOfWeek, lastDayOfWeek),
    );
    let stats = [];

    for (let i = 1; i <= 7; i++) {
        let day = new Date(year, month, firstDayOfWeek.getDate() + i);
        let stat = { day: day.toISOString(), pomos: 0 };
    
        for (let j = 0; j <= timestampsOfWeek.length; j++) {    
          if (timestampIsInDay(timestampsOfWeek[j], day.getTime())) {
            stat = { ...stat, pomos: stat.pomos + 1 };
          }
        }
        stats.push(stat);
      }
    
      return stats;
}

export function getDayNameOfIsoDate(isoDate: string) {
    return new Date(isoDate).toLocaleDateString('en-US', { weekday: 'long' })
} 
