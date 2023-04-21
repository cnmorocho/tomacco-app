import React from "react";
import usePomo from "@/hooks/usePomo";
import Countdown from "./Countdown";
import { PauseIcon, PlayIcon, StopIcon } from "./svg";
import CountdownButton from "./CountdownButton";

const TimerApp = () => {
  const { countdown, play, stop, pause } = usePomo();
  const { currentTime } = countdown;

  const formatCountdown = (seconds: number) => {
    const $minutes = Math.trunc(seconds / 60);
    const $seconds = seconds % 60;

    return [
      $minutes > 9 ? `${$minutes}` : `0${$minutes}`,
      $seconds > 9 ? `${$seconds}` : `0${$seconds}`,
    ];
  };

  const [minutes, seconds] = formatCountdown(currentTime);

  return (
    <div className="sm:w-[466] flex flex-col items-center gap-20">
      <Countdown minutes={minutes} seconds={seconds} />
      <div className="w-full flex place-content-between">
        <CountdownButton action={play} icon={<PlayIcon size="63" />} />
        <CountdownButton action={pause} icon={<PauseIcon size="63" />} />
        <CountdownButton action={stop} icon={<StopIcon size="32" />} />
      </div>
    </div>
  );
};

export default TimerApp;
