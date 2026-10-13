import { BlurView } from "expo-blur";
import React, { useCallback } from "react";
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CONTAINER_PADDING } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";

type BottomActionsBarProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  intensity?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  layout?: "row" | "column";
  gap?: number;
  align?: "flex-start" | "center" | "flex-end" | "stretch";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  showTopEdge?: boolean;
  sticky?: boolean;
  respectSafeArea?: boolean;
  onHeight?: (h: number) => void;
};

const BottomActionsBar: React.FC<BottomActionsBarProps> = ({
  children,
  style,
  contentStyle,
  intensity = 50,
  horizontalPadding = CONTAINER_PADDING,
  verticalPadding = CONTAINER_PADDING / 2,
  layout = "row",
  gap = 10,
  align = "center",
  justify = "center",
  showTopEdge = true,
  sticky = true,
  respectSafeArea = true,
  onHeight,
}) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const bottomPad = (respectSafeArea ? insets.bottom : 0) + verticalPadding;

  const handleLayout = useCallback(
    (e: LayoutChangeEvent) => { onHeight?.(e.nativeEvent.layout.height); },
    [onHeight],
  );

  return (
    <BlurView
      tint={theme.dark ? "systemChromeMaterialDark" : "systemChromeMaterialLight"}
      intensity={intensity}
      onLayout={handleLayout}
      style={[
        styles.container,
        sticky && styles.sticky,
        showTopEdge && [styles.topEdge, { borderTopColor: theme.colors.border }],
        { paddingHorizontal: horizontalPadding, paddingTop: verticalPadding, paddingBottom: bottomPad, width: "100%" },
        style,
      ]}
    >
      <View style={[{ flexDirection: layout, gap, alignItems: align, justifyContent: justify }, contentStyle]}>
        {children}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {},
  sticky: { position: "absolute", left: 0, right: 0, bottom: 0 },
  topEdge: { borderTopWidth: StyleSheet.hairlineWidth, backgroundColor: "transparent" },
});

export default BottomActionsBar;
