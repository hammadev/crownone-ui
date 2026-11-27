---
name: crownone-ui
description: Build React Native / Expo screens with the @crownone/ui component library. Use when writing or changing UI in an app that depends on @crownone/ui — screens, forms, lists, modals, buttons, cards, status messages, theming or dark mode — or when choosing which Crown One component to use.
---

# Building UI with @crownone/ui

Before writing UI code, read the version-matched reference:

`node_modules/@crownone/ui/llms-full.txt`

It lists every component's props, defaults and examples for the installed version. The type definitions in `node_modules/@crownone/ui/lib/typescript/` are the final word on prop types.

## Rules

- Import from the package root only: `import { StyledButton, useTheme } from "@crownone/ui"`.
- Use the library instead of raw React Native primitives: `StyledText` (not `Text`), `StyledImage` (not `Image`), `StyledButton` (not a hand-built `TouchableOpacity`), `StyledIcon` for icons.
- Never hardcode colors. Use `useTheme().colors`, and `theme.spacing` / `theme.radius` / `CONTAINER_PADDING` for spacing. Every screen must work in light and dark mode.
- Icon names are **MaterialCommunityIcons** (`"check-circle"`, `"alert-outline"`), for both `StyledIcon` and `StatusCard.iconName`.
- Size buttons in a layout with `containerStyle` (`{ flex: 1 }`), not `style`.
- Reject/Approve pairs: Reject `variant="danger"` on the left, Approve `variant="success"` on the right, in `<BottomActionsBar layout="row" gap={12}>`.
- `BottomActionsBar` is absolutely positioned by default: pad the content behind it (use `onHeight`). With `layout="column"`, add `align="stretch"`.
- Always pass `variant` to `StatusCard` (its default is `"error"`).
- Form fields take react-hook-form errors directly: `<StyledTextField text={field.value} setText={field.onChange} formKey="name" errors={errors} />`. `StyledDropdown` works the same way.
- Empty lists use `EmptyListComponent` (with `isLoading`), never a hand-built info `StatusCard`.
- Money uses `formatCashWallet(value)` / `formatPointsWallet(value)`. Never concatenate "PKR" or "PTS".
- Don't hardcode English in shared UI. Built-in component text is translated through `ThemeProvider`'s `strings` prop.
- Receipts and OTP inputs come from `@crownone/ui/receipt` and `@crownone/ui/otp`, which need extra native modules (see the reference).
- `StyledTabs` and `StatusCard` are named exports; the rest are default components re-exported by name. All are imported the same way from the root.

## Picking a component

| Need | Use |
|---|---|
| Any text | `StyledText` with a `variant` (`bodyMediumBold`, `bodySmallRegular`, …) |
| Primary / secondary action | `StyledButton` (`primary`, `outline`, `light`) |
| Actions pinned to the bottom | `BottomActionsBar` |
| Status label on a list item | `StyledChip` with `success` / `warning` / `danger` / `info`, `size="sm"` |
| Filter pills | `StyledChip` with `selected` + `onPress` |
| Error / warning / info / success message | `StatusCard` |
| Inline form error | `FieldError`, or `formKey` + `errors` on the field |
| Loading placeholder for a list | `Skeleton` |
| Spinner | `LoadingComponent` |
| Segmented switch (e.g. Received / Sent) | `StyledTabs` |
| Modal background | `BlurModalBackdrop` inside a transparent `Modal` |
| Person / shop initial | `AlphabetAvatar` |
| Nothing to show in a list | `EmptyListComponent` |
| Balance / total tiles | `SummaryValueCard` |
| List grouped by day | `DateGroupedList` |
| Contacts / shops A–Z | `AlphabetGroupedList` |
| Shareable PNG receipt | `ShareableReceipt` + `useShareReceipt` from `@crownone/ui/receipt` |
| OTP code entry | `OtpBoxInput` from `@crownone/ui/otp` |
| Your own `Pressable` | wrap its handler with `useSinglePress` |

## Before finishing

- No raw `Text`, `Image`, hardcoded hex colors or hand-concatenated currency in the code you wrote.
- Check the screen in dark mode.
- Run the project's type check; the library's props are strictly typed.
