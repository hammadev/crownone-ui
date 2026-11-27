import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { useStrings } from "../../../theme/strings";
import { StatusCard } from "../StatusCard";

interface EmptyListComponentProps {
  /** Text to show. Defaults to the "No record found" string from ThemeProvider `strings`. */
  message?: string;
  /** Renders nothing while true, so the empty message doesn't flash during a fetch. */
  isLoading?: boolean;
  /** No built-in margin: add horizontal margin when the parent has no padding. */
  style?: StyleProp<ViewStyle>;
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({ message, isLoading = false, style }) => {
  const strings = useStrings();
  if (isLoading) return null;

  return <StatusCard variant="info" message={message ?? strings.noRecordFound} style={style} />;
};

export default EmptyListComponent;
