import Head from 'next/head';

type DesktopWrapperProps = {
    children: JSX.Element | JSX.Element[];
    title: string;
};

const DesktopWrapper = ({ children, title }: DesktopWrapperProps) => {
    return (
        <div className="m-0 w-full h-screen p-0 bg-zinc-50">
            <Head>
                <title>{title}</title>
            </Head>
            {children}
        </div>
    );
};

export default DesktopWrapper;
