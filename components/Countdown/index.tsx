import { quantico } from "@/fonts";
import React from "react";
import styles from "./countdown.module.css";

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
    <div className={styles["container"]}>
      <p className={`${quantico.className} ${styles["interval"]}`}>
        #{currentInterval}
      </p>
      <p className={`${quantico.className} ${styles["countdown"]}`}>
        {minutes}:{seconds}
      </p>
    </div>
  );
};

export default Countdown;
