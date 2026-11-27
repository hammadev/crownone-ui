import EmptyListComponent from "../../../components/atoms/EmptyListComponent";
import StyledText from "../../../components/atoms/StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import React, { useMemo } from "react";
import { ActivityIndicator, SectionList, SectionListRenderItem, StyleSheet, View, ViewStyle, StyleProp } from "react-native";

const compareAlpha = (a: string, b: string): number => {
  const la = a.toLowerCase();
  const lb = b.toLowerCase();
  if (la < lb) return -1;
  if (la > lb) return 1;
  return 0;
};

export type AlphabetSection<T> = {
  title: string;
  data: T[];
};

type AlphabetGroupedListProps<T> = {
  items: T[];
  getNameKey: (item: T) => string | null | undefined;
  keyExtractor: (item: T, index: number) => string;
  renderItem: SectionListRenderItem<T, AlphabetSection<T>>;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  ListHeaderComponent?:
    | React.ComponentType<unknown>
    | React.ReactElement
    | null;
  ListFooterComponent?:
    | React.ComponentType<unknown>
    | React.ReactElement
    | null;
  contentContainerStyle?: StyleProp<ViewStyle>;
  emptyText?: string;
};

function buildSections<T>(
  items: T[],
  getNameKey: (item: T) => string | null | undefined,
): AlphabetSection<T>[] {
  const map = new Map<string, T[]>();

  items.forEach((item) => {
    const letter = getNameKey(item)?.[0]?.toUpperCase() ?? "#";
    const existing = map.get(letter) ?? [];
    existing.push(item);
    map.set(letter, existing);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => compareAlpha(a, b))
    .map(([title, data]) => ({
      title,
      data: [...data].sort((a, b) =>
        compareAlpha(getNameKey(a) ?? "", getNameKey(b) ?? ""),
      ),
    }));
}

function AlphabetSectionHeader({
  section,
}: {
  section: { title: string; data: unknown[] };
}) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.sectionHeader,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StyledText variant="bodyXSmallBold" textColor="text">
        {section.title}
      </StyledText>
      <View style={[styles.countBadge, { backgroundColor: theme.colors.text }]}>
        <StyledText variant="bodyXXSmallBold" textColor="textInverse">
          {section.data.length}
        </StyledText>
      </View>
    </View>
  );
}

export default function AlphabetGroupedList<T>({
  items,
  getNameKey,
  keyExtractor,
  renderItem,
  loading = false,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  emptyText,
}: AlphabetGroupedListProps<T>) {
  const theme = useTheme();
  const sections = useMemo(
    () => buildSections(items, getNameKey),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  }

  return (
    <SectionList<T, AlphabetSection<T>>
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={({ section }) => (
        <AlphabetSectionHeader section={section} />
      )}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={
        <EmptyListComponent message={emptyText} />
      }
    />
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 32,
  },
  list: {
    gap: 10,
    paddingBottom: 110,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  countBadge: {
    minHeight: 22,
    minWidth: 22,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
});
