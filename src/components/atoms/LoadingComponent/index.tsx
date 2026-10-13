import React from "react";
import { ActivityIndicator, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

interface LoadingComponentProps {
  loading?: boolean;
  style?: ViewStyle;
  size: "small" | "large";
  color?: string;
}

export const LoadingComponent: React.FC<LoadingComponentProps> = ({ loading = false, style, size, color }) => {
  const theme = useTheme();
  if (loading) {
    return <ActivityIndicator size={size} style={style} color={color || theme.colors.textInverse} testID="activity-indicator" />;
  }
  return null;
};

export default React.memo(LoadingComponent);
