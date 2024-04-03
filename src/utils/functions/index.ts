export const formatCountdown = (seconds: number) => {
  const $minutes = Math.trunc(seconds / 60);
  const $seconds = seconds % 60;

  return [
    $minutes > 9 ? `${$minutes}` : `0${$minutes}`,
    $seconds > 9 ? `${$seconds}` : `0${$seconds}`,
  ];
};

export const createNotification = (title: string, message: string) => {
  new Notification(title, { body: message });
};

export function getBarColor(status: string) {
  if (status === 'Focus')
    return '#b91c1c';
  if (status === 'Short Break')
    return '#16a34a';
  if (status === 'Long Break')
    return 'bg-sky-700'
  return '#0284c7';
}

export * from './timestamps';
