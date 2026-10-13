import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

export type StyledChipVariant =
  | "default" | "selected" | "primary" | "outline"
  | "success" | "warning" | "danger" | "info" | "light";

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  chipStyle?: ViewStyle;
  textStyle?: TextStyle;
  size?: "sm" | "lg";
  variant?: StyledChipVariant;
};

const StyledChip: React.FC<ChipProps> = ({
  label,
  selected,
  onPress,
  chipStyle,
  textStyle,
  size = "lg",
  variant = "default",
}) => {
  const theme = useTheme();
  const Container = onPress ? TouchableOpacity : View;
  const resolvedVariant = selected ? "selected" : variant;

  const variantStyles = (() => {
    switch (resolvedVariant) {
      case "selected":
        return { chip: { backgroundColor: theme.colors.text, borderColor: theme.colors.text }, text: { color: theme.colors.textInverse } };
      case "primary":
        return { chip: { backgroundColor: theme.colors.primarySoft, borderColor: theme.colors.primary }, text: { color: theme.colors.primary } };
      case "outline":
        return { chip: { backgroundColor: "transparent", borderColor: theme.colors.border }, text: { color: theme.colors.text } };
      case "success":
        return { chip: { backgroundColor: theme.colors.successSoft, borderColor: theme.colors.success }, text: { color: theme.colors.success } };
      case "warning":
        return { chip: { backgroundColor: theme.colors.warningSoft, borderColor: theme.colors.warning }, text: { color: theme.colors.warning } };
      case "danger":
        return { chip: { backgroundColor: theme.colors.dangerSoft, borderColor: theme.colors.danger }, text: { color: theme.colors.danger } };
      case "info":
        return { chip: { backgroundColor: theme.colors.infoSoft, borderColor: theme.colors.info }, text: { color: theme.colors.info } };
      case "light":
        return { chip: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }, text: { color: theme.colors.text } };
      case "default":
      default:
        return { chip: { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }, text: { color: theme.colors.text } };
    }
  })();

  return (
    <Container
      style={[styles.chip, variantStyles.chip, styles.chipBorder, size === "sm" ? styles.chipSmall : styles.chipLarge, chipStyle]}
      {...(onPress ? { onPress } : {})}
    >
      <StyledText mini={size === "sm"} style={[variantStyles.text, textStyle]}>
        {label}
      </StyledText>
    </Container>
  );
};

export default StyledChip;

const styles = StyleSheet.create({
  chip: { borderRadius: 20 },
  chipBorder: { borderWidth: 1 },
  chipSmall: { paddingHorizontal: 8, paddingVertical: 4 },
  chipLarge: { paddingHorizontal: 16, paddingVertical: 8 },
});
