export interface Pomodoro {
    currentTime: number;
    isRunning: boolean;
    currentInterval: number;
    status: 'Focus' | 'Short Break' | 'Long Break';
}
