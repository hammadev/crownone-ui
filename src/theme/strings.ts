import { createContext, useContext } from "react";

/** User-facing text the components render by default. Pass translations through `ThemeProvider`'s `strings` prop. */
export type UIStrings = {
  /** StyledDropdown iOS action sheet cancel button. */
  cancel: string;
  /** StyledDropdown placeholder when none is passed. */
  selectPlaceholder: string;
  /** OrDivider label when none is passed. */
  or: string;
  /** StatusCard default titles per variant. */
  errorTitle: string;
  warningTitle: string;
  infoTitle: string;
  successTitle: string;
  /** StatusCard hint on clickable cards when `hintText` is not passed. */
  tapForDetails: string;
  /** EmptyListComponent / grouped lists message when none is passed. */
  noRecordFound: string;
  /** useShareReceipt share sheet title (Android). */
  shareReceipt: string;
};

export const defaultStrings: UIStrings = {
  cancel: "Cancel",
  selectPlaceholder: "Select…",
  or: "OR",
  errorTitle: "Error",
  warningTitle: "Warning",
  infoTitle: "Info",
  successTitle: "Success",
  tapForDetails: "Tap to check details.",
  noRecordFound: "No record found",
  shareReceipt: "Share Receipt",
};

export const StringsContext = createContext<UIStrings>(defaultStrings);

export function useStrings(): UIStrings {
  return useContext(StringsContext);
}
