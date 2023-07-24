import React, { useContext } from 'react';
import NavItems from '../NavItems';
import styles from './navbar.module.css';
import { roboto } from '@/fonts';
import { ThemeContext } from '@/store/theme';

const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div className={`${styles.container} ${theme}`}>
            <div className={styles.wrapper}>
                <h1 className={`${styles.title} ${roboto.className}`}>Pomodoro</h1>
                <NavItems />
            </div>
        </div>
    );
};

export default Navbar;
