import { BurgerIcon, EngineIcon, LightBulbIcon, TimerIcon } from "@/common/svg";
import React, { useState } from "react";
import styles from "./nav-items.module.css";
import { roboto } from "@/fonts";

const NavItems = () => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className={`${styles["container"]} ${roboto.className}`}>
      <div
        className={`${styles["wrapper"]} ${
          showItems ? styles["wrapper-inactive"] : ""
        }`}>
        <a href="" className={styles["nav-item"]}>
          <TimerIcon size="25" />
          Pomodoro
        </a>
        <a href="" className={styles["nav-item"]}>
          <LightBulbIcon size="25" />
          Información de uso
        </a>
        <a href="" className={styles["nav-item"]}>
          <EngineIcon size="25" />
          Configuración
        </a>
      </div>
      <div
        onClick={() => setShowItems(!showItems)}
        className={styles["burger"]}>
        <BurgerIcon size="25" />
      </div>
    </div>
  );
};

export default NavItems;
