export function formatCountdown(seconds: number): [string, string] {
    const $minutes = Math.trunc(seconds / 60);
    const $seconds = seconds % 60;

    return [
        $minutes > 9 ? `${$minutes}` : `0${$minutes}`,
        $seconds > 9 ? `${$seconds}` : `0${$seconds}`,
    ];
}

export const createNotification = (title: string, message: string): void => {
    // eslint-disable-next-line no-new
    new Notification(title, { body: message });
};

export function getBarColor(status: string): string {
    if (status === 'Focus') return '#b91c1c';
    if (status === 'Short Break') return '#16a34a';
    if (status === 'Long Break') return 'bg-sky-700';
    return '#0284c7';
}

export * from './timestamps';
