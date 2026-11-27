import { useTheme } from "../../../theme/ThemeContext";
import { FONT_FAMILIES } from "../../../theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import StyledText from "../StyledText";
import { FormErrors, getFieldErrorMessage } from "../../../utils/formErrors";


interface TextFieldProps extends TextInputProps {
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>> | ((value: string) => void);
  /** Key of this field in `errors`. */
  formKey?: string;
  icon?: React.JSX.Element;
  disabled?: boolean;
  returnKeyType?: TextInputProps["returnKeyType"];
  placeholder?: string;
  label?: string;
  marginVertical?: number;
  value?: string;
  isEdit?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  searchFunc?: (() => void) | null;
  /** react-hook-form `formState.errors`, or `{ [formKey]: message }`. */
  errors?: FormErrors;
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
  const shouldShowPasswordToggle =
    withPasswordToggle && restProps.secureTextEntry;

  const { testID: explicitTestID, ...inputProps } = restProps;
  const idSource = label || placeholder || formKey;
  const computedTestID =
    explicitTestID ??
    (idSource
      ? `input_${idSource.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/, "")}`
      : undefined);
  const fieldErrorMessage = getFieldErrorMessage(errors, formKey);

  const handleChangeText = (inputValue: string) => {
    setText?.(inputValue);
    restProps.onChangeText?.(inputValue);
  };

  return (
    <View style={[containerStyle, { marginVertical }, styles.container]}>
      {Boolean(label) && (
        <StyledText variant="bodyXSmallBold">{label}</StyledText>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          },
          disabled && [
            styles.disabledInput,
            { backgroundColor: theme.colors.surfaceSecondary },
          ],
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          testID={computedTestID}
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
          {...inputProps}
          secureTextEntry={
            shouldShowPasswordToggle
              ? !isPasswordVisible
              : inputProps.secureTextEntry
          }
        />
        {shouldShowPasswordToggle ? (
          <Pressable
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            hitSlop={10}
            style={styles.visibilityToggle}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={theme.colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>

      {Boolean(fieldErrorMessage) ? (
        <StyledText
          variant="bodyMediumRegular"
          style={{ color: theme.colors.danger }}
        >
          {fieldErrorMessage}
        </StyledText>
      ) : null}
    </View>
  );
}

export default StyledTextField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    // fixed line box: Android's Urdu fallback font otherwise inflates the field height
    lineHeight: 20,
    includeFontPadding: false,
    paddingVertical: 16,
    // minHeight: 50,
  },
  icon: {
    marginRight: 8,
  },
  visibilityToggle: {
    marginLeft: 8,
  },
  disabledInput: {},
});
