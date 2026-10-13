import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

interface AlphabetAvatarProps {
  name: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

const AlphabetAvatar: React.FC<AlphabetAvatarProps> = ({ name = "A", size = 44, style }) => {
  const theme = useTheme();
  const bgColorOptions = [theme.colors.infoSoft, theme.colors.warningSoft, theme.colors.successSoft];
  const textColorOptions = [theme.colors.info, theme.colors.warning, theme.colors.success];

  const firstChar = name.trim().charAt(0).toUpperCase() || "A";
  const index = firstChar.charCodeAt(0) % bgColorOptions.length;

  const bgColor = bgColorOptions[index] || theme.colors.backgroundSecondary;
  const textColor = textColorOptions[index] || theme.colors.text;

  return (
    <View
      style={[
        { width: size, height: size, borderRadius: size / 2, justifyContent: "center", alignItems: "center", backgroundColor: bgColor },
        style,
      ]}
    >
      <StyledText style={{ color: textColor, fontWeight: "700", fontSize: moderateScale(size / 3) }}>
        {firstChar}
      </StyledText>
    </View>
  );
};

export default AlphabetAvatar;
