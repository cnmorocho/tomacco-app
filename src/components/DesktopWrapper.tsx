type DesktopWrapperProps = {
    children: JSX.Element | JSX.Element[];
};

const DesktopWrapper = ({ children }: DesktopWrapperProps) => {
    return (
        <div className="m-0 w-full h-screen p-0 bg-zinc-50">
            {children}
        </div>
    );
};

export default DesktopWrapper;
