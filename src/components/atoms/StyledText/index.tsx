import React from "react";
import { I18nManager, Text, type ColorValue, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { fontStyles } from "../../../theme/fonts";
import { colors, colors as designColors } from "../../../theme/colors";
import { useTheme } from "../../../theme/ThemeContext";
import type { AppTheme } from "../../../theme/defaultTheme";

type TextVariant =
  | "heading1Bold" | "heading1Regular"
  | "heading2Bold" | "heading2Regular"
  | "heading3Bold" | "heading3Regular"
  | "heading4Bold" | "heading4Regular"
  | "heading5Bold" | "heading5Regular"
  | "heading6Bold" | "heading6Regular"
  | "bodyLargeBold" | "bodyLargeRegular"
  | "bodyMediumBold" | "bodyMediumRegular"
  | "bodySmallBold" | "bodySmallRegular"
  | "bodyXSmallBold" | "bodyXSmallRegular"
  | "bodyXXSmallBold" | "bodyXXSmallRegular";

interface StyledTextProps extends TextProps {
  variant?: TextVariant;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  buttonLabel?: boolean;
  small?: boolean;
  mini?: boolean;
  bold?: boolean;
  primary?: boolean;
  titleMedium?: boolean;
  title?: string;
  textColor?: ColorValue | keyof typeof colors | keyof AppTheme["colors"];
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

const resolveVariantStyle = (props: StyledTextProps): TextStyle => {
  const { variant, h1, h2, h3, h4, h5, h6, p, small, mini, buttonLabel, titleMedium, bold } = props;

  let base: TextStyle = fontStyles.bodyMediumRegular;

  if (variant) {
    base = fontStyles[variant];
  } else if (h1) {
    base = fontStyles.heading1Bold;
  } else if (h2) {
    base = fontStyles.heading2Bold;
  } else if (h3) {
    base = fontStyles.heading3Bold;
  } else if (h4) {
    base = fontStyles.heading4Bold;
  } else if (h5) {
    base = fontStyles.heading5Bold;
  } else if (h6) {
    base = fontStyles.heading6Bold;
  } else if (buttonLabel || titleMedium) {
    base = fontStyles.bodyMediumBold;
  } else if (small) {
    base = fontStyles.bodySmallRegular;
  } else if (mini) {
    base = fontStyles.bodyXSmallRegular;
  } else if (p) {
    base = fontStyles.bodyMediumRegular;
  }

  if (!bold) return base;

  if (base === fontStyles.heading1Regular) return fontStyles.heading1Bold;
  if (base === fontStyles.heading2Regular) return fontStyles.heading2Bold;
  if (base === fontStyles.heading3Regular) return fontStyles.heading3Bold;
  if (base === fontStyles.heading4Regular) return fontStyles.heading4Bold;
  if (base === fontStyles.heading5Regular) return fontStyles.heading5Bold;
  if (base === fontStyles.heading6Regular) return fontStyles.heading6Bold;
  if (base === fontStyles.bodyLargeRegular) return fontStyles.bodyLargeBold;
  if (base === fontStyles.bodyMediumRegular) return fontStyles.bodyMediumBold;
  if (base === fontStyles.bodySmallRegular) return fontStyles.bodySmallBold;
  if (base === fontStyles.bodyXSmallRegular) return fontStyles.bodyXSmallBold;
  if (base === fontStyles.bodyXXSmallRegular) return fontStyles.bodyXXSmallBold;

  return { ...base, fontFamily: fontStyles.bodyMediumBold.fontFamily, textAlign: I18nManager.isRTL ? "right" : "left" };
};

const resolveColor = (
  textColor: StyledTextProps["textColor"],
  primary: boolean | undefined,
  theme: AppTheme,
): ColorValue => {
  if (primary) return theme.colors.primary;
  if (!textColor) return theme.colors.text;
  if (typeof textColor === "string") {
    if ((theme.colors as Record<string, string>)[textColor]) return (theme.colors as Record<string, string>)[textColor];
    if ((colors as Record<string, string>)[textColor]) return (colors as Record<string, string>)[textColor];
    if ((designColors as Record<string, string>)[textColor]) return (designColors as Record<string, string>)[textColor];
  }
  return textColor as ColorValue;
};

const StyledText: React.FC<StyledTextProps> = ({ style, textColor, primary, children, ...props }) => {
  const theme = useTheme();
  const variantStyle = resolveVariantStyle(props);
  const color = resolveColor(textColor, primary, theme);
  return (
    <Text style={[variantStyle, { color, textAlign: "auto" }, style]} {...props}>
      {children}
    </Text>
  );
};

export default StyledText;
