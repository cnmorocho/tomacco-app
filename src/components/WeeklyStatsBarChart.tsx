"use client";
import { useAppSelector } from '@/redux/hooks';
import { Stats } from '@/types';
import { generateWeeklyStats, getWeekdayNameOfIsoDate } from '@/utils/functions';
import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import TooltipContainer from './TooltipContainer';

export function WeeklyStatsBarChart() {
  const stats = useAppSelector(state => state.stats);
  const data: Array<Stats> = generateWeeklyStats(stats);

  return (
    <ResponsiveContainer width='100%' height='30%'>
      <BarChart data={data}>
        <YAxis dataKey='pomos' allowDecimals={false} fontSize={12} width={20}/>
        <XAxis dataKey={(data) => getWeekdayNameOfIsoDate(data.date)} fontSize={12}/>
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
    return <TooltipContainer message={`${payload[0].payload.pomos} pomodoros on ${getWeekdayNameOfIsoDate(payload[0].payload.date)}`} />
  }
}
