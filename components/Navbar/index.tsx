import React, { useEffect, useState } from 'react';
import { robotoSerif } from '@/fonts';

const Navbar = () => {
    const [hour, setHour] = useState(new Date);

    useEffect(() => {
        const interval = setInterval(() => setHour(new Date()));
        return () => clearInterval(interval);
    }, []);

    const currentHour = hour.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`${robotoSerif.className} w-full h-auto flex flex-row justify-around py-3 font-medium text-md border-zinc-800 border-b`}>
            <p>Good morning, <span className='font-bold italic'>Carlos</span>.</p>
            <p>{currentHour}</p>
            <p>Buenos Aires, 29° C</p>
        </div>
    );
};

export default Navbar;
