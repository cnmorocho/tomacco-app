export type Pomodoro {
    currentTime: number;
    isRunning: boolean;
    currentInterval: number;
    status: Status;
}

export type Status = 'Focus' | 'Short Break' | 'Long Break';
