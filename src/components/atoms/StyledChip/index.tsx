import StyledText from "../StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle, StyleProp } from "react-native";

export type StyledChipVariant =
  | "default"
  | "selected"
  | "primary"
  | "outline"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "light";

type ChipProps = {
  label: string; // Chip label
  selected?: boolean; // Whether the chip is selected
  onPress?: () => void; // Callback for chip press
  chipStyle?: StyleProp<ViewStyle>; // Optional additional styles for the chip
  textStyle?: StyleProp<TextStyle>; // Optional additional styles for the text
  size?: "sm" | "lg"; // Chip size: small or large
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
  const handlePress = useSinglePress(onPress);
  const Container = onPress ? TouchableOpacity : View;
  const resolvedVariant = selected ? "selected" : variant;

  const variantStyles = (() => {
    switch (resolvedVariant) {
      case "selected":
        return {
          chip: {
            backgroundColor: theme.colors.text,
            borderColor: theme.colors.text,
          },
          text: { color: theme.colors.textInverse },
        };
      case "primary":
        return {
          chip: {
            backgroundColor: theme.colors.primarySoft,
            borderColor: theme.colors.primary,
          },
          text: { color: theme.colors.primary },
        };
      case "outline":
        return {
          chip: {
            backgroundColor: "transparent",
            borderColor: theme.colors.border,
          },
          text: { color: theme.colors.text },
        };
      case "success":
        return {
          chip: {
            backgroundColor: theme.colors.successSoft,
            borderColor: theme.colors.success,
          },
          text: { color: theme.colors.success },
        };
      case "warning":
        return {
          chip: {
            backgroundColor: theme.colors.warningSoft,
            borderColor: theme.colors.warning,
          },
          text: { color: theme.colors.warning },
        };
      case "danger":
        return {
          chip: {
            backgroundColor: theme.colors.dangerSoft,
            borderColor: theme.colors.danger,
          },
          text: { color: theme.colors.danger },
        };
      case "info":
        return {
          chip: {
            backgroundColor: theme.colors.infoSoft,
            borderColor: theme.colors.info,
          },
          text: { color: theme.colors.info },
        };
      case "light":
        return {
          chip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
          text: { color: theme.colors.text },
        };
      case "default":
      default:
        return {
          chip: {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
          text: { color: theme.colors.text },
        };
    }
  })();

  return (
    <Container
      style={[
        styles.chip,
        variantStyles.chip,
        styles.chipBorder,
        size === "sm" ? styles.chipSmall : styles.chipLarge,
        chipStyle, // Apply custom chip styles
      ]}
      {...(onPress ? { onPress: handlePress } : {})}
    >
      <StyledText
        mini={size === "sm"}
        style={[
          styles.chipText,
          variantStyles.text,
          textStyle, // Apply custom text styles
        ]}
      >
        {label}
      </StyledText>
    </Container>
  );
};

export default StyledChip;

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
  },
  chipBorder: {
    borderWidth: 1,
  },
  chipSmall: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  chipLarge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chipText: {},
});
