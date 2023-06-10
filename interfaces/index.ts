export interface Pomodoro {
  currentTime: number;
  isRunning: boolean;
  currentInteval: number;
  status: "focus" | "shortbreak";
}
