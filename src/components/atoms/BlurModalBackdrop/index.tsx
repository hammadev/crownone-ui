import { BlurView } from "expo-blur";
import React from "react";
import { Platform, Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

type BlurModalBackdropProps = {
  children: React.ReactNode;
  onPress?: () => void;
  contentStyle?: StyleProp<ViewStyle>;
};

export default function BlurModalBackdrop({ children, onPress, contentStyle }: BlurModalBackdropProps) {
  const theme = useTheme();
  return (
    <Pressable style={styles.overlay} onPress={onPress}>
      {Platform.OS === "android" ? (
        <BlurView
          intensity={60}
          tint={theme.dark ? "dark" : "light"}
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <BlurView intensity={28} tint={theme.dark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
      )}
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          styles.overlayTint,
          { backgroundColor: theme.dark ? "rgba(0,0,0,0.22)" : "rgba(255,255,255,0.14)" },
        ]}
      />
      <Pressable onPress={(e) => e.stopPropagation()} style={[styles.content, contentStyle]}>
        {children}
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1 },
  overlayTint: { opacity: 1 },
  content: { flex: 1 },
});
