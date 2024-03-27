'use client';

import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';
import { getWeather } from '@/services/weather';
import NameModal from './NameModal';
import { useAppSelector } from '@/redux/hooks';
import LocationModal from './LocationModal';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StatsModal from './StatsModal';

const Navbar = () => {

  return (
    <div
      className={`${roboto.className} flex h-10 w-full flex-row items-center justify-around border-b-[1.8px] border-zinc-400 text-sm font-normal`}
    >
      <NavName />
      <div className='flex flex-row gap-1'>
        <NavStats />
        <WeatherNavItem />
      </div>
    </div>
  );
};

function NavName() {
  const userName = useAppSelector((state) => state.user.name);
  const [showNameModal, setShowNameModal] = useState(false);

  return (
    <div>
      <div
        className='flex h-full items-center gap-1 rounded px-2 py-1 font-medium hover:cursor-pointer hover:bg-zinc-200 active:bg-zinc-300'
        onClick={() => setShowNameModal(true)}
      >
        <AccountCircleIcon sx={{ fontSize: 15 }} />
        <p>{`${userName}'s Tomacco`}</p>
      </div>
      <NameModal isVisible={showNameModal} toggleVisiblity={setShowNameModal} />
    </div>
  );
}

function NavStats() {
  const [showStatsModal, setShowStatsModal] = useState(false);

  return (
    <div>
      <div
        className='flex h-full items-center gap-1 rounded px-2 py-1 font-medium hover:cursor-pointer hover:bg-zinc-200 active:bg-zinc-300'
        onClick={() => setShowStatsModal(true)}
      >
        <BarChartIcon fontSize='inherit' sx={{ fontSize: 15 }} />
        <p>Report</p>
      </div>
      <StatsModal isVisible={showStatsModal} toggleVisiblity={setShowStatsModal} />
    </div>
  );
}

function WeatherNavItem() {
  const [weather, setWeather] = useState('');
  const location = useAppSelector((state) => state.location);

  useEffect(() => {
    getWeather(location.latitude, location.longitude).then((currentWeather) =>
      setWeather(currentWeather.current['temperature_2m'])
    );
  }, [location]);
  const [showSetLocationModal, setShowLocationModal] = useState(false);
  return (
    <div>
      <div className='flex h-full flex-row items-center'>
        {location.name && weather ? (
          <div
            className='box-border flex h-full items-center gap-1 rounded px-2 py-1 hover:cursor-pointer hover:bg-zinc-200 active:bg-zinc-300'
            onClick={() => setShowLocationModal(true)}
          >
            <CloudCircleIcon fontSize='inherit' sx={{ fontSize: 15 }} />
            <p>
              {location.name}, {weather}° C
            </p>
          </div>
        ) : (
          <div className='h-3 w-36 animate-pulse rounded-full bg-zinc-500 transition duration-500'></div>
        )}
      </div>
      <LocationModal
        isVisible={showSetLocationModal}
        toggleVisiblity={setShowLocationModal}
      />
    </div>
  );
}

export default Navbar;
