import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { ActivityIndicator, Animated, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { CONTAINER_PADDING, RADIUS } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

export type StyledButtonVariant = "primary" | "outline" | "success" | "danger" | "info" | "light";

export type StyledButtonProps = {
  onPress?: () => void;
  title: string;
  style?: object;
  textStyle?: object;
  textColor?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: StyledButtonVariant;
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  containerStyle?: ViewStyle;
};

const StyledButton: React.FC<StyledButtonProps> = ({
  onPress,
  title,
  textColor,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  variant = "primary",
  rounded = false,
  disabled = false,
  loading = false,
  containerStyle,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const isPrimaryVariant = variant === "primary";
  const isOutlineVariant = variant === "outline";

  const getSolidVariantStyles = () => {
    switch (variant) {
      case "outline":
        return { backgroundColor: "transparent", borderColor: theme.colors.text, labelColor: theme.colors.text };
      case "success":
        return { backgroundColor: theme.colors.success, borderColor: theme.colors.success, labelColor: theme.colors.textInverse };
      case "danger":
        return { backgroundColor: theme.colors.danger, borderColor: theme.colors.danger, labelColor: theme.colors.textInverse };
      case "info":
        return { backgroundColor: theme.colors.info, borderColor: theme.colors.info, labelColor: theme.colors.textInverse };
      case "light":
        return { backgroundColor: theme.colors.surface, borderColor: theme.colors.border, labelColor: theme.colors.text, borderWidth: 1.5 };
      case "primary":
      default:
        return { backgroundColor: "transparent", borderColor: "transparent", labelColor: theme.colors.textInverse };
    }
  };

  const variantStyles = getSolidVariantStyles();

  const handlePressIn = () => {
    if (!disabled) Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    if (!disabled) Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  const [cooldown, setCooldown] = React.useState(false);
  const handlePress = () => {
    if (disabled || loading || cooldown) return;
    setCooldown(true);
    onPress?.();
    setTimeout(() => setCooldown(false), 1000);
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, containerStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[
          styles.button,
          !rounded && styles.squareButton,
          isPrimaryVariant && styles.gradientButton,
          disabled && [styles.disabledButton, { backgroundColor: theme.colors.backgroundSecondary, borderColor: theme.colors.border }],
          !isPrimaryVariant && {
            backgroundColor: variantStyles.backgroundColor,
            borderWidth: isOutlineVariant ? 1 : StyleSheet.hairlineWidth,
            borderColor: variantStyles.borderColor,
            paddingVertical: isOutlineVariant ? 13 : 14,
          },
          style,
        ]}
      >
        {!disabled && isPrimaryVariant ? (
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryPressed]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[StyleSheet.absoluteFillObject, { borderRadius: rounded ? 100 : RADIUS * 2 }]}
          />
        ) : null}
        {loading ? (
          <ActivityIndicator color={theme.colors.textInverse} size="small" />
        ) : (
          <>
            {leftIcon && <View style={[styles.icon, disabled && styles.disabledIcon]}>{leftIcon}</View>}
            {title !== "" && (
              <StyledText
                buttonLabel
                textColor={disabled ? theme.colors.textMuted : textColor || variantStyles.labelColor}
                style={{ ...textStyle, textTransform: "capitalize", marginHorizontal: 5 }}
              >
                {title}
              </StyledText>
            )}
            {rightIcon && <View style={[styles.icon, disabled && styles.disabledIcon]}>{rightIcon}</View>}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: CONTAINER_PADDING,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    minHeight: 45,
    overflow: "visible",
  },
  squareButton: { borderRadius: 14 },
  gradientButton: { backgroundColor: "transparent" },
  icon: { justifyContent: "center", alignItems: "center", height: 18, width: 20 },
  disabledButton: {},
  disabledIcon: { opacity: 0.5 },
});
