import React from 'react';
import styles from './skip-button.module.css';
import { SkipIcon } from '@/components/common/svg';

type SkipButtonProps = {
    action: () => void;
};

const SkipButton = ({ action }: SkipButtonProps) => {
    return (
        <button
            type='button'
            className={styles.button}
            onClick={action}>
            <SkipIcon size='50' />
        </button>
    );
};

export default SkipButton;
