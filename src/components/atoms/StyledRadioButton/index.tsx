import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../../theme/ThemeContext";

type RadioButtonProps = {
  isSelected: boolean;
  isDisabled?: boolean;
};

const StyledRadioButton: React.FC<RadioButtonProps> = ({ isSelected, isDisabled = false }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.radioButtonWrapper,
        { borderColor: theme.colors.primary },
        isDisabled && { borderColor: theme.colors.textMuted },
      ]}
    >
      <View
        style={[
          styles.radioButton,
          isSelected && !isDisabled && { backgroundColor: theme.colors.primary },
        ]}
      />
    </View>
  );
};

export default StyledRadioButton;

const styles = StyleSheet.create({
  radioButtonWrapper: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButton: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
});
