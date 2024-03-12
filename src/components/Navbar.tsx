import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';
import { getWeather } from '@/services/weather';
import NameModal from './NameModal';
import { useAppSelector } from '@/redux/hooks';
import LocationModal from './LocationModal';
import CloudCircleIcon from '@mui/icons-material/CloudCircle';

const Navbar = () => {
  return (
    <div
      className={`${roboto.className} w-full h-7 flex flex-row justify-around items-center font-normal text-sm border-zinc-300 border-b-[1.8px]`}>
      <NavName />
      <div className='flex flex-row gap-1'>
        <WeatherNavItem />
      </div>
    </div>
  );
};

function NavName() {
  const userName = useAppSelector(state => state.user.name);
  const [showNameModal, setShowNameModal] = useState(false);

  return (
    <div>
      <p
        className='hover:border-zinc-300 hover:cursor-pointer transition duration-200 flex items-center h-full px-2 border-x border-zinc-50'
        onClick={() => setShowNameModal(true)}>
        {userName}'s Tomacco
      </p>
      <NameModal
        title='Set name'
        isVisible={showNameModal}
        toggleVisiblity={setShowNameModal}
      />
    </div>
  );
}

function WeatherNavItem() {
  const [weather, setWeather] = useState('');
  
  const location = useAppSelector(state => state.location);

  useEffect(() => {
    getWeather(location.latitude, location.longitude).then((currentWeather) =>
      setWeather(currentWeather.current['temperature_2m']),
    );
  }, [location]);
  const [showSetLocationModal, setShowLocationModal] = useState(false);
  return (
    <div>
      <div className='flex flex-row items-center h-full'>
        {location.name && weather ? (
          <div
            className='border-x border-zinc-50 hover:border-zinc-300 hover:cursor-pointer transition duration-200 flex items-center h-full px-2 box-border gap-1'
            onClick={() => setShowLocationModal(true)}>
            <CloudCircleIcon fontSize='inherit' sx={{ fontSize: 13 }} />
            <p>
              {location.name}, {weather}° C
            </p>
          </div>
        ) : (
          <div className='animate-pulse h-3 bg-zinc-500 rounded-full w-36 transition duration-500'></div>
        )}
      </div>
      <LocationModal
        title='Set location'
        isVisible={showSetLocationModal}
        toggleVisiblity={setShowLocationModal}
      />
    </div>
  );
}

export default Navbar;
