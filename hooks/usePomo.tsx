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

<<<<<<< HEAD
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
=======
  const takeBreak = (): void => {
>>>>>>> 35c9e108e9fdc62a59cb89e984620c541367ca36
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

  const sessionIsDone = (): boolean =>
    currentInteval === goalInterval && timeIsZero();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // if (sessionIsDone()) {
      //   setCountdown({ ...countdown, isRunning: false });
      //   return () => clearInterval(interval);
      // }

      if (focusIsDone()) {
        takeBreak();
        return;
      }

      if (breakIsDone()) {
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
