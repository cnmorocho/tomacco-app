import React from 'react';
import styles from './countdown-button.module.css';
import { roboto } from '@/fonts';

type CountdownButtonProps = {
    text: string;
    action: () => void;
};

const CountdownButton = ({ text, action }: CountdownButtonProps) => {
    return (
        <button
            type='button'
            className={`${styles.button} ${roboto.className}`}
            onClick={action}>
            {text}
        </button>
    );
};

export default CountdownButton;
