import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { CONTAINER_PADDING, RADIUS } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";
import StyledIcon from "../StyledIcon";
import StyledText from "../StyledText";

export type StatusCardVariant = "error" | "warning" | "info" | "success";

interface StatusCardProps {
  message?: string;
  description?: string;
  variant?: StatusCardVariant;
  title?: string;
  iconName?: string;
  hintText?: string;
  onPress?: (e: GestureResponderEvent) => void;
  clickable?: boolean;
  style?: ViewStyle;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  message,
  description,
  variant = "error",
  title,
  iconName,
  hintText,
  onPress,
  clickable = false,
  style,
}) => {
  const theme = useTheme();
  const Container: React.ElementType = clickable ? TouchableOpacity : View;

  const variantConfig = {
    error: { backgroundColor: theme.colors.dangerSoft, iconColor: theme.colors.danger, textColor: "danger" as const, defaultIcon: "alert-circle-outline", defaultTitle: "Error" },
    warning: { backgroundColor: theme.colors.warningSoft, iconColor: theme.colors.warning, textColor: theme.colors.warning, defaultIcon: "alert-outline", defaultTitle: "Warning" },
    info: { backgroundColor: theme.colors.infoSoft, iconColor: theme.colors.info, textColor: theme.colors.info, defaultIcon: "information-outline", defaultTitle: "Info" },
    success: { backgroundColor: theme.colors.successSoft, iconColor: theme.colors.success, textColor: theme.colors.success, defaultIcon: "check-circle-outline", defaultTitle: "Success" },
  }[variant];

  return (
    <Container
      activeOpacity={0.8}
      style={{ ...styles.container, ...style, backgroundColor: variantConfig.backgroundColor }}
      {...(clickable && onPress ? { onPress } : {})}
    >
      <View style={styles.iconWrapper}>
        <StyledIcon name={iconName || variantConfig.defaultIcon} size={28} color={variantConfig.iconColor} />
      </View>
      <View style={styles.textWrapper}>
        {title && (
          <StyledText bold textColor={variantConfig.textColor} style={styles.label}>
            {title || variantConfig.defaultTitle}
          </StyledText>
        )}
        {message && (
          <StyledText bold textColor={variantConfig.textColor} style={styles.text}>
            {message}
          </StyledText>
        )}
        {description ? (
          <StyledText mini textColor={variantConfig.textColor} style={styles.subText}>
            {description}
          </StyledText>
        ) : null}
        {clickable ? (
          <StyledText mini textColor={variantConfig.textColor} style={styles.subText}>
            {hintText || "Tap to check details."}
          </StyledText>
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", borderRadius: RADIUS, padding: CONTAINER_PADDING, alignItems: "center" },
  iconWrapper: { marginRight: 12, justifyContent: "center", alignItems: "center" },
  textWrapper: { flex: 1 },
  label: { fontSize: 12, lineHeight: 18, marginBottom: 2, textTransform: "uppercase" },
  text: { fontSize: 16, lineHeight: 22 },
  subText: { fontSize: 13, marginTop: 4 },
});
