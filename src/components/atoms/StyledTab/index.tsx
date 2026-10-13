import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";
import { RADIUS } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

export type TabItem<Key extends string> = {
  key: Key;
  label: string;
  badge?: number | null;
};

interface TabsProps<Key extends string> {
  activeKey: Key;
  tabs: TabItem<Key>[];
  onTabChange: (key: Key) => void;
  style?: ViewStyle;
  tabStyle?: ViewStyle;
  textStyle?: TextStyle;
  activeTabStyle?: ViewStyle;
  activeTextStyle?: TextStyle;
}

export function StyledTabs<Key extends string>({
  activeKey,
  tabs,
  onTabChange,
  style,
  tabStyle,
  textStyle,
  activeTabStyle,
  activeTextStyle,
}: TabsProps<Key>) {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }, style]}>
      {tabs.map(({ key, label, badge }) => {
        const isActive = key === activeKey;
        return (
          <TouchableOpacity
            key={key}
            style={[
              styles.tab,
              tabStyle,
              isActive && [styles.activeTab, { backgroundColor: theme.colors.infoSoft }, activeTabStyle],
            ]}
            onPress={() => onTabChange(key)}
            activeOpacity={0.7}
          >
            <StyledText
              style={[
                styles.tabText,
                { color: theme.colors.textMuted },
                textStyle,
                isActive && [styles.activeText, { color: theme.colors.text }, activeTextStyle],
              ]}
            >
              {label}
              {badge !== null && badge !== undefined && ` (${badge})`}
            </StyledText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", borderRadius: RADIUS, padding: 4, marginBottom: 5 },
  tab: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 6, justifyContent: "center" },
  activeTab: {},
  tabText: { fontWeight: "500" },
  activeText: { fontWeight: "600" },
});
