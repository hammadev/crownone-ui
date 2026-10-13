import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { FONT_FAMILIES } from "../../../theme/fonts";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

type FieldErrorValue = string | { message?: string };

interface TextFieldProps extends TextInputProps {
  text?: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  formKey?: string;
  icon?: React.JSX.Element;
  disabled?: boolean;
  returnKeyType?: TextInputProps["returnKeyType"];
  placeholder?: string;
  label?: string;
  marginVertical?: number;
  value?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  searchFunc?: (() => void) | null;
  errors?: Record<string, FieldErrorValue>;
  withPasswordToggle?: boolean;
}

function StyledTextField({
  text,
  setText,
  formKey = "",
  icon,
  disabled = false,
  returnKeyType = "default",
  placeholder = "",
  label,
  marginVertical = 0,
  value,
  style,
  inputStyle,
  searchFunc = null,
  containerStyle,
  errors = {},
  withPasswordToggle = false,
  ...restProps
}: TextFieldProps) {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const shouldShowPasswordToggle = withPasswordToggle && restProps.secureTextEntry;
  const fieldError = errors?.[formKey];
  const fieldErrorMessage = typeof fieldError === "string" ? fieldError : fieldError?.message || "";

  const handleChangeText = (inputValue: string) => {
    setText(inputValue);
    restProps.onChangeText?.(inputValue);
  };

  return (
    <View style={[containerStyle, { marginVertical }, styles.container]}>
      {Boolean(label) && <StyledText p>{label}</StyledText>}
      <View
        style={[
          styles.inputWrapper,
          { borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
          disabled && [styles.disabledInput, { backgroundColor: theme.colors.surfaceSecondary }],
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          value={value || text}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.placeholder}
          returnKeyType={returnKeyType}
          editable={!disabled}
          onSubmitEditing={searchFunc || undefined}
          style={[
            styles.input,
            Platform.OS === "web" && ({ outlineStyle: "none" } as unknown as TextStyle),
            { color: theme.colors.text, fontFamily: FONT_FAMILIES.regular },
            style,
            inputStyle,
          ]}
          {...restProps}
          secureTextEntry={shouldShowPasswordToggle ? !isPasswordVisible : restProps.secureTextEntry}
        />
        {shouldShowPasswordToggle ? (
          <Pressable onPress={() => setIsPasswordVisible((prev) => !prev)} hitSlop={10} style={styles.visibilityToggle}>
            <Ionicons name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} size={20} color={theme.colors.textMuted} />
          </Pressable>
        ) : null}
      </View>
      {Boolean(fieldErrorMessage) ? (
        <StyledText variant="bodyMediumRegular" style={{ color: theme.colors.danger }}>
          {fieldErrorMessage}
        </StyledText>
      ) : null}
    </View>
  );
}

export default StyledTextField;

const styles = StyleSheet.create({
  container: { width: "100%" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  input: { flex: 1, fontSize: 14, paddingVertical: 16 },
  icon: { marginRight: 8 },
  visibilityToggle: { marginLeft: 8 },
  disabledInput: {},
});
