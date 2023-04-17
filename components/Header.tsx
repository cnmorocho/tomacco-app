import NavList from "./NavList";

const Header = () => {
  return (
    <header className="flex flex-row h-14 bg-[#DD4A48] justify-center">
      <div className="w-8/12 h-full flex place-content-between items-center">
        <div>
          <h1 className="text-2xl">Pomodoro</h1>
        </div>
        <NavList />
      </div>
    </header>
  );
};

export default Header;
