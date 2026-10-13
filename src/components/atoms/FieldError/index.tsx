import React from "react";
import { useTheme } from "../../../theme/ThemeContext";
import StyledText from "../StyledText";

const FieldError = ({ message }: { message?: string }) => {
  const theme = useTheme();
  return message ? (
    <StyledText mini textColor={theme.colors.danger} style={{ marginTop: 1 }}>
      {message}
    </StyledText>
  ) : null;
};

export default FieldError;
