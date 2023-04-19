import { TimerIcon, EngineIcon, LightBulbIcon } from "@/components/svg";
import NavButton from "./NavButton";

const NavList = () => {
  return (
    <div className="flex gap-3 w-auto">
      <NavButton title="Pomo" icon={<TimerIcon size="25" />} />
      <NavButton
        title="Información de uso"
        icon={<LightBulbIcon size="25" />}
      />
      <NavButton title="Configuración" icon={<EngineIcon size="25" />} />
    </div>
  );
};

export default NavList;
