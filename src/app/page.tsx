import CountdownController from '@/components/CountdownController';

export default function Home() {
  return (
      <div className='w-full pt-10 flex flex-col gap-20'>
        <CountdownController />
      </div>
  );
}
