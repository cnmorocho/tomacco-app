import { numans } from "@/fonts";
import React from "react";
type CountdownProps = {
  minutes: string;
  seconds: string;
  currentInterval: number;
  goalInterval: number;
};

const Countdown = ({
  minutes,
  seconds,
  currentInterval,
  goalInterval,
}: CountdownProps) => {
  return (
    <div className="w-96 h-96 rounded-full border-8 flex flex-col justify-center items-center">
      <p className={`${numans.className} text-2xl`}>
        {currentInterval}/{goalInterval}
      </p>
      <p className={`${numans.className} text-8xl`}>
        {minutes}:{seconds}
      </p>
    </div>
  );
};

export default Countdown;
