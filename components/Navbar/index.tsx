import React, { useEffect, useState } from 'react';
import { roboto } from '@/fonts';

const Navbar = () => {
    const [hour, setHour] = useState(new Date);

    useEffect(() => {
        const interval = setInterval(() => setHour(new Date()));
        return () => clearInterval(interval);
    }, []);

    const currentHour = hour.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`${roboto.className} w-full h-auto flex flex-row justify-around py-2 font-normal text-sm border-zinc-300 border-b-[1.8px]`}>
            <p>Good morning, <span className='font-black'>Carlos</span>.</p>
            <p>{currentHour}</p>
            <p>Buenos Aires, 29° C</p>
        </div>
    );
};

export default Navbar;
