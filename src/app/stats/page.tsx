"use client";
import BannerStats from '@/components/BannerStats';
import Divider from '@/components/Divider';
import { MonthlyStatsBarChart } from '@/components/MonthlyStatsBarChart';
import { WeeklyStatsBarChart } from '@/components/WeeklyStatsBarChart';
import { roboto } from '@/fonts';

export default function Stats() {
  return (
    <div className={`${roboto.className} w-full pt-10`}>
      <div className='flex items-center justify-between px-3 py-2 mb-4 bg-zinc-800 text-zinc-50'>
        <p className='text-3xl font-bold'>Statistics</p>
        <p className='text-xl font-medium'>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
          }).format(new Date())}
        </p>
      </div>
      <Divider title='Progress'/>
      <BannerStats />
      <Divider title='This week'/>
      <WeeklyStatsBarChart />
      <Divider title='This month'/>
      <MonthlyStatsBarChart /> 
    </div>
  );
}
