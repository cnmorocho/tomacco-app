import React from "react";
import { EngineIcon, LightBulbIcon, TimerIcon } from "../../common/svg";
import NavItems from "../NavItems";
import styles from "./navbar.module.css";
import { roboto } from "@/fonts";

const Navbar = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["wrapper"]}>
        <h1 className={`${styles["title"]} ${roboto.className}`}>Pomodoro</h1>
        <NavItems />
      </div>
    </div>
  );
};

export default Navbar;
