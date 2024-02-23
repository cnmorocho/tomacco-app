import DesktopWrapper from './DesktopWrapper';
import Navbar from './Navbar';
import TimerSection from './TimerSection';
import Quote from './Quote';

export default function App() {
  return (
    <DesktopWrapper>
      <Navbar />
      <div className='h-3/5 flex flex-col justify-center gap-10'>
        <Quote />
        <TimerSection />
      </div>
    </DesktopWrapper>
  );
}
