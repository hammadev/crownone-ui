import { colors, palette } from "./colors";

export type AppTheme = {
  dark: boolean;
  colors: {
    primary: string;
    primaryPressed: string;
    primarySoft: string;
    secondary: string;

    background: string;
    backgroundSecondary: string;
    backgroundTertiary: string;

    surface: string;
    surfaceSecondary: string;
    card: string;
    border: string;
    borderSoft: string;

    text: string;
    textSecondary: string;
    textMuted: string;
    textInverse: string;

    icon: string;
    placeholder: string;

    success: string;
    successSoft: string;
    warning: string;
    warningSoft: string;
    danger: string;
    dangerSoft: string;
    info: string;
    infoSoft: string;

    overlay: string;
    shadow: string;

    tabIconDefault: string;
    tabIconSelected: string;
    statusBar: "dark-content" | "light-content";
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    pill: number;
  };
};

export const lightTheme: AppTheme = {
  dark: false,
  colors: {
    primary: palette.primary,
    primaryPressed: palette.primaryPressed,
    primarySoft: palette.primarySoft,
    secondary: palette.secondary,

    background: "rgba(247, 247, 247, 1)",
    backgroundSecondary: colors.gray100,
    backgroundTertiary: colors.gray200,

    surface: colors.gray50,
    surfaceSecondary: colors.gray100,
    card: colors.gray50,
    border: colors.gray200,
    borderSoft: colors.gray100,

    text: colors.indigo950,
    textSecondary: colors.gray700,
    textMuted: colors.gray500,
    textInverse: colors.gray50,

    icon: colors.gray700,
    placeholder: colors.gray400,

    success: palette.success,
    successSoft: palette.successSoft,
    warning: palette.warning,
    warningSoft: palette.warningSoft,
    danger: palette.danger,
    dangerSoft: palette.dangerSoft,
    info: palette.info,
    infoSoft: palette.infoSoft,

    overlay: "rgba(18, 15, 36, 0.12)",
    shadow: "rgba(18, 15, 36, 0.08)",

    tabIconDefault: colors.gray400,
    tabIconSelected: palette.primary,
    statusBar: "dark-content",
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, pill: 999 },
};

export const darkTheme: AppTheme = {
  dark: true,
  colors: {
    primary: palette.primary,
    primaryPressed: colors.orange400,
    primarySoft: colors.orange100,
    secondary: colors.indigo400,

    background: "rgba(12, 12, 14, 1)",
    backgroundSecondary: colors.gray950,
    backgroundTertiary: colors.gray900,

    surface: "rgba(24, 24, 28, 1)",
    surfaceSecondary: "rgba(32, 32, 36, 1)",
    card: "rgba(24, 24, 28, 1)",
    border: "rgba(255, 255, 255, 0.08)",
    borderSoft: "rgba(255, 255, 255, 0.05)",

    text: colors.gray50,
    textSecondary: colors.gray200,
    textMuted: colors.gray400,
    textInverse: colors.indigo950,

    icon: colors.gray200,
    placeholder: colors.gray500,

    success: colors.alertSuccess400,
    successSoft: "rgba(31, 154, 70, 0.16)",
    warning: colors.alertWarning400,
    warningSoft: "rgba(254, 79, 17, 0.16)",
    danger: colors.alertDanger400,
    dangerSoft: "rgba(217, 54, 54, 0.16)",
    info: colors.alertInfo400,
    infoSoft: "rgba(51, 157, 212, 0.16)",

    overlay: "rgba(0, 0, 0, 0.35)",
    shadow: "rgba(0, 0, 0, 0.35)",

    tabIconDefault: colors.gray500,
    tabIconSelected: palette.primary,
    statusBar: "light-content",
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  radius: { xs: 6, sm: 10, md: 14, lg: 18, xl: 24, pill: 999 },
};
