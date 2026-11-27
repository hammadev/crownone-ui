# Working on @crownone/ui

This guide is for anyone changing the library itself. To *use* the library in an app, read [`llms-full.txt`](./llms-full.txt).

## Project

- React Native / Expo component library, built with `react-native-builder-bob` into `lib/` (CommonJS, ES modules, TypeScript definitions).
- Source is in `src/`. The public API is exactly what the entry points export: `src/index.ts`, plus `src/receipt.ts` and `src/otp.ts`.
- Runtime libraries (Expo modules, Reanimated, vector icons, …) are **peer dependencies**. Do not add them to `dependencies`, and do not add a new peer dependency without a clear need: every app has to install it.
- A component that needs a native module most apps don't use goes in an **optional entry point** (`src/<name>.ts`, added to `exports` in `package.json`), with the module as an optional peer (`peerDependenciesMeta`) and a dev dependency. Never import it from `src/index.ts`.
- Small pure-JS libraries (like `dayjs`) can be regular `dependencies`.

## Commands

```bash
npm install
npm run typecheck      # tsc --noEmit
npm run build          # builds lib/
npm run check:ai-docs  # every public export is documented in llms-full.txt
npm pack --dry-run     # shows exactly what would be published
```

There is no test suite. Check visual changes in the Expo Snack playground (`examples/Playground.js`) or in an app linked to a packed tarball (see the README's Contributing section).

## Structure

```
src/
  index.ts                         main entry point (@crownone/ui)
  receipt.ts                       optional entry point (@crownone/ui/receipt)
  otp.ts                           optional entry point (@crownone/ui/otp)
  theme/                           colors, fonts, light/dark themes, ThemeProvider, UI strings, layout constants
  hooks/                           useSinglePress, useShareReceipt
  utils/                           wallet formatters, form error helper
  components/atoms/<Name>/index.tsx
  components/molecules/<Name>/index.tsx
  components/organisms/<Name>/index.tsx
```

- One component per folder, in `index.tsx`. Web-only implementations go in `index.web.tsx` next to it (see `StyledImage`).
- Atoms have no business logic. Molecules compose atoms.

## Conventions

- Use **relative imports** inside `src/` (`../../../theme/ThemeContext`). There is no path alias.
- Read colors from `useTheme()` and never hardcode them. Every component must work with `lightTheme`, `darkTheme` and custom themes.
- Use `StyledText` for text inside components, so typography and colors stay consistent.
- Never hardcode user-facing text. Add it to `UIStrings` in `src/theme/strings.ts` with an English default, and read it with `useStrings()`. Apps translate it through `ThemeProvider`'s `strings` prop.
- Wrap press handlers with `useSinglePress` so double-taps don't fire twice.
- Generate a `testID` for interactive components where the app's end-to-end tests need one (see `StyledButton`).
- Don't import `i18next` or anything app-specific. Type-checking inside the app folder can hide this, because modules resolve from the app's `node_modules`; CI installs the package on its own and will fail.
- Use `ABSOLUTE_FILL` from `src/theme` instead of `StyleSheet.absoluteFillObject`, which was removed in React Native 0.86. Keep components working on every React Native version the peer range allows (`>= 0.73`).
- Styles go in `StyleSheet.create()` at the bottom of the file.
- Type props with an explicit `type` or `interface`, and export the types that apps need from `src/index.ts`.
- Don't make breaking prop changes in a patch or minor release. Deprecate first.

## Adding or changing a public component or prop

Update all of these in the same change:

1. `src/index.ts` (or the optional entry point): export the component and any public types.
2. `README.md`: the component's section, example and props table, plus the table of contents.
3. `llms-full.txt`: the component's entry (props, defaults, example). `npm run check:ai-docs` fails if a public export is missing.
4. `skills/crownone-ui/SKILL.md`: only if a new rule or a new "picking a component" row is needed.
5. `examples/Playground.js`: a playground section, if it is a new component.
6. `docs/images/`: light and dark previews, if it is a new component.

## Releasing

Publishing runs in GitHub Actions when a GitHub release is published (`.github/workflows/publish.yml`). It type-checks, checks the AI docs, builds and publishes with provenance.

```bash
npm version patch   # or minor / major — bumps package.json, commits, tags vX.Y.Z
git push --follow-tags
```

Then create a GitHub release from the new tag. The workflow fails if the tag and `package.json` version differ.

## Commit messages

Use short conventional messages (`fix: …`, `feat: …`, `docs: …`, `ci: …`). Do not add AI co-author or "generated with" lines.
