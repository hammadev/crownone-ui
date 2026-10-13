import React from "react";
import { StyleSheet, View } from "react-native";
import { CONTAINER_PADDING } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

export default function OrDivider({ label = "OR" }: { label?: string }) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
      <StyledText mini textColor="gray600" style={{ marginHorizontal: 8 }}>
        {label}
      </StyledText>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", marginVertical: CONTAINER_PADDING / 1.2 },
  line: { flex: 1, height: 1 },
});
