import React, { useEffect } from "react";
import usePomo from "@/hooks/usePomo";
import Countdown from "../Countdown";
import styles from "./timer-section.module.css";
import CountdownButton from "../CountdownButton";
import SkipButton from "../SkipButton";

const TimerSection = () => {
  const { countdown, play, stop, pause, skip } = usePomo();
  const { currentTime, currentInteval, goalInterval, isRunning, status } =
    countdown;

  const formatCountdown = (seconds: number) => {
    const $minutes = Math.trunc(seconds / 60);
    const $seconds = seconds % 60;

    return [
      $minutes > 9 ? `${$minutes}` : `0${$minutes}`,
      $seconds > 9 ? `${$seconds}` : `0${$seconds}`,
    ];
  };

  useEffect(() => {
    if (Notification.permission === "granted") return;
    else
      Notification.requestPermission().then((res) => {
        if (res === "granted") {
          new Notification("Notificación");
        } else if (res === "default") {
          console.log("Notificación no permitida");
        }
      });
  }, []);

  const ConditionalButton = (): JSX.Element => {
    return isRunning ? (
      <CountdownButton text="PAUSAR" action={pause} />
    ) : (
      <CountdownButton text="INICIAR" action={play} />
    );
  };

  const [minutes, seconds] = formatCountdown(currentTime);

  return (
    <section
      className={`${styles["section"]} ${
        status === "shortbreak" ? styles["bg-green"] : styles["bg-tomato"]
      }`}>
      <Countdown
        minutes={minutes}
        seconds={seconds}
        goalInterval={goalInterval}
        currentInterval={currentInteval}
      />
      <div className={styles["buttons"]}>
        <ConditionalButton />
        <SkipButton action={skip} />
      </div>
    </section>
  );
};

export default TimerSection;
