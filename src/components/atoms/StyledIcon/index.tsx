import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

interface StyledIconProps {
  name: string | undefined;
  size: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

const StyledIcon: React.FC<StyledIconProps> = ({ name, size, color, style }) => {
  const theme = useTheme();
  return <Icon name={name as any} size={size} color={color || theme.colors.icon} style={style} />;
};

export default StyledIcon;
