/**
 * Form errors as passed to StyledTextField / StyledDropdown: react-hook-form's `formState.errors`,
 * or a plain map of field name to message.
 */
export type FormErrors = Record<string, unknown>;

/** Reads the message for `key` from a react-hook-form errors object or a plain `{ key: message }` map. */
export function getFieldErrorMessage(errors: FormErrors | undefined, key: string | undefined): string {
  if (!errors || !key) return "";
  const value = errors[key];
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "message" in value) {
    const message = (value as { message?: unknown }).message;
    return typeof message === "string" ? message : "";
  }
  return "";
}
