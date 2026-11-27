import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useTheme } from "../../../theme/ThemeContext";

interface IconComponentProps {
  name: string | undefined; // Name of the icon
  size: number; // Size of the icon
  color?: string; // Color of the icon (optional)
  style?: StyleProp<TextStyle>; // Custom styles for the icon (optional)
}

const IconComponent: React.FC<IconComponentProps> = ({ name, size, color, style }) => {
  const theme = useTheme();
  return <Icon name={name as any} size={size} color={color || theme.colors.icon} style={style} />;
};

export default IconComponent;
