'use client';
import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { generateMonthlyStats, getDayOfIsoDate } from '@/utils/functions';
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
import type { Stats } from '@/types';

export function MonthlyStatsBarChart(): React.ReactElement {
    const stats = useAppSelector((state) => state.stats);
    const data: Stats[] = generateMonthlyStats(stats);

    return (
        <ResponsiveContainer width="100%" height="30%">
            <BarChart data={data}>
                <YAxis
                    dataKey="pomos"
                    allowDecimals={false}
                    fontSize={12}
                    width={20}
                />
                <XAxis
                    dataKey={(data: Stats) => getDayOfIsoDate(data.date)}
                    fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="pomos" fill="#27272a" barSize={60} />
            </BarChart>
        </ResponsiveContainer>
    );
}

function CustomTooltip({
    active,
    payload,
}: TooltipProps<ValueType, NameType>): React.ReactElement {
    if (
        (active ?? false) &&
        payload?.length != null &&
        payload[0].payload.pomos !== 0
    ) {
        return (
            <TooltipContainer
                message={`${payload[0].payload.pomos} pomodoros on ${new Intl.DateTimeFormat(
                    'en-US',
                    {
                        dateStyle: 'long',
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                ).format(new Date(payload[0].payload.date))}`}
            />
        );
    }
    return <></>;
}
