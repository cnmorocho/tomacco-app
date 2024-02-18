import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';
import { getLatitudeAndLongitude, getWeather } from '@/services/weather';
import Modal from './Modal';

const Navbar = () => {
  const [hour, setHour] = useState(new Date());
  const [weather, setWeather] = useState('');
  const [city, setCity] = useState('');
  const [showNameChangeModal, setShowNameChangeModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setHour(new Date()));
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getLatitudeAndLongitude('Buenos Aires').then((cities) => {
      setCity(cities[0].name);
      getWeather(cities[0].latitude, cities[0].longitude).then(
        (currentWeather) =>
          setWeather(currentWeather.current['temperature_2m']),
      );
    });
  }, []);

  const currentHour = hour.toLocaleTimeString('en-US', {
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      className={`${roboto.className} w-full h-auto flex flex-row justify-around py-2 font-normal text-sm border-zinc-300 border-b-[1.8px]`}>
      <p>
        Good morning, <span className='font-black hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer transition duration-200' onClick={() => setShowNameChangeModal(true)}>Carlos</span>.
      </p>
      <p>{currentHour}</p>
      <div className='flex flex-row items-center w-36 max-w-44'>
        {city && weather ? (
          <p><span className='hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer'>{city}</span>, {weather}° C</p>
        ) : (
          <div className='animate-pulse h-3 bg-zinc-500 rounded-full w-36 transition duration-500'></div>
        )}
      </div>
      <Modal title='Change name' isVisible={showNameChangeModal} toggleVisiblity={setShowNameChangeModal}/>
    </div>
  );
};

export default Navbar;
