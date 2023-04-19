import NavList from "./NavList";

const Header = () => {
  return (
    <div className="w-full flex justify-center h-14 fixed top-0  bg-tomato-red">
      <div className="flex place-content-between w-8/12 h-full items-center">
        <div>
          <h1 className="text-2xl font-bold">Pomodoro</h1>
        </div>
        <NavList />
      </div>
    </div>
  );
};

export default Header;
