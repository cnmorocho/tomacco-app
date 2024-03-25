'use client';

import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';
import { getWeather } from '@/services/weather';
import NameModal from './NameModal';
import { useAppSelector } from '@/redux/hooks';
import LocationModal from './LocationModal';
import NavItem from './NavItem';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimerIcon from '@mui/icons-material/Timer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <div
      className={`${roboto.className} flex h-7 w-full flex-row items-center justify-around border-b-[1.8px] border-zinc-300 text-sm font-normal`}
    >
      <NavName />
      <div className='flex flex-row gap-1'>
        <PomodoroNavItem />
        <StatisticsNavItem />
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
        className='flex h-full items-center gap-1 border-x border-zinc-50 px-2 font-medium transition duration-200 hover:cursor-pointer hover:border-zinc-300'
        onClick={() => setShowNameModal(true)}
      >
        <AccountCircleIcon sx={{ fontSize: 15 }} />
        <p>{`${userName}'s Tomacco`}</p>
      </div>
      <NameModal isVisible={showNameModal} toggleVisiblity={setShowNameModal} />
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
            className='box-border flex h-full items-center gap-1 border-x border-zinc-50 px-2 transition duration-200 hover:cursor-pointer hover:border-zinc-300'
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

function StatisticsNavItem() {
  return (
    <NavItem href='/stats'>
      <BarChartIcon fontSize='inherit' sx={{ fontSize: 15 }} />
      <p>Stats</p>
    </NavItem>
  );
}

function PomodoroNavItem() {
  return (
    <NavItem href='/'>
      <TimerIcon fontSize='inherit' sx={{ fontSize: 15 }} />
      <p>Pomodoro</p>
    </NavItem>
  );
}

export default Navbar;
