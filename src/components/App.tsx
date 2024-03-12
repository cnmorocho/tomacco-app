import DesktopWrapper from './DesktopWrapper';
import Navbar from './Navbar';
import CountdownController from './CountdownController';
import Quote from './Quote';
import NoteList from './NoteList';

export default function App() {
  return (
    <DesktopWrapper>
      <Navbar />
      <div className='h-auto flex flex-col justify-center gap-10 flex-grow'>
        <Quote />
        <CountdownController />
        <NoteList/>
      </div>
    </DesktopWrapper>
  );
}
