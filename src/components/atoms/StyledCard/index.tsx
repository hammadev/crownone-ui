import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

type StyledCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: (() => void) | null;
  /** Set false to render a static card even when `onPress` is passed. */
  isPressable?: boolean;
};

export default function StyledCard({
  children,
  style,
  onPress = undefined,
  isPressable = true,
}: StyledCardProps) {
  const theme = useTheme();
  const handlePress = useSinglePress(onPress ?? undefined);
  const CardContainer = isPressable && onPress ? TouchableOpacity : View;
  return (
    <CardContainer
      onPress={handlePress}
      activeOpacity={0.5}
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.borderSoft,
        },
        style,
      ]}
    >{children}</CardContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 14,
  },
});
