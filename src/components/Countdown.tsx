import React, { useState } from 'react';
import { roboto } from '@/fonts';
import ConfirmationModal from './ConfirmationModal';

type CountdownProps = {
  minutes: string;
  seconds: string;
  currentInterval: number;
};

const Countdown = ({ minutes, seconds, currentInterval }: CountdownProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  return (
    <div
      className={`${roboto.className} flex flex-col items-center text-zinc-800`}
    >
      <p
        onClick={() => setShowConfirmationModal(true)}
        className={`${roboto.className} cursor-pointer p-1 text-lg font-normal transition duration-200 hover:bg-zinc-700 hover:text-zinc-50`}
      >
        #{currentInterval}
      </p>
      <p className='text-7xl font-bold'>
        {minutes}:{seconds}
      </p>
      <ConfirmationModal
        title='Reset countdown'
        description='Are you sure you want to reset the countdown and set the interval to zero?'
        isVisible={showConfirmationModal}
        toggleVisiblity={setShowConfirmationModal}
      />
    </div>
  );
};

export default Countdown;
