import React, { useState } from "react";
import { Image, ImageProps, ImageSourcePropType, StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

type StyledImageProps = ImageProps & {
  style?: ViewStyle;
  source: ImageSourcePropType;
  placeholderSource?: ImageSourcePropType;
  loaderColor?: string;
};

const StyledImage = ({ style, source, placeholderSource, loaderColor: _loaderColor, ...props }: StyledImageProps) => {
  const _theme = useTheme();
  const [imageError, setImageError] = useState(false);

  const defaultPlaceholder = { uri: "" };
  const imageSource = imageError ? placeholderSource || defaultPlaceholder : source;

  return (
    <View style={[styles.container, style]}>
      <Image
        style={StyleSheet.absoluteFill}
        source={imageSource}
        onError={() => setImageError(true)}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
});

export default StyledImage;
