import { BurgerIcon, EngineIcon, LightBulbIcon, TimerIcon } from '@/components/common/svg';
import React, { useContext, useState } from 'react';
import styles from './nav-items.module.css';
import { roboto } from '@/fonts';
import { useRouter } from 'next/router';
import { PomodoroContext } from '@/store/countdown';

const NavItems = () => {
    const [showItems, setShowItems] = useState(false);
    const { push } = useRouter();
    const { pomodoro } = useContext(PomodoroContext);

    return (
        <div className={`${styles['container']} ${roboto.className}`}>
            <div className={`${pomodoro.status} ${styles['wrapper']} ${showItems ? styles['wrapper-inactive'] : ''}`}>
                <a
                    onClick={() => push('/home')}
                    className={styles['nav-item']}>
                    <TimerIcon size='25' />
                    Pomodoro
                </a>
                <a
                    onClick={() => push('/info')}
                    className={styles['nav-item']}>
                    <LightBulbIcon size='25' />
                    Información de uso
                </a>
                <a
                    onClick={() => {}}
                    className={styles['nav-item']}>
                    <EngineIcon size='25' />
                    Configuración
                </a>
            </div>
            <div
                onClick={() => setShowItems(!showItems)}
                className={styles['burger']}>
                <BurgerIcon size='25' />
            </div>
        </div>
    );
};

export default NavItems;
