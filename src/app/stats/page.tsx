'use client';
import BannerWithStats from '@/components/BannerWithStats';
import Divider from '@/components/Divider';
import { MonthlyStatsBarChart } from '@/components/MonthlyStatsBarChart';
import { WeeklyStatsBarChart } from '@/components/WeeklyStatsBarChart';
import { roboto } from '@/fonts';

export default function Stats() {
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
  }).format(new Date());

  return (
    <div className={`${roboto.className} w-full pt-10`}>
      <div className='mb-4 flex items-center justify-between border-b p-2 text-zinc-800'>
        <p className='text-4xl font-extrabold'>Statistics</p>
        <p className='text-xl font-bold text-zinc-500'>{date}</p>
      </div>
      <BannerWithStats />
      <Divider title='This week' />
      <WeeklyStatsBarChart />
      <Divider title='This month' />
      <MonthlyStatsBarChart />
    </div>
  );
}
