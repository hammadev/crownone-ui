export * from "./colors";
export * from "./fonts";
export * from "./defaultTheme";
export * from "./ThemeContext";

export const CONTAINER_PADDING = 16;
export const RADIUS = 8;

// StyleSheet.absoluteFillObject was removed in React Native 0.86; this works on every version.
export const ABSOLUTE_FILL = { position: "absolute", top: 0, right: 0, bottom: 0, left: 0 } as const;
