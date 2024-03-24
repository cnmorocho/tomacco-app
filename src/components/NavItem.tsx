import Link from 'next/link';

export default function NavItem({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <div>
      <div className='flex h-full flex-row items-center'>
        <Link
          href={href}
          className='box-border flex h-full items-center gap-1 border-x border-zinc-50 px-2 transition duration-200 hover:cursor-pointer hover:border-zinc-300'
        >
          {children}
        </Link>
      </div>
    </div>
  );
}
