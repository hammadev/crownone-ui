import StyledIcon from "../../atoms/StyledIcon";
import StyledTextField from "../../atoms/StyledTextField";
import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { TextInputProps, TextStyle, ViewStyle, StyleProp } from "react-native";

type SearchBarProps = Omit<TextInputProps, "value" | "onChangeText"> & {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

export default function SearchBar({
  value,
  setValue,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  ...inputProps
}: SearchBarProps) {
  const handleChangeText = useCallback(
    (nextValue: string | SetStateAction<string>) => {
      const resolvedValue =
        typeof nextValue === "function" ? nextValue(value) : nextValue;
      setValue(resolvedValue);
      onChangeText?.(resolvedValue);
    },
    [onChangeText, setValue, value],
  );

  return (
    <StyledTextField
      text={value}
      setText={handleChangeText}
      placeholder={placeholder}
      containerStyle={containerStyle}
      inputStyle={inputStyle}
      icon={<StyledIcon name="magnify" size={22} />}
      {...inputProps}
    />
  );
}
