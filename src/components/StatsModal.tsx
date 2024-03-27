'use client';
import BannerWithStats from '@/components/BannerWithStats';
import Divider from '@/components/Divider';
import { MonthlyStatsBarChart } from '@/components/MonthlyStatsBarChart';
import { WeeklyStatsBarChart } from '@/components/WeeklyStatsBarChart';
import { roboto } from '@/fonts';

type Props = {
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function StatsModal({ isVisible, toggleVisiblity }: Props) {
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date());

  if (!isVisible) return <></>;

  function closeModal() {
    toggleVisiblity(false);
  }

  return (
    <div className='absolute left-0 top-0 flex overflow-auto w-full h-screen justify-center bg-transparent' onClick={closeModal}>
      <div className={`${roboto.className} relative top-12 flex h-[700px] w-[600px] flex-col gap-2 rounded-md border border-zinc-500 bg-zinc-50 px-3 py-3 shadow-xl`} onClick={(e) => e.stopPropagation()}>
        <div className='mb-4 flex items-center justify-between border-b p-2 text-zinc-800'>
          <p className='text-3xl font-extrabold'>Report</p>
          <p className='text-lg font-bold text-zinc-500'>{date}</p>
        </div>
        <BannerWithStats />
        <Divider title='This week' />
        <WeeklyStatsBarChart />
        <Divider title='This month' />
        <MonthlyStatsBarChart />
      </div>
    </div>
  );
}
