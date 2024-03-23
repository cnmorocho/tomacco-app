"use client";
import { useAppSelector } from '@/redux/hooks';
import { generateWeeklyStats, getDayNameOfIsoDate } from '@/utils/functions';
import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

export function WeeklyStatsBarChart() {
  const stats = useAppSelector(state => state.stats);

  return (
    <ResponsiveContainer width='100%' height='30%'>
      <BarChart data={generateWeeklyStats(stats)}>
        <YAxis dataKey='pomos' allowDecimals={false} fontSize={12} width={20}/>
        <XAxis dataKey={(data) => getDayNameOfIsoDate(data.day)} fontSize={12}/>
        <Tooltip content={<CustomTooltip />}/>
        <Bar dataKey='pomos' fill='#27272a' barSize={60}/>
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) {
  if (active && payload && payload.length && payload[0].payload.pomos != 0) {
    return (
      <div className='bg-zinc-50 border border-zinc-300 py-3 px-2'>
        <p>{`${payload[0].payload.pomos} pomodoros on ${getDayNameOfIsoDate(payload[0].payload.day)}`}</p>
      </div>
    );
  }
}
