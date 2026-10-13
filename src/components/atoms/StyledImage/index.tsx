import { Image, type ImageProps, type ImageSource, type ImageStyle } from "expo-image";
import React, { useState } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

type StyledImageProps = ImageProps & {
  style?: StyleProp<ImageStyle>;
  source: NonNullable<ImageProps["source"]>;
  placeholderSource?: ImageSource;
  loaderColor?: string;
};

const StyledImage = ({ style, source, placeholderSource, loaderColor, ...props }: StyledImageProps) => {
  const theme = useTheme();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const defaultPlaceholder = { uri: "" };

  const customizedLoaderColor = loaderColor || theme.colors.primary;
  const imageSource = imageError ? placeholderSource || defaultPlaceholder : source;

  return (
    <View style={[styles.container, style]}>
      <Image
        style={StyleSheet.absoluteFill}
        source={imageSource}
        // @ts-ignore
        onError={() => { setImageError(true); setIsLoading(false); }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        {...props}
      />
      {isLoading && (
        <View style={[styles.loaderContainer, { backgroundColor: theme.colors.background }]}>
          <ActivityIndicator size="small" color={customizedLoaderColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StyledImage;
