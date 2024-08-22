import React, { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';

export const ThemeContext = createContext();

const defaultTheme = {
    background: '#fff',
    textColor: '#000',
};

export const CustomThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(defaultTheme);

    const updateTheme = (newTheme) => setTheme(newTheme);

    return (
        <ThemeContext.Provider value={{ theme, updateTheme }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
