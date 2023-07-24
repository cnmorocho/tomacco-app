import { SetStateAction, createContext, useState } from 'react';

export type Theme = 'tomato' | 'green-apple' | 'sky-blue';

export type ContextType = {
    theme: Theme;
    setTheme: React.Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ContextType>({
    theme: 'tomato',
    setTheme: () => null,
});

export type ThemeProviderType = {
    children: React.ReactNode | React.ReactNode[];
};

const ThemeProvider = ({ children }: ThemeProviderType) => {
    const [theme, setTheme] = useState<Theme>('tomato');

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
