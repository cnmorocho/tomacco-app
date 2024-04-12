'use client';

import React, { useState } from 'react';
import { roboto } from '@/fonts';
import BarChartIcon from '@mui/icons-material/BarChart';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import StatsModal from './StatsModal';

function Navbar(): React.ReactElement {
  return (
    <div
      className={`${roboto.className} flex h-10 w-[500px] flex-row items-center justify-between rounded-b-lg border bg-zinc-100 px-1 text-sm font-normal shadow-sm`}
    >
      <NavName />
      <div className='flex flex-row gap-1'>
        <NavStats />
      </div>
    </div>
  );
}

function NavName(): React.ReactElement {
  return (
    <div>
      <div className='flex h-full items-center gap-1 rounded px-2 py-1 font-normal'>
        <AlarmOnIcon sx={{ fontSize: 20 }} />
        <p className='text-lg font-bold'>Tomacco</p>
      </div>
    </div>
  );
}

function NavStats(): React.ReactElement {
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <div>
      <div
        className='flex h-full items-center gap-1 rounded px-2 py-1 font-medium text-zinc-600 hover:cursor-pointer hover:bg-zinc-200 active:bg-zinc-300'
        onClick={() => {
          setShowStatsModal(true);
        }}
      >
        <BarChartIcon fontSize='inherit' sx={{ fontSize: 15 }} />
        <p>Report</p>
      </div>
      <StatsModal
        isVisible={showStatsModal}
        toggleVisiblity={setShowStatsModal}
      />
    </div>
  );
}

export default Navbar;
