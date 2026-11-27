import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from "../../../theme/ThemeContext";
type RadioButtonProps = {
  isSelected: boolean; // Whether the radio button is selected
  isDisabled?: boolean; // Optional: Whether the radio button is disabled
};

const StyledRadioButton: React.FC<RadioButtonProps> = ({ isSelected, isDisabled = false }) => {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.radioButtonWrapper,
        { borderColor: theme.colors.primary },
        isDisabled && styles.radioButtonDisabledWrapper, // Apply disabled styles if applicable
        isDisabled && { borderColor: theme.colors.textMuted },
      ]}
    >
      <View
        style={[
          styles.radioButton,
          isSelected && !isDisabled && styles.radioButtonSelected, // Show selected style only if not disabled
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
  },
  radioButtonDisabledWrapper: {
    // Disabled color is injected from theme
  },
});
