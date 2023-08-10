import DesktopWrapper from '@/components/DesktopWrapper';
import Navbar from '@/components/Navbar';
import TimerSection from '@/components/TimerSection';
import { PomodoroContext } from '@/store/countdown';
import { formatCountdown } from '@/utils/functions';
import { useContext } from 'react';

export default function Home() {
    const { pomodoro } = useContext(PomodoroContext);
    const [minutes, seconds] = formatCountdown(pomodoro.currentTime);

    return (
        <DesktopWrapper title={pomodoro.isRunning ? `${minutes}:${seconds}` : 'Tomacco'}>
            <Navbar />
            <TimerSection />
        </DesktopWrapper>
    );
}
