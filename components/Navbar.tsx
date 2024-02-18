import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';
import { getWeather } from '@/services/weather';
import NameModal from './NameModal';
import { useAppSelector } from '@/redux/hooks';
import LocationModal from './LocationModal';

const Navbar = () => {
  const [weather, setWeather] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [showSetLocationModal, setShowLocationModal] = useState(false);
  const userName = useAppSelector(state => state.user.name);
  const location = useAppSelector(state => state.location);

  useEffect(() => {
    getWeather(location.latitude, location.longitude).then((currentWeather) =>
      setWeather(currentWeather.current['temperature_2m']),
    );
  }, [location]);


  return (
    <div
      className={`${roboto.className} w-full h-auto flex flex-row justify-around py-2 font-normal text-sm border-zinc-300 border-b-[1.8px]`}>
      <p
        className='font-medium hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer transition duration-200'
        onClick={() => setShowNameModal(true)}>
        {userName}'s Tomacco
      </p>
      <div className='flex flex-row items-center w-36 max-w-44'>
        {location.name && weather ? (
          <p
            className='hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer transition duration-200'
            onClick={() => setShowLocationModal(true)}>
            {location.name}, {weather}° C
          </p>
        ) : (
          <div className='animate-pulse h-3 bg-zinc-500 rounded-full w-36 transition duration-500'></div>
        )}
      </div>
      <NameModal
        title='Set name'
        isVisible={showNameModal}
        toggleVisiblity={setShowNameModal}
      />
      <LocationModal
        title='Set location'
        isVisible={showSetLocationModal}
        toggleVisiblity={setShowLocationModal}
      />
    </div>
  );
};

export default Navbar;
