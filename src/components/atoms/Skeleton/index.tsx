import React, { useEffect, PropsWithChildren } from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { ViewStyle, StyleProp } from 'react-native';

export interface SkeletonProps {
  style?: StyleProp<ViewStyle>;
  duration?: number; // ms
}

export function Skeleton({
  children,
  style,
  duration = 1000,
}: PropsWithChildren<SkeletonProps>) {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true // reverse
    );
  }, [duration]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      // don’t let touches hit skeletons
      pointerEvents="none"
      style={[style, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
}