"use client";
import { useAppSelector } from '@/redux/hooks';
import { generateMonthlyStats, getDayOfIsoDate } from '@/utils/functions';
import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export function WeeklyStatsBarChart() {
  const stats = useAppSelector(state => state.stats);
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  console.log(generateMonthlyStats(stats, year, month));

  return (
    <ResponsiveContainer width='100%' height='30%'>
      <BarChart data={generateMonthlyStats(stats, year, month)}>
        <YAxis dataKey='pomos' allowDecimals={false} fontSize={12} width={20}/>
        <XAxis dataKey={(data) => getDayOfIsoDate(data.day)} fontSize={12}/>
        <Tooltip content={<CustomTooltip />}/>
        <Bar dataKey='pomos' fill='#27272a' barSize={60}/>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length && payload[0].payload.pomos != 0) {
    return (
      <div className='bg-zinc-50 border border-zinc-300 py-3 px-2'>
        <p className='label'>{`${payload[0].payload.pomos} pomodoros on ${new Intl.DateTimeFormat(
          'en-US',
          {
            dateStyle: 'long',
          },
        ).format(new Date(payload[0].payload.day))}`}</p>
      </div>
    );
  }
}
