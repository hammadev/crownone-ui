import React, { createContext, useContext } from "react";
import { AppTheme, darkTheme, lightTheme } from "./defaultTheme";

const ThemeContext = createContext<AppTheme>(lightTheme);

type ThemeProviderProps = {
  children: React.ReactNode;
  /** Pass a full custom theme object to override defaults. */
  theme?: AppTheme;
  /** Shortcut to switch to the built-in dark theme (ignored when `theme` is provided). */
  dark?: boolean;
};

export function ThemeProvider({ children, theme, dark }: ThemeProviderProps) {
  const resolved = theme ?? (dark ? darkTheme : lightTheme);
  return (
    <ThemeContext.Provider value={resolved}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): AppTheme {
  return useContext(ThemeContext);
}
