import { useTheme } from "../../../theme/ThemeContext";
import { useSinglePress } from "../../../hooks/useSinglePress";
import { RADIUS } from "../../../theme";
import { useStrings } from "../../../theme/strings";
import { FormErrors, getFieldErrorMessage } from "../../../utils/formErrors";
import React, { useMemo, useState } from "react";
import { ActionSheetIOS, FlatList, Modal, Platform, Pressable, StyleSheet, View, StyleProp, ViewStyle } from "react-native";
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
  inputStyle?: StyleProp<ViewStyle>;
  rightAdornment?: React.ReactNode;
  label?: string;
  /** Key of this field in `errors`. */
  formKey?: string;
  /** react-hook-form `formState.errors`, or `{ [formKey]: message }`. */
  errors?: FormErrors;
};

type DropdownItemButtonProps<T> = {
  item: DropdownItem<T>;
  onSelect: (item: DropdownItem<T>) => void;
};

function DropdownItemButton<T>({ item, onSelect }: DropdownItemButtonProps<T>) {
  const theme = useTheme();
  const handlePress = useSinglePress(() => onSelect(item));
  return (
    <Pressable
      onPress={handlePress}
      style={[styles.item, item.disabled && { opacity: 0.4 }]}
    >
      <StyledText>{item.label}</StyledText>
    </Pressable>
  );
}

export default function StyledDropdown<T>({
  items,
  value,
  onChange,
  placeholder,
  disabled = false,
  errorText,
  inputStyle,
  rightAdornment,
  label,
  errors,
  formKey,
}: Props<T>) {
  const theme = useTheme();
  const strings = useStrings();
  const formError = getFieldErrorMessage(errors, formKey);
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => items?.find((i) => isEqual(i?.value, value)),
    [items, value],
  );

  const onSelect = (item: DropdownItem<T>) => {
    if (item.disabled) return;
    onChange(item.value);
    setOpen(false);
  };

  const guardedOpen = useSinglePress(() => {
    if (disabled) return;
    if (Platform.OS === "ios") {
      openIOS();
      return;
    }
    setOpen(true);
  });

  const guardedClose = useSinglePress(() => setOpen(false));

  const openIOS = () => {
    const options = items?.map((i) =>
      i.disabled ? `${i?.label} (disabled)` : i?.label,
    );

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, strings.cancel],
        cancelButtonIndex: options.length,
      },
      (index) => {
        if (index === options.length) return;
        const item = items[index];
        if (item && !item.disabled) onChange(item.value);
      },
    );
  };

  return (
    <View style={styles.wrapper}>
      {Boolean(label) && (
        <StyledText variant="bodyXSmallBold">{label}</StyledText>
      )}
      <Pressable
        onPress={guardedOpen}
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
            flexDirection: "row-reverse", // 🔥 RTL FIX HERE
          },
          disabled && styles.disabled,
          errorText && { borderColor: theme.colors.danger },
          inputStyle,
        ]}
      >
        <StyledText
          numberOfLines={1}
          style={[
            { flex: 1 }, // 🔥 RTL FIX
            !selected && { color: theme.colors.placeholder },
          ]}
        >
          {selected ? selected?.label : (placeholder ?? strings.selectPlaceholder)}
        </StyledText>
      </Pressable>

      {!!errorText && <FieldError message={errorText} />}

      {/* ANDROID MODAL */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={styles.backdrop} onPress={guardedClose}>
          <View
            style={[
              styles.sheet,
              {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <FlatList
              data={items}
              keyExtractor={(_, i) => String(i)}
              renderItem={({ item }) => (
                <DropdownItemButton item={item} onSelect={onSelect} />
              )}
            />
          </View>
        </Pressable>
      </Modal>
      {!!formError && (
        <StyledText
          variant="bodyMediumRegular"
          style={{ color: theme.colors.danger, marginTop: 6 }}
        >
          {formError}
        </StyledText>
      )}
    </View>
  );
}

function isEqual(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 15,
    borderRadius: RADIUS,
    marginTop: 4,
  },
  wrapper: { width: "100%" },
  disabled: { opacity: 0.6 },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  sheet: {
    borderRadius: 16,
    maxHeight: 300,
    padding: 10,
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
});
