import React, { useState } from 'react';
import { robotoSerif, roboto } from '@/fonts';
import ConfirmationModal from './ConfirmationModal';

type CountdownProps = {
    minutes: string;
    seconds: string;
    currentInterval: number;
};

const Countdown = ({ minutes, seconds, currentInterval }: CountdownProps) => {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    return (
        <div className={`${robotoSerif.className} flex flex-col items-center text-zinc-800`}>
            <p
                onClick={() => setShowConfirmationModal(true)}
                className={`${roboto.className} text-lg cursor-pointer font-normal p-1 hover:bg-zinc-700 hover:text-zinc-50 transition duration-200`} >
                #{currentInterval}
            </p>
            <p className="text-6xl font-bold">
                {minutes}:{seconds}
            </p>
            <ConfirmationModal title='Reset countdown' description='Are you sure you want to reset the countdown and set the interval to zero?' isVisible={showConfirmationModal} toggleVisiblity={setShowConfirmationModal} />
        </div>
    );
};

export default Countdown;
