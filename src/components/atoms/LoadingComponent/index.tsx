import * as React from 'react';
import { ActivityIndicator, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

interface Props {
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  size:'small' | 'large',
  color?:string,
}

export const LoadingComponent: React.FC<Props> = ({loading = false,style,size,color}) => {
  const theme = useTheme();
  if (loading) {
    return <ActivityIndicator size={size} style={style} color={color || theme.colors.textInverse} testID="activity-indicator" />;
  }
  return null;
};

export default React.memo(LoadingComponent);
