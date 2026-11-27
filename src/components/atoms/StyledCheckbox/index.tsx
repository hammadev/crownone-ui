import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, ViewStyle, StyleProp } from "react-native";

type StyledCheckboxProps = {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function StyledCheckbox({
  value,
  onChange,
  disabled = false,
  style,
}: StyledCheckboxProps) {
  const theme = useTheme();
  const handlePress = useSinglePress(() => {
    if (!disabled) onChange?.(!value);
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.checkbox,
        {
          backgroundColor: value
            ? theme.colors.primary
            : theme.colors.surface,
          borderColor: value ? theme.colors.primary : theme.colors.border,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {value ? (
        <Ionicons
          name="checkmark"
          size={16}
          color={theme.colors.textInverse}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
});

