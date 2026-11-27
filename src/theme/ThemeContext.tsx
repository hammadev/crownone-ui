import React, { createContext, useContext, useMemo } from "react";
import { AppTheme, darkTheme, lightTheme } from "./defaultTheme";
import { defaultStrings, StringsContext, UIStrings } from "./strings";

const ThemeContext = createContext<AppTheme>(lightTheme);

type ThemeProviderProps = {
  children: React.ReactNode;
  /** Pass a full custom theme object to override defaults. */
  theme?: AppTheme;
  /** Shortcut to switch to the built-in dark theme (ignored when `theme` is provided). */
  dark?: boolean;
  /** Translations for the text components render by default (e.g. "Cancel", "OR"). Missing keys fall back to English. */
  strings?: Partial<UIStrings>;
};

export function ThemeProvider({ children, theme, dark, strings }: ThemeProviderProps) {
  const resolved = theme ?? (dark ? darkTheme : lightTheme);
  const resolvedStrings = useMemo(() => ({ ...defaultStrings, ...strings }), [strings]);
  return (
    <ThemeContext.Provider value={resolved}>
      <StringsContext.Provider value={resolvedStrings}>{children}</StringsContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): AppTheme {
  return useContext(ThemeContext);
}
