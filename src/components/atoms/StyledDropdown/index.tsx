import React, { useMemo, useState } from "react";
import { ActionSheetIOS, FlatList, Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import { RADIUS } from "../../../theme";
import { useTheme } from "../../../theme/ThemeContext";
import FieldError from "../FieldError";
import StyledText from "../StyledText";

export type DropdownItem<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type Props<T> = {
  items: DropdownItem<T>[];
  value: T | null | undefined;
  onChange: (v: T) => void;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  inputStyle?: any;
  rightAdornment?: React.ReactNode;
  formKey: string;
  errors: any;
};

function isEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default function StyledDropdown<T>({
  items,
  value,
  onChange,
  placeholder = "Select…",
  disabled = false,
  errorText,
  inputStyle,
  errors,
  formKey,
}: Props<T>) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const selected = useMemo(() => items?.find((i) => isEqual(i?.value, value)), [items, value]);

  const onSelect = (item: DropdownItem<T>) => {
    if (item.disabled) return;
    onChange(item.value);
    setOpen(false);
  };

  const openIOS = () => {
    const options = items?.map((i) => (i.disabled ? `${i?.label} (disabled)` : i?.label));
    ActionSheetIOS.showActionSheetWithOptions(
      { options: [...options, "Cancel"], cancelButtonIndex: options.length },
      (index) => {
        if (index === options.length) return;
        const item = items[index];
        if (item && !item.disabled) onChange(item.value);
      },
    );
  };

  const inputBaseStyle = {
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 15,
    borderRadius: RADIUS,
    marginTop: 4,
    backgroundColor: theme.colors.surface,
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => { if (disabled) return; Platform.OS === "ios" ? openIOS() : setOpen(true); }}
        style={[
          inputBaseStyle,
          { borderColor: theme.colors.border, flexDirection: "row-reverse" },
          disabled && styles.disabled,
          errorText && { borderColor: theme.colors.danger },
          inputStyle,
        ]}
      >
        <StyledText numberOfLines={1} style={[{ flex: 1 }, !selected && { color: theme.colors.placeholder }]}>
          {selected ? selected?.label : placeholder}
        </StyledText>
      </Pressable>

      {!!errorText && <FieldError message={errorText} />}

      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={[styles.sheet, { backgroundColor: theme.colors.surface }]}>
            <FlatList
              data={items}
              keyExtractor={(_, i) => String(i)}
              renderItem={({ item }) => (
                <Pressable onPress={() => onSelect(item)} style={[styles.item, item.disabled && { opacity: 0.4 }]}>
                  <StyledText>{item.label}</StyledText>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>

      {errors?.[formKey]?.message && (
        <StyledText variant="bodyMediumRegular" style={{ color: theme.colors.danger, marginTop: 6 }}>
          {errors[formKey].message}
        </StyledText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  disabled: { opacity: 0.6 },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 20 },
  sheet: { borderRadius: 16, maxHeight: 300, padding: 10 },
  item: { paddingVertical: 14, paddingHorizontal: 12 },
});
