import React from 'react';

type Props = { message: string };

export default function TooltipContainer({
  message,
}: Props): React.ReactElement {
  return (
    <div className='border border-zinc-300 bg-zinc-50 px-2 py-3'>
      <p>{message}</p>
    </div>
  );
}
