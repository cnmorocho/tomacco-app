import { Pomodoro } from "@/interfaces";
import { useState } from "react";

const usePomo = () => {
  const [timer, setTimer] = useState<Pomodoro>({
    currentTime: 1500,
    isRunning: false,
  });

  return {timer};
};

export default usePomo;
