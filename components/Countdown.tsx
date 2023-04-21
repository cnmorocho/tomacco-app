import { numans } from "@/fonts";
import React from "react";
type CountdownProps = {
  minutes: string;
  seconds: string;
};

const Countdown = ({ minutes, seconds }: CountdownProps) => {
  return (
    <div className="w-96 h-96 rounded-full border-8 flex justify-center items-center">
      <p className={`${numans.className} text-8xl`}>
        {minutes}:{seconds}
      </p>
    </div>
  );
};

export default Countdown;
