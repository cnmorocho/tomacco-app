import { useAppSelector } from '@/redux/hooks';
import {
  getTimestampOfMonth,
  getTimestampsOfToday,
  getTimestampsOfWeek,
} from '@/utils/functions';

export default function BannerWithStats() {
  const stats: Array<number> = useAppSelector((state) => state.stats);
  const totalProgress = stats.length;
  const todayProgress = getTimestampsOfToday(stats).length;
  const thisWeekProgress = getTimestampsOfWeek(stats).length;
  const thisMonthProgress = getTimestampOfMonth(stats).length;
  const month = new Date().toLocaleDateString('en-US', {
    month: 'long',
  });

  return (
    <div className='grid h-24 grid-cols-4 divide-x'>
      <BannerStatsItem value={todayProgress} label='Today' />
      <BannerStatsItem value={thisWeekProgress} label='This week' />
      <BannerStatsItem value={thisMonthProgress} label={`On ${month}`} />
      <BannerStatsItem value={totalProgress} label='Total' />
    </div>
  );
}

function BannerStatsItem({ value, label }: { value: number; label: string }) {
  return (
    <div className='flex flex-col items-center justify-center'>
      <p className='text-md font-medium'>{label}</p>
      <p>{value}</p>
    </div>
  );
}
