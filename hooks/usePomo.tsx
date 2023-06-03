import { Pomodoro } from "@/interfaces";
import { useEffect, useState } from "react";

const usePomo = (seconds: number = 1500) => {
  const [countdown, setCountdown] = useState<Pomodoro>({
    currentTime: seconds,
    isRunning: false,
    currentInteval: 0,
    status: "focus",
    goalInterval: 4,
  });

  const { currentTime, isRunning, currentInteval, goalInterval, status } =
    countdown;

  const play = (): void => {
    setCountdown({ ...countdown, isRunning: true });
  };

  const pause = (): void => {
    setCountdown({ ...countdown, isRunning: false });
  };

  const stop = (): void => {
    setCountdown({ ...countdown, isRunning: false, currentTime: seconds });
  };

  const skip = (): void => {
    if (status === "focus")
      setCountdown({
        ...countdown,
        isRunning: false,
        currentInteval: currentInteval + 1,
        currentTime: 300,
        status: "shortbreak",
      });
    else
      setCountdown({
        ...countdown,
        isRunning: false,
        currentTime: seconds,
        status: "focus",
      });
  };

  const takeBreak = () => {
    setCountdown({
      ...countdown,
      currentTime: 300,
      currentInteval: currentInteval + 1,
      status: "shortbreak",
    });
  };

  const startFocus = (): void => {
    setCountdown({
      ...countdown,
      currentTime: seconds,
      status: "focus",
    });
  };

  const statusIsDone = ($status: "focus" | "shortbreak"): boolean =>
    timeIsZero() && status === $status;

  const focusIsDone = (): boolean => statusIsDone("focus");

  const breakIsDone = (): boolean => statusIsDone("shortbreak");

  const timeIsZero = (): boolean => currentTime === 0;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if (focusIsDone()) {
        new Notification("¡Buen trabajo!", {
          body: "Tomaté un descansito 🍅",
        });
        takeBreak();
        return;
      }

      if (breakIsDone()) {
        new Notification("¿Ya estas fresco?", {
          body: "¡Momento de laburar! 🤓",
        });
        startFocus();
        return;
      }

      setCountdown({ ...countdown, currentTime: currentTime - 1 });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, isRunning]);

  return { countdown, play, pause, stop, skip };
};

export default usePomo;
