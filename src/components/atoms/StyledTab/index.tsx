import StyledText from "../StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import React from "react";
import { StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle, StyleProp } from "react-native";

export type TabItem<Key extends string> = {
  key: Key;
  label: string;
  badge?: number | null;
};

interface TabsProps<Key extends string> {
  /** which tab is currently active */
  activeKey: Key;
  /** list of tabs to render */
  tabs: TabItem<Key>[];
  /** called when user taps a tab */
  onTabChange: (key: Key) => void;
  /** container style override */
  style?: StyleProp<ViewStyle>;
  /** individual tab style override */
  tabStyle?: StyleProp<ViewStyle>;
  /** text style override */
  textStyle?: StyleProp<TextStyle>;
  /** active-tab style override */
  activeTabStyle?: StyleProp<ViewStyle>;
  /** active-text style override */
  activeTextStyle?: StyleProp<TextStyle>;
}

type TabButtonProps<Key extends string> = {
  tabKey: Key;
  label: string;
  badge?: number | null;
  isActive: boolean;
  onTabChange: (key: Key) => void;
  tabStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  activeTabStyle?: StyleProp<ViewStyle>;
  activeTextStyle?: StyleProp<TextStyle>;
};

function TabButton<Key extends string>({
  tabKey,
  label,
  badge,
  isActive,
  onTabChange,
  tabStyle,
  textStyle,
  activeTabStyle,
  activeTextStyle,
}: TabButtonProps<Key>) {
  const theme = useTheme();
  const handlePress = useSinglePress(() => onTabChange(tabKey));
  return (
    <TouchableOpacity
      style={[
        styles.tab,
        tabStyle,
        isActive && [
          styles.activeTab,
          { backgroundColor: theme.colors.primary },
          activeTabStyle,
        ],
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <StyledText
        style={[
          styles.tabText,
          { color: theme.colors.textMuted },
          textStyle,
          isActive && [
            styles.activeText,
            { color: theme.colors.textInverse },
            activeTextStyle,
          ],
        ]}
      >
        {label}
        {badge !== null && badge !== undefined && ` (${badge})`}
      </StyledText>
    </TouchableOpacity>
  );
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
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface },
        style,
      ]}
    >
      {tabs.map(({ key, label, badge }) => (
        <TabButton
          key={key}
          tabKey={key}
          label={label}
          badge={badge}
          isActive={key === activeKey}
          onTabChange={onTabChange}
          tabStyle={tabStyle}
          textStyle={textStyle}
          activeTabStyle={activeTabStyle}
          activeTextStyle={activeTextStyle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 100,
    padding: 4,
    marginBottom: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "center",
  },
  activeTab: {},
  tabText: {
    fontWeight: "700",
    textAlign: "center",
  },
  activeText: {
    fontWeight: "700",
  },
});
