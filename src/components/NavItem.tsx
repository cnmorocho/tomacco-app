export default function NavItem({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='flex flex-row items-center h-full'>
        <div className='border-x border-zinc-50 hover:border-zinc-300 hover:cursor-pointer transition duration-200 flex items-center h-full px-2 box-border gap-1'>
          {children}
        </div>
      </div>
    </div>
  );
}
