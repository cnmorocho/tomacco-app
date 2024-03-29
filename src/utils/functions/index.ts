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

export * from './timestamps';
