import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const DEFAULT_THEMES = {
  original: {
    primary: '#064e3b',
    secondary: '#2d5016',
    accent: '#10b981',
    dark: '#1d1d1f',
    light: '#f5f5f7',
    name: 'Huelmo Original'
  },
  purple: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#25d366',
    dark: '#333',
    light: '#f8f9fa',
    name: 'Púrpura Elegante'
  },
  blue: {
    primary: '#077bd5',
    secondary: '#0563b8',
    accent: '#00d4ff',
    dark: '#1a1a1a',
    light: '#f0f8ff',
    name: 'Azul Profesional'
  },
  green: {
    primary: '#10b981',
    secondary: '#059669',
    accent: '#34d399',
    dark: '#111827',
    light: '#ecfdf5',
    name: 'Verde Natural'
  },
  orange: {
    primary: '#f97316',
    secondary: '#ea580c',
    accent: '#fb923c',
    dark: '#292524',
    light: '#fff7ed',
    name: 'Naranja Energético'
  },
  pink: {
    primary: '#ec4899',
    secondary: '#be185d',
    accent: '#f472b6',
    dark: '#500724',
    light: '#fdf2f8',
    name: 'Rosa Vibrante'
  },
};

const BASE_THEME_KEYS = Object.keys(DEFAULT_THEMES);

export function ThemeProvider({ children }) {
  const [customThemes, setCustomThemes] = useState(() => {
    const saved = localStorage.getItem('customThemes');
    return saved ? JSON.parse(saved) : {};
  });

  const allThemes = {
    ...DEFAULT_THEMES,
    ...customThemes,
  };

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('selectedTheme');
    return saved ? JSON.parse(saved) : DEFAULT_THEMES.original;
  });

  const [customColors, setCustomColors] = useState(() => {
    const saved = localStorage.getItem('customColors');
    return saved ? JSON.parse(saved) : theme;
  });

  useEffect(() => {
    localStorage.setItem('selectedTheme', JSON.stringify(theme));
    localStorage.setItem('customColors', JSON.stringify(customColors));
    localStorage.setItem('customThemes', JSON.stringify(customThemes));
  }, [theme, customColors, customThemes]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    setCustomColors(newTheme);
  };

  const updateColor = (colorKey, value) => {
    const updated = { ...customColors, [colorKey]: value };
    setCustomColors(updated);
    setTheme(updated);
  };

  const resetColors = () => {
    updateTheme(DEFAULT_THEMES.original);
  };

  const saveThemeTemplate = (templateKey, template) => {
    setCustomThemes((currentTemplates) => ({
      ...currentTemplates,
      [templateKey]: template,
    }));
  };

  const deleteThemeTemplate = (templateKey) => {
    if (BASE_THEME_KEYS.includes(templateKey)) return;

    setCustomThemes((currentTemplates) => {
      const nextTemplates = { ...currentTemplates };
      delete nextTemplates[templateKey];
      return nextTemplates;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: customColors,
        updateTheme,
        updateColor,
        resetColors,
        defaultThemes: allThemes,
        baseThemeKeys: BASE_THEME_KEYS,
        saveThemeTemplate,
        deleteThemeTemplate,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
