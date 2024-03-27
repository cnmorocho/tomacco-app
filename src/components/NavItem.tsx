import Link from 'next/link';

type Props = {
  href: string;
  icon?: JSX.Element;
  label: string;
  isActive: boolean;
};

export default function NavItem({ href, icon, label, isActive }: Props) {
  return (
    <div>
      <div
        className={`flex h-full flex-row items-center rounded px-2 py-1 hover:cursor-pointer ${isActive ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-700 active:bg-zinc-600' : 'hover:bg-zinc-200 hover:text-zinc-800 active:bg-zinc-300'}`}
      >
        <Link
          href={href}
          className='box-border flex h-full items-center gap-1 '
        >
          {icon}
          <p>{label}</p>
        </Link>
      </div>
    </div>
  );
}
