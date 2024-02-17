import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';

const Navbar = () => {
    const [hour, setHour] = useState(new Date);
    const [weather, setWeather] = useState('')
    const [city, setCity] = useState('')

    useEffect(() => {
        const interval = setInterval(() => setHour(new Date()));
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        getLatitudeAndLongitude('Buenos Aires').then((cities) => {
            setCity(cities[0].name);
            getWeather(cities[0].latitude, cities[0].longitude).then((currentWeather) => setWeather(currentWeather.current['temperature_2m']))
        });
    }, [])

    const currentHour = hour.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`${roboto.className} w-full h-auto flex flex-row justify-around py-2 font-normal text-sm border-zinc-300 border-b-[1.8px]`}>
            <p>Good morning, <span className='font-black'>Carlos</span>.</p>
            <p>{currentHour}</p>
            <p>{city}, {weather}° C</p>
        </div>
    );
};

export default Navbar;
