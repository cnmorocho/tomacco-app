import CountdownController from '@/components/CountdownController';
import TasksList from '@/components/TasksList';

export default function Page() {
  return (
    <div className='flex w-full flex-col gap-5 pt-10'>
      {' '}
      <CountdownController />
      <TasksList />
    </div>
  );
}
