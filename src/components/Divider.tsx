export default function Divider({ title }: { title: string }) {
  return (
    <>
      <p className='text-sm font-medium'>{title}</p>
      <hr className='pb-1' />
    </>
  );
}
