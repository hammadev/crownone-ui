import React, { PropsWithChildren, useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
  duration?: number;
}

export function Skeleton({ children, style, duration = 1000 }: PropsWithChildren<SkeletonProps>) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View pointerEvents="none" style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
}
