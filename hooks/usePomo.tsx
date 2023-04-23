import { Pomodoro } from "@/interfaces";
import { useEffect, useState } from "react";

const usePomo = (seconds: number = 1500) => {
  const [countdown, setCountdown] = useState<Pomodoro>({
    currentTime: seconds,
    isRunning: false,
    currentInteval: 0,
    goalInterval: 4,
  });

  const { currentTime, isRunning, currentInteval, goalInterval } = countdown;

  const play = (): void => {
    setCountdown({ ...countdown, isRunning: true });
  };

  const pause = (): void => {
    setCountdown({ ...countdown, isRunning: false });
  };

  const stop = (): void => {
    setCountdown({ ...countdown, isRunning: false, currentTime: seconds });
  };

  const nextInteval = (): void => {
    setCountdown({
      ...countdown,
      currentTime: seconds,
      currentInteval: currentInteval + 1,
    });
  };

  const intervalIsDone = () => currentTime === 0;

  const sessionIsDone = () =>
    currentInteval === goalInterval && intervalIsDone();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (sessionIsDone()) {
        setCountdown({ ...countdown, isRunning: false });
        return () => clearInterval(interval);
      } else if (intervalIsDone()) {
        nextInteval();
        return;
      }
      setCountdown({ ...countdown, currentTime: currentTime - 1 });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, isRunning]);

  return { countdown, play, pause, stop };
};

export default usePomo;
