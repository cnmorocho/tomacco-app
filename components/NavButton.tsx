import { notoSans } from "@/fonts/fonts";

type navButtonProps = {
  title: string;
  icon: React.ReactElement;
};

const NavButton = ({ title, icon }: navButtonProps) => {
  return (
    <button
      type="button"
      className={`${notoSans.className} flex text-md justify-center`}>
      {icon}
      {title}
    </button>
  );
};

export default NavButton;
