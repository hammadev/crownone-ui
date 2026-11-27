import { useTheme } from "../../../theme/ThemeContext";
import { CONTAINER_PADDING } from "../../../theme";
import { BlurView } from "expo-blur";
import React, { useCallback } from "react";
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomActionsBarProps = {
  children: React.ReactNode;
  /** Styles for the BlurView container */
  style?: StyleProp<ViewStyle>;
  /** Styles for the inner content row/column */
  contentStyle?: StyleProp<ViewStyle>;
  /** BlurView appearance */
  intensity?: number;

  /** Padding controls */
  horizontalPadding?: number; // default CONTAINER_PADDING
  verticalPadding?: number; // default CONTAINER_PADDING/2

  /** Layout controls */
  layout?: "row" | "column"; // default 'row'
  gap?: number; // default 10
  align?: "flex-start" | "center" | "flex-end" | "stretch"; // default 'center'
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"; // default 'center'

  /** Behavior */
  showTopEdge?: boolean; // default true
  sticky?: boolean; // default true
  respectSafeArea?: boolean; // default true

  /** Report height so you can pad your ScrollView content */
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
    (e: LayoutChangeEvent) => {
      onHeight?.(e.nativeEvent.layout.height);
    },
    [onHeight],
  );

  return (
    <BlurView
      tint={
        theme.dark ? "systemChromeMaterialDark" : "systemChromeMaterialLight"
      }
      intensity={intensity}
      onLayout={handleLayout}
      style={[
        styles.container,
        sticky && styles.sticky,
        showTopEdge && [
          styles.topEdge,
          { borderTopColor: theme.colors.border },
        ],
        {
          paddingHorizontal: horizontalPadding,
          paddingTop: verticalPadding,
          paddingBottom: bottomPad,
          width: "100%",
        },
        style,
      ]}
    >
      <View
        style={[
          {
            flexDirection: layout,
            gap,
            alignItems: align,
            justifyContent: justify,
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {},
  sticky: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  topEdge: {
    borderTopWidth: StyleSheet.hairlineWidth,
    // shadowColor: '#000',
    // shadowOpacity: 0.06,
    // shadowRadius: 8,
    // shadowOffset: { width: 0, height: -2 },
    // elevation: 4,
    backgroundColor: "transparent",
  },
});

export default BottomActionsBar;
