import React, { useContext } from 'react';
import NavItems from '../NavItems';
import styles from './navbar.module.css';
import { roboto } from '@/fonts';
import { PomodoroContext } from '@/store/countdown';

const Navbar = () => {
    const { pomodoro } = useContext(PomodoroContext);

    return (
        <div className={`${styles.container} ${pomodoro.status}`}>
            <div className={styles.wrapper}>
                <h1 className={`${styles.title} ${roboto.className}`}>Tomacco</h1>
                <NavItems />
            </div>
        </div>
    );
};

export default Navbar;
