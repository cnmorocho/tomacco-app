"use client";
import { MonthlyStatsBarChart } from '@/components/MonthlyStatsBarChart';
import { roboto } from '@/fonts';

export default function Stats() {
  return (
    <div className={`${roboto.className} w-full pt-10`}>
      <div className='flex items-center justify-between px-2 mb-4 bg-zinc-800 text-zinc-50'>
        <p className='text-3xl font-bold'>Statistics</p>
        <p className='text-lg font-semibold'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
          }).format(new Date())}
        </p>
      </div>
      <p className='text-sm font-medium'>Current month</p>
      <hr className='pb-1' />
      <MonthlyStatsBarChart />
    </div>
  );
}
