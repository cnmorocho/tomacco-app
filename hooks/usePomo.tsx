import { Pomodoro } from "@/interfaces";
import { useEffect, useState } from "react";

const usePomo = (seconds: number = 1500) => {
  const [countdown, setCountdown] = useState<Pomodoro>({
    currentTime: seconds,
    isRunning: false,
  });

  const {currentTime, isRunning} = countdown;

  const play = (): void => {
    setCountdown({...countdown, isRunning: true});
  }

  const pause = (): void => {
    setCountdown({...countdown, isRunning: false});
  }

  const stop = (): void => {
    setCountdown({...countdown, isRunning: false, currentTime: seconds})
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      if(currentTime === 0) {
        setCountdown({...countdown, isRunning: false});
        return () => clearInterval(interval);
      }
      setCountdown({...countdown, currentTime: currentTime - 1})
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [currentTime, isRunning])

  return {countdown, play, pause, stop};
};

export default usePomo;
