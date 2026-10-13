import { Platform, StyleSheet } from "react-native";

export const FONT_FAMILIES = {
  light: Platform.OS === "web" ? "Inter" : "inter_light",
  regular: Platform.OS === "web" ? "Inter" : "inter_regular",
  medium: Platform.OS === "web" ? "Inter" : "inter_medium",
  semiBold: Platform.OS === "web" ? "Inter" : "inter_semiBold",
  bold: Platform.OS === "web" ? "Inter" : "inter_bold",
};

export const fontStyles = StyleSheet.create({
  heading1Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 36 },
  heading1Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 36 },
  heading2Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 32 },
  heading2Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 32 },
  heading3Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 29 },
  heading3Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 29 },
  heading4Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 26 },
  heading4Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 26 },
  heading5Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 23 },
  heading5Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 23 },
  heading6Bold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 20 },
  heading6Regular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 20 },
  bodyLargeBold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 18 },
  bodyLargeRegular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 18 },
  bodyMediumBold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 16 },
  bodyMediumRegular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 16 },
  bodySmallBold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 14 },
  bodySmallRegular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 14 },
  bodyXSmallBold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 13 },
  bodyXSmallRegular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 13 },
  bodyXXSmallBold: { fontFamily: FONT_FAMILIES.bold, fontWeight: "700", fontSize: 11 },
  bodyXXSmallRegular: { fontFamily: FONT_FAMILIES.regular, fontWeight: "400", fontSize: 11 },
  default: { fontFamily: FONT_FAMILIES.regular, letterSpacing: 0, fontWeight: "400" },
});
