import StyledText from "../StyledText";
import { useStrings } from "../../../theme/strings";
import { useTheme } from "../../../theme/ThemeContext";
import { CONTAINER_PADDING } from "../../../theme";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function OrDivider({ label }: { label?: string }) {
  const theme = useTheme();
  const strings = useStrings();
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
      <StyledText mini textColor="gray600" style={{ marginHorizontal: 8 }}>
        {label ?? strings.or}
      </StyledText>
      <View style={[styles.line, { backgroundColor: theme.colors.border }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: CONTAINER_PADDING / 1.2,
  },
  line: { flex: 1, height: 1 },
});
