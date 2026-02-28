import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    resolvedTheme: 'light' | 'dark'; // Actual applied theme
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Step A: Read from localStorage or default to 'system'
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('app-theme');
        return (saved as Theme) || 'system';
    });

    // Step B: Compute resolved theme
    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        // Save to localStorage
        localStorage.setItem('app-theme', theme);

        // Listen to system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const updateResolvedTheme = () => {
            let resolved: 'light' | 'dark';
            if (theme === 'system') {
                resolved = mediaQuery.matches ? 'dark' : 'light';
            } else {
                resolved = theme;
            }
            setResolvedTheme(resolved);

            // Step C: Apply class on <html> element
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(resolved);
        };

        updateResolvedTheme();
        mediaQuery.addEventListener('change', updateResolvedTheme);
        return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
}
