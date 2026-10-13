import React from "react";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

type StyledCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: ((ele: any) => void) | null;
  isPressable?: boolean;
};

export default function StyledCard({ children, style, onPress }: StyledCardProps) {
  const theme = useTheme();
  const CardContainer = onPress != null ? TouchableOpacity : View;
  return (
    <CardContainer
      onPress={onPress ?? undefined}
      activeOpacity={0.5}
      style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.borderSoft }, style]}
    >
      {children}
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 20, borderWidth: 1, padding: 14 },
});
