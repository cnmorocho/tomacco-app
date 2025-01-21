'use client';
import React from 'react';
import BannerWithStats from '@/components/BannerWithStats';
import Divider from '@/components/Divider';
import { MonthlyStatsBarChart } from '@/components/MonthlyStatsBarChart';
import { WeeklyStatsBarChart } from '@/components/WeeklyStatsBarChart';
import { roboto } from '@/fonts';

type Props = {
    isVisible: boolean;
    toggleVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function StatsModal({
    isVisible,
    toggleVisiblity,
}: Props): React.ReactElement {
    const date = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
    }).format(new Date());

    if (!isVisible) return <></>;

    function closeModal(): void {
        toggleVisiblity(false);
    }

    return (
        <div
            className="absolute left-0 top-0 z-50 flex h-screen w-full justify-center overflow-auto bg-transparent backdrop-blur-sm"
            onClick={closeModal}
        >
            <div
                className={`${roboto.className} relative top-12 flex h-[700px] w-[500px] flex-col gap-2 rounded-md border border-zinc-300 bg-zinc-100 p-4 shadow-xl`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="mb-4 flex items-end justify-between border-b border-zinc-300 p-2 text-zinc-800">
                    <p className="text-xl font-extrabold">Report</p>
                    <p className="text-lg font-bold text-zinc-500">{date}</p>
                </div>
                <BannerWithStats />
                <Divider title="This week" />
                <WeeklyStatsBarChart />
                <Divider title="This month" />
                <MonthlyStatsBarChart />
            </div>
        </div>
    );
}
