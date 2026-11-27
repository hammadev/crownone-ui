import StyledText from "../../../components/atoms/StyledText";
import { useTheme } from "../../../theme/ThemeContext";
import { OTPInput, OTPInputRef } from "input-otp-native";
import { forwardRef } from "react";
import { StyleSheet, View } from "react-native";

interface OtpBoxInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
}

// input-otp-native's internal state only takes `defaultValue` on mount — the
// `value` prop does not drive re-renders, so programmatic updates (e.g. SMS
// autofill) must go through this forwarded ref's `setValue`, not the `value` prop.
const OtpBoxInput = forwardRef<OTPInputRef, OtpBoxInputProps>(
  ({ value, onChange, maxLength = 6 }, ref) => {
    const { colors } = useTheme();

    return (
      <OTPInput
        ref={ref}
        maxLength={maxLength}
        value={value}
        defaultValue={value}
        // Default `true` wipes a prefilled/autofilled code on every tap.
        clearTextOnFocus={false}
        onChange={onChange}
        render={({ slots }) => (
          <View style={styles.row}>
            {slots.map((slot, index) => (
              <View
                key={index}
                style={[
                  styles.slot,
                  {
                    borderColor: slot.isActive
                      ? colors.primary
                      : colors.borderSoft,
                    backgroundColor: slot.isActive
                      ? colors.primarySoft
                      : colors.surface,
                  },
                ]}
              >
                <StyledText variant="heading3Bold" textColor="text">
                  {slot.char ?? ""}
                </StyledText>
              </View>
            ))}
          </View>
        )}
      />
    );
  },
);

OtpBoxInput.displayName = "OtpBoxInput";

export default OtpBoxInput;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  slot: {
    flex: 1,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 12,
  },
});
