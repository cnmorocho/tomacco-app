import { numans } from "@/fonts";
import { PauseIcon, PlayIcon, StopIcon } from "./svg";
import { useEffect, useState } from "react";

const TimerApp = () => {
  const [timer, setTimer] = useState({
    currentTime: 10,
    currentPomo: 0,
    goalPomo: 4,
    state: "focus",
    isRunning: false,
  });

  const { currentTime, currentPomo, goalPomo, isRunning, state } = timer;

  const playTimer = () => {
    setTimer({ ...timer, isRunning: true });
  };

  const pauseTimer = () => {
    setTimer({ ...timer, isRunning: false });
  };

  const stopTimer = () => {
    setTimer({
      ...timer,
      currentTime: 1500,
      isRunning: false,
      currentPomo: 0,
    });
  };

  useEffect(() => {
    if (!isRunning) return;

    let interval = setInterval(() => {
      if (currentTime == 0) {
        setTimer({ ...timer, currentPomo: currentPomo + 1 });
        return () => clearInterval(interval);
      }

      setTimer({ ...timer, currentTime: currentTime - 1 });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime, isRunning]);

  return (
    <div className="bg-tomato-red w-8/12 flex flex-col items-center justify-center h-full gap-14">
      <div className="w-96 h-96 rounded-full border-8 flex items-center justify-center">
        <div className={`${numans.className} flex flex-col items-center`}>
          <p className="text-3xl">
            {currentPomo}/{goalPomo}
          </p>
          <p className="text-8xl">
            {Math.trunc(currentTime / 60)}:
            {currentTime % 60 > 9 ? currentTime % 60 : `0${currentTime % 60}`}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-8/12 gap-10 justify-center">
        <button
          type="button"
          onClick={playTimer}
          className="rounded-full w-24 h-24 bg-slate-100 bg-tomato-white flex flex-row items-center justify-center">
          <PlayIcon size="63" />
        </button>
        <button
          type="button"
          onClick={pauseTimer}
          className="rounded-full w-24 h-24 bg-slate-100 bg-tomato-white flex flex-row items-center justify-center">
          <PauseIcon size="63" />
        </button>
        <button
          type="button"
          onClick={stopTimer}
          className="rounded-full w-24 h-24 bg-slate-100 bg-tomato-white flex flex-row items-center justify-center">
          <StopIcon size="33" />
        </button>
      </div>
    </div>
  );
};

export default TimerApp;
