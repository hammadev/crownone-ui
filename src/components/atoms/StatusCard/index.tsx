import IconComponent from "../StyledIcon";
import StyledText from "../StyledText";
import { useStrings } from "../../../theme/strings";
import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import { CONTAINER_PADDING, RADIUS } from "../../../theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle, StyleProp } from "react-native";

export type StatusCardVariant = "error" | "warning" | "info" | "success";

interface StatusCardProps {
  message?: string;
  description?: string;
  variant?: StatusCardVariant;
  title?: string;
  iconName?: string;
  hintText?: string;
  onPress?: () => void;
  clickable?: boolean;
  style?: StyleProp<ViewStyle>;
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
  const strings = useStrings();
  const guardedPress = useSinglePress(onPress);
  const Container: React.ElementType = clickable ? TouchableOpacity : View;

  const variantConfig = {
    error: {
      backgroundColor: theme.colors.dangerSoft,
      borderColor: theme.colors.danger,
      iconColor: theme.colors.danger,
      textColor: "danger" as const,
      defaultIcon: "alert-circle-outline",
      defaultTitle: strings.errorTitle,
    },
    warning: {
      backgroundColor: theme.colors.warningSoft,
      borderColor: theme.colors.warning,
      iconColor: theme.colors.warning,
      textColor: theme.colors.warning,
      defaultIcon: "alert-outline",
      defaultTitle: strings.warningTitle,
    },
    info: {
      backgroundColor: theme.colors.infoSoft,
      borderColor: theme.colors.info,
      iconColor: theme.colors.info,
      textColor: theme.colors.info,
      defaultIcon: "information-outline",
      defaultTitle: strings.infoTitle,
    },
    success: {
      backgroundColor: theme.colors.successSoft,
      borderColor: theme.colors.success,
      iconColor: theme.colors.success,
      textColor: theme.colors.success,
      defaultIcon: "check-circle-outline",
      defaultTitle: strings.successTitle,
    },
  }[variant];

  return (
    <Container
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          backgroundColor: variantConfig.backgroundColor,
          borderColor: variantConfig.borderColor,
        },
      ]}
      {...(clickable && onPress ? { onPress: guardedPress } : {})}
    >
      <View style={styles.iconWrapper}>
        <IconComponent
          name={iconName || variantConfig.defaultIcon}
          size={28}
          color={variantConfig.iconColor}
        />
      </View>
      <View style={styles.textWrapper}>
        {title && (
          <StyledText
            bold
            textColor={variantConfig.textColor}
            style={styles.label}
          >
            {title || variantConfig.defaultTitle}
          </StyledText>
        )}
        {message && (
          <StyledText
            bold
            textColor={variantConfig.textColor}
            style={styles.text}
          >
            {message}
          </StyledText>
        )}
        {description ? (
          <StyledText
            mini
            textColor={variantConfig.textColor}
            style={styles.subText}
          >
            {description}
          </StyledText>
        ) : null}
        {clickable ? (
          <StyledText
            mini
            textColor={variantConfig.textColor}
            style={styles.subText}
          >
            {hintText || strings.tapForDetails}
          </StyledText>
        ) : null}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: RADIUS,
    borderWidth: 1,
    padding: CONTAINER_PADDING,
    alignItems: "center",
  },
  iconWrapper: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  subText: {
    fontSize: 13,
    marginTop: 4,
  },
});
