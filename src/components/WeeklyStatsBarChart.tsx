'use client';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import type { Stats } from '@/types';
import {
  generateWeeklyStats,
  getWeekdayNameOfIsoDate,
} from '@/utils/functions';
import type { TooltipProps } from 'recharts';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import TooltipContainer from './TooltipContainer';

export function WeeklyStatsBarChart(): React.ReactElement {
  const stats = useAppSelector((state) => state.stats);
  const data: Stats[] = generateWeeklyStats(stats);

  return (
    <ResponsiveContainer width='100%' height='30%'>
      <BarChart data={data}>
        <YAxis dataKey='pomos' allowDecimals={false} fontSize={12} width={20} />
        <XAxis
          dataKey={(data: Stats) => getWeekdayNameOfIsoDate(data.date)}
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey='pomos' fill='#27272a' barSize={60} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (
    (active ?? false) &&
    payload?.length != null &&
    payload[0].payload.pomos !== 0
  ) {
    return (
      <TooltipContainer
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        message={`${payload[0].payload.pomos} pomodoros on ${getWeekdayNameOfIsoDate(payload[0].payload.date)}`}
      />
    );
  }
}
