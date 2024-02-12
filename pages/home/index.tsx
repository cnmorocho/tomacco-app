import DesktopWrapper from '@/components/DesktopWrapper';
import Navbar from '@/components/Navbar';
import TimerSection from '@/components/TimerSection';
import { libreBaskerville } from '@/fonts';
import { PomodoroContext } from '@/store/countdown';
import { formatCountdown } from '@/utils/functions';
import { useContext } from 'react';

export default function Home() {
    const { pomodoro } = useContext(PomodoroContext);
    const [minutes, seconds] = formatCountdown(pomodoro.currentTime);
    const title = pomodoro.isRunning ? `${minutes}:${seconds}` : 'Tomacco'

    return (
        <DesktopWrapper title={title}>
            <Navbar />
            <div className="h-3/5 flex flex-col justify-center gap-10">
                <div className={`${libreBaskerville.className} flex justify-center text-zinc-800 font-medium`}>
                    <p className="w-1/3 text-center hover:underline hover:decoration-dotted underline-offset-4 hover:cursor-pointer text-lg">"Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle."</p>
                </div>
                <TimerSection />
            </div>
        </DesktopWrapper>
    );
}
