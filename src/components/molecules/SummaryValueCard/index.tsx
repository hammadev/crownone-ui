import StyledText from "../../../components/atoms/StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import { CONTAINER_PADDING } from "../../../theme";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";

type SummaryValueCardProps = {
  title: string;
  value: string;
  variant: "sent" | "received" | "success" | "warning" | "danger" | "info";
  style?: StyleProp<ViewStyle>;
};

export default function SummaryValueCard({
  title,
  value,
  variant,
  style,
}: SummaryValueCardProps) {
  const theme = useTheme();
  const resolvedVariant =
    variant === "received"
      ? "success"
      : variant === "sent"
        ? "warning"
        : variant;

  const variantColors = {
    success: {
      color: theme.colors.success,
      background: theme.colors.successSoft,
    },
    warning: {
      color: theme.colors.warning,
      background: theme.colors.warningSoft,
    },
    danger: {
      color: theme.colors.danger,
      background: theme.colors.dangerSoft,
    },
    info: {
      color: theme.colors.info,
      background: theme.colors.infoSoft,
    },
  }[resolvedVariant];

  const cardColor = variantColors.color;
  const cardBackground = variantColors.background;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: cardBackground,
          borderColor: cardColor,
        },
        style,
      ]}
    >
      <StyledText variant="bodyLargeBold" textColor={cardColor}>
        {value}
      </StyledText>
      <StyledText
        variant="bodyXXSmallRegular"
        textColor={cardColor}
        style={styles.centerText}
      >
        {title}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // minHeight: 72,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: CONTAINER_PADDING / 1.5,
    gap: 4,
  },
  centerText: {
    textAlign: "center",
  },
});
