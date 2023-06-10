import Head from 'next/head';
import styles from './desktop-wrapper.module.css';

type DesktopWrapperProps = {
    children: JSX.Element | JSX.Element[];
    title: string;
};

const DesktopWrapper = ({ children, title }: DesktopWrapperProps) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
};

export default DesktopWrapper;
