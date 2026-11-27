import EmptyListComponent from "../../../components/atoms/EmptyListComponent";
import StyledText from "../../../components/atoms/StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import dayjs from "dayjs";
import React from "react";
import { ActivityIndicator, SectionList, SectionListRenderItem, StyleSheet, View, ViewStyle, StyleProp } from "react-native";

export type DateSection<T> = {
  title: string;
  data: T[];
};

type DateGroupedListProps<T> = {
  items: T[];
  getDateKey: (item: T) => string | number | null | undefined;
  keyExtractor: (item: T, index: number) => string;
  renderItem: SectionListRenderItem<T, DateSection<T>>;
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
  dateFormat?: string;
  emptyText?: string;
};

function buildSections<T>(
  items: T[],
  getDateKey: (item: T) => string | number | null | undefined,
): DateSection<T>[] {
  const map = new Map<string, T[]>();

  items.forEach((item) => {
    const raw = getDateKey(item);
    const key = dayjs(raw ?? undefined).format("YYYY-MM-DD");
    const existing = map.get(key) ?? [];
    existing.push(item);
    map.set(key, existing);
  });

  return Array.from(map.entries()).map(([title, data]) => ({ title, data }));
}

function DateSectionHeader({
  section,
  dateFormat,
}: {
  section: { title: string; data: unknown[] };
  dateFormat: string;
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
        {dayjs(section.title).format(dateFormat)}
      </StyledText>
      <View style={[styles.countBadge, { backgroundColor: theme.colors.text }]}>
        <StyledText variant="bodyXXSmallBold" textColor="textInverse">
          {section.data.length}
        </StyledText>
      </View>
    </View>
  );
}

export default function DateGroupedList<T>({
  items,
  getDateKey,
  keyExtractor,
  renderItem,
  loading = false,
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerStyle,
  dateFormat = "dddd, DD-MMM-YYYY",
  emptyText,
}: DateGroupedListProps<T>) {
  const theme = useTheme();
  const sections = buildSections(items, getDateKey);

  if (loading) {
    return (
      <ActivityIndicator
        style={styles.loader}
        color={theme.colors.primary}
        size="large"
      />
    );
  }

  return (
    <SectionList<T, DateSection<T>>
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      renderSectionHeader={({ section }) => (
        <DateSectionHeader section={section} dateFormat={dateFormat} />
      )}
      stickySectionHeadersEnabled
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={() => {
        return (
          <>
            {loading ? <ActivityIndicator size={"small"} color={theme.colors.primary} /> : <EmptyListComponent message={emptyText} />}
          </>
        )
      }}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
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
