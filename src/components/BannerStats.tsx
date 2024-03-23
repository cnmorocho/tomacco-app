import { useAppSelector } from "@/redux/hooks";
import { generateWeeklyStats, timestampIsInDay, timestampIsInMonth, timestampIsInWeek } from "@/utils/functions";

export default function BannerStats() {
  const stats: Array<number> = useAppSelector(state => state.stats);
  const totalProgress = stats.length;
  const todayProgress = stats.filter((stat) => timestampIsInDay(stat, new Date().getTime())).length;
  const today = new Date();
  const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
  const lastDayOfWeek = new Date(today.setDate(firstDayOfWeek.getDate() + 6));
  const thisWeekProgress = stats.filter((stat) => timestampIsInWeek(stat, firstDayOfWeek, lastDayOfWeek)).length;
  const thisMonthProgress = stats.filter((stat) => timestampIsInMonth(stat, new Date().getFullYear(), new Date().getMonth()))
  

  return (
    <div className='h-24 flex justify-around items-center'>
      <BannerStatsItem value={todayProgress} label='Today' />
      <BannerStatsItem value={thisWeekProgress} label='This week' />
      <BannerStatsItem value={stats.length} label='This month' />
      <BannerStatsItem value={totalProgress} label='Total' />
    </div>
  );
}

function BannerStatsItem({ value, label }: { value: number, label: string }) {
  return (
    <div className='flex flex-col items-center'>
      <p className="text-md font-medium">{label}</p>
      <p>{value}</p>
    </div>
  );
}
