type Props = { message: string };

export default function TooltipContainer({ message }: Props) {
    return (
      <div className='bg-zinc-50 border border-zinc-300 py-3 px-2'>
        <p>{message}</p>
      </div>
    );
}
