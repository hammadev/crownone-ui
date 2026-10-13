# @crownone/ui

A shared React Native / Expo UI component library built for Crown One apps. Drop it into any Expo project and get a consistent set of themed atoms and molecules — no copy-pasting, no drift.

---

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Font Setup](#font-setup)
- [Theme Setup](#theme-setup)
- [Components](#components)
  - [StyledText](#styledtext)
  - [StyledImage](#styledimage)
  - [StyledButton](#styledbutton)
  - [StyledCard](#styledcard)
  - [StyledCheckbox](#styledcheckbox)
  - [StyledRadioButton](#styledradiobutton)
  - [StyledChip](#styledchip)
  - [StyledIcon](#styledicon)
  - [StyledTextField](#styledtextfield)
  - [StyledDropdown](#styleddropdown)
  - [StyledTabs](#styledtabs)
  - [StatusCard](#statuscard)
  - [AlphabetAvatar](#alphabetavatar)
  - [LoadingComponent](#loadingcomponent)
  - [FieldError](#fielderror)
  - [OrDivider](#ordivider)
  - [Skeleton](#skeleton)
  - [BottomActionsBar](#bottomactionsbar)
  - [BlurModalBackdrop](#blurmodalbackdrop)
  - [SearchBar](#searchbar)
- [Theming](#theming)
  - [Default Theme](#default-theme)
  - [Dark Mode](#dark-mode)
  - [Custom Theme](#custom-theme)
  - [useTheme Hook](#usetheme-hook)
- [Publishing a New Version](#publishing-a-new-version)
- [Development Workflow](#development-workflow)
- [Peer Dependencies](#peer-dependencies)

---

## Requirements

- React Native `>= 0.73`
- Expo SDK `>= 50`
- React `>= 18`

---

## Installation

```bash
npm install @crownone/ui
```

Install all required peer dependencies (skip any already in your project):

```bash
npx expo install \
  @expo/vector-icons \
  expo-blur \
  expo-image \
  expo-linear-gradient \
  react-native-reanimated \
  react-native-safe-area-context \
  react-native-size-matters
```

---

## Font Setup

Components use the **Inter** font family internally. You must load these fonts in your app before rendering any component from this library. The font family names must match exactly.

**In your root layout (e.g. `app/_layout.tsx`):**

```tsx
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    inter_light:    require('./assets/fonts/Inter-Light.ttf'),
    inter_regular:  require('./assets/fonts/Inter-Regular.ttf'),
    inter_medium:   require('./assets/fonts/Inter-Medium.ttf'),
    inter_semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    inter_bold:     require('./assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return <App />;
}
```

Download Inter fonts from [rsms.me/inter](https://rsms.me/inter/) and place the `.ttf` files in your `assets/fonts/` folder.

> **Web:** On web, the library falls back to the system `Inter` font automatically. No extra setup needed.

---

## Theme Setup

Wrap your app's root with `ThemeProvider`. All components read the theme through React Context — no provider means they fall back to the **light theme** by default.

```tsx
import { ThemeProvider } from '@crownone/ui';

export default function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}
```

For **dark mode**:

```tsx
<ThemeProvider dark={isDarkMode}>
  {/* your app */}
</ThemeProvider>
```

---

## Components

### StyledText

The base text component. Supports a full typographic scale, semantic shorthand props, and theme-aware color resolution.

```tsx
import { StyledText } from '@crownone/ui';

// Variants
<StyledText variant="heading1Bold">Big Heading</StyledText>
<StyledText variant="bodyMediumRegular">Body text</StyledText>

// Shorthand props
<StyledText h1>Heading 1</StyledText>
<StyledText h2>Heading 2</StyledText>
<StyledText h3>Heading 3</StyledText>
<StyledText h4>Heading 4</StyledText>
<StyledText h5>Heading 5</StyledText>
<StyledText h6>Heading 6</StyledText>
<StyledText p>Paragraph</StyledText>
<StyledText small>Small text</StyledText>
<StyledText mini>Mini text</StyledText>
<StyledText bold>Bold body</StyledText>

// Colors
<StyledText primary>Primary color text</StyledText>
<StyledText textColor="danger">Danger red text</StyledText>
<StyledText textColor="#FF6600">Custom hex</StyledText>
<StyledText textColor={theme.colors.success}>From theme</StyledText>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `TextVariant` | — | Full variant name e.g. `"heading1Bold"` |
| `h1`–`h6` | `boolean` | — | Heading shorthand |
| `p` | `boolean` | — | Body medium regular |
| `small` | `boolean` | — | Body small regular |
| `mini` | `boolean` | — | Body XSmall regular |
| `bold` | `boolean` | — | Upgrades current variant to bold |
| `primary` | `boolean` | — | Uses `theme.colors.primary` |
| `textColor` | `string` | `theme.colors.text` | Theme key, design color key, or any CSS color |

All standard `Text` props (`numberOfLines`, `onPress`, `style`, etc.) are also accepted.

---

### StyledImage

A performance-optimised image component backed by `expo-image` (native) and the standard `Image` (web), with a loading indicator and error fallback.

```tsx
import { StyledImage } from '@crownone/ui';

<StyledImage
  source={{ uri: 'https://example.com/photo.jpg' }}
  style={{ width: 120, height: 120, borderRadius: 60 }}
/>

// With placeholder on error
<StyledImage
  source={{ uri: user.avatarUrl }}
  placeholderSource={require('./assets/default-avatar.png')}
  style={{ width: 80, height: 80 }}
/>

// Custom loader color
<StyledImage
  source={{ uri: imageUrl }}
  loaderColor="#FF9500"
  style={{ width: '100%', height: 200 }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `ImageSource` | required | Image source URI or local require |
| `placeholderSource` | `ImageSource` | — | Shown when the main source errors |
| `loaderColor` | `string` | `theme.colors.primary` | ActivityIndicator color while loading |
| `style` | `ImageStyle` | — | Passed to the wrapping View |

All standard `expo-image` `ImageProps` are also accepted.

---

### StyledButton

A full-featured button with gradient primary style, press animation, loading state, icon slots, and a 1-second cooldown to prevent double-taps.

```tsx
import { StyledButton } from '@crownone/ui';

// Primary (gradient)
<StyledButton title="Submit" onPress={handleSubmit} />

// Variants
<StyledButton title="Outline" variant="outline" onPress={fn} />
<StyledButton title="Success" variant="success" onPress={fn} />
<StyledButton title="Danger"  variant="danger"  onPress={fn} />
<StyledButton title="Info"    variant="info"    onPress={fn} />
<StyledButton title="Light"   variant="light"   onPress={fn} />

// States
<StyledButton title="Loading..." loading={true} onPress={fn} />
<StyledButton title="Disabled"  disabled={true} onPress={fn} />

// With icons
<StyledButton
  title="Upload"
  leftIcon={<StyledIcon name="upload" size={18} color="#fff" />}
  onPress={fn}
/>

// Rounded pill shape
<StyledButton title="Pill Button" rounded onPress={fn} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | required | Button label |
| `variant` | `StyledButtonVariant` | `"primary"` | `primary` · `outline` · `success` · `danger` · `info` · `light` |
| `onPress` | `() => void` | — | Press handler (throttled 1s) |
| `loading` | `boolean` | `false` | Shows spinner, disables press |
| `disabled` | `boolean` | `false` | Muted style, disables press |
| `rounded` | `boolean` | `false` | Full pill border radius |
| `leftIcon` | `ReactNode` | — | Icon before label |
| `rightIcon` | `ReactNode` | — | Icon after label |
| `textColor` | `string` | variant default | Override label color |
| `containerStyle` | `ViewStyle` | — | Outer Animated.View style |

---

### StyledCard

A themed surface card. Renders as a plain `View` or `TouchableOpacity` depending on whether `onPress` is provided.

```tsx
import { StyledCard } from '@crownone/ui';

// Static card
<StyledCard>
  <StyledText h6>Card Title</StyledText>
  <StyledText p>Card content goes here.</StyledText>
</StyledCard>

// Pressable card
<StyledCard onPress={() => router.push('/detail')}>
  <StyledText h6>Tap Me</StyledText>
</StyledCard>

// Custom style
<StyledCard style={{ padding: 20, borderRadius: 12 }}>
  <StyledText>Custom padding</StyledText>
</StyledCard>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Card content |
| `onPress` | `(ele: any) => void` | — | Makes the card pressable |
| `style` | `ViewStyle` | — | Additional styles |

---

### StyledCheckbox

A controlled checkbox with theme-aware checked and unchecked states.

```tsx
import { StyledCheckbox } from '@crownone/ui';

const [checked, setChecked] = useState(false);

<StyledCheckbox
  value={checked}
  onChange={setChecked}
/>

// Disabled
<StyledCheckbox value={true} onChange={setChecked} disabled />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `boolean` | required | Current checked state |
| `onChange` | `(value: boolean) => void` | — | Called with the new state |
| `disabled` | `boolean` | `false` | Prevents interaction |

---

### StyledRadioButton

A simple radio button indicator. Manage selection state in the parent.

```tsx
import { StyledRadioButton } from '@crownone/ui';

const [selected, setSelected] = useState<'a' | 'b'>('a');

<Pressable onPress={() => setSelected('a')}>
  <StyledRadioButton isSelected={selected === 'a'} />
  <StyledText>Option A</StyledText>
</Pressable>

<Pressable onPress={() => setSelected('b')}>
  <StyledRadioButton isSelected={selected === 'b'} />
  <StyledText>Option B</StyledText>
</Pressable>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isSelected` | `boolean` | required | Whether this radio is active |
| `isDisabled` | `boolean` | `false` | Muted style, no interaction |

---

### StyledChip

A badge/tag component with multiple semantic variants and optional press behavior.

```tsx
import { StyledChip } from '@crownone/ui';

// Variants
<StyledChip label="Active"   variant="primary" />
<StyledChip label="Done"     variant="success" />
<StyledChip label="Pending"  variant="warning" />
<StyledChip label="Failed"   variant="danger"  />
<StyledChip label="Info"     variant="info"    />
<StyledChip label="Outline"  variant="outline" />
<StyledChip label="Default"  variant="default" />

// Sizes
<StyledChip label="Large" size="lg" />
<StyledChip label="Small" size="sm" />

// Selected state (overrides variant → selected style)
<StyledChip label="Selected" selected />

// Pressable
<StyledChip label="Filter" onPress={() => toggleFilter('active')} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | required | Chip text |
| `variant` | `StyledChipVariant` | `"default"` | `default` · `selected` · `primary` · `outline` · `success` · `warning` · `danger` · `info` · `light` |
| `selected` | `boolean` | — | Forces `selected` style |
| `size` | `"sm" \| "lg"` | `"lg"` | Controls padding |
| `onPress` | `() => void` | — | Makes chip pressable |

---

### StyledIcon

A wrapper around `MaterialCommunityIcons` that falls back to the theme's icon color.

```tsx
import { StyledIcon } from '@crownone/ui';

<StyledIcon name="home" size={24} />
<StyledIcon name="bell-outline" size={20} color="#FF9500" />
<StyledIcon name="chevron-right" size={16} />
```

Browse all available icon names at [materialdesignicons.com](https://materialdesignicons.com).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | MaterialCommunityIcons icon name |
| `size` | `number` | required | Icon size in dp |
| `color` | `string` | `theme.colors.icon` | Icon color |

---

### StyledTextField

A full-featured text input with label, icon slot, password toggle, and react-hook-form error support.

```tsx
import { StyledTextField } from '@crownone/ui';

const [email, setEmail] = useState('');

// Basic
<StyledTextField
  text={email}
  setText={setEmail}
  placeholder="Enter email"
  label="Email"
/>

// With icon
<StyledTextField
  text={search}
  setText={setSearch}
  icon={<StyledIcon name="magnify" size={20} />}
  placeholder="Search..."
/>

// Password field with toggle
<StyledTextField
  text={password}
  setText={setPassword}
  placeholder="Password"
  label="Password"
  secureTextEntry
  withPasswordToggle
/>

// With react-hook-form errors
<StyledTextField
  text={value}
  setText={setValue}
  placeholder="Username"
  formKey="username"
  errors={errors}  // errors object from useForm()
/>

// Disabled
<StyledTextField
  text={value}
  setText={setValue}
  placeholder="Read only"
  disabled
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | Controlled value |
| `setText` | `Dispatch<SetStateAction<string>>` | required | State setter |
| `label` | `string` | — | Label above the input |
| `placeholder` | `string` | `""` | Placeholder text |
| `icon` | `ReactElement` | — | Icon displayed on the left |
| `formKey` | `string` | `""` | Key to look up in `errors` |
| `errors` | `Record<string, any>` | `{}` | react-hook-form errors object |
| `withPasswordToggle` | `boolean` | `false` | Eye icon to show/hide password |
| `disabled` | `boolean` | `false` | Non-editable, muted background |
| `marginVertical` | `number` | `0` | Vertical spacing |

All standard `TextInputProps` are also accepted.

---

### StyledDropdown

A cross-platform dropdown — uses `ActionSheetIOS` on iOS and a `Modal` FlatList on Android.

```tsx
import { StyledDropdown } from '@crownone/ui';

const [country, setCountry] = useState<string | null>(null);

const countryOptions = [
  { label: 'Pakistan', value: 'PK' },
  { label: 'UAE',      value: 'AE' },
  { label: 'UK',       value: 'GB' },
];

<StyledDropdown
  items={countryOptions}
  value={country}
  onChange={setCountry}
  placeholder="Select country"
  formKey="country"
  errors={errors}
/>

// With react-hook-form Controller
<Controller
  control={control}
  name="country"
  render={({ field: { value, onChange } }) => (
    <StyledDropdown
      items={countryOptions}
      value={value}
      onChange={onChange}
      placeholder="Select country"
      formKey="country"
      errors={errors}
    />
  )}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `DropdownItem<T>[]` | required | `{ label, value, disabled? }` |
| `value` | `T \| null` | required | Selected value |
| `onChange` | `(v: T) => void` | required | Called on selection |
| `placeholder` | `string` | `"Select…"` | Placeholder when nothing selected |
| `formKey` | `string` | required | Key to look up in `errors` |
| `errors` | `any` | required | react-hook-form errors object |
| `disabled` | `boolean` | `false` | Prevents opening |
| `errorText` | `string` | — | Inline error below input |

---

### StyledTabs

A segmented tab bar for switching between views.

```tsx
import { StyledTabs } from '@crownone/ui';
import type { TabItem } from '@crownone/ui';

type TabKey = 'all' | 'active' | 'closed';

const tabs: TabItem<TabKey>[] = [
  { key: 'all',    label: 'All',    badge: 12 },
  { key: 'active', label: 'Active', badge: 5  },
  { key: 'closed', label: 'Closed'             },
];

const [activeTab, setActiveTab] = useState<TabKey>('all');

<StyledTabs
  tabs={tabs}
  activeKey={activeTab}
  onTabChange={setActiveTab}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | `TabItem<Key>[]` | required | `{ key, label, badge? }` |
| `activeKey` | `Key` | required | Currently active tab key |
| `onTabChange` | `(key: Key) => void` | required | Called on tab press |
| `style` | `ViewStyle` | — | Container style override |
| `tabStyle` | `ViewStyle` | — | Individual tab style |
| `activeTabStyle` | `ViewStyle` | — | Active tab style |
| `textStyle` | `TextStyle` | — | Tab label text style |
| `activeTextStyle` | `TextStyle` | — | Active tab label text style |

---

### StatusCard

An inline alert/status banner with icon, title, message, and description slots.

```tsx
import { StatusCard } from '@crownone/ui';

<StatusCard variant="success" message="Payment completed!" />
<StatusCard variant="error"   message="Transaction failed." />
<StatusCard variant="warning" message="Low balance." />
<StatusCard variant="info"    message="Verification pending." />

// With all slots
<StatusCard
  variant="error"
  title="Payment Failed"
  message="Your card was declined."
  description="Please check your card details and try again."
/>

// Clickable
<StatusCard
  variant="info"
  message="Tap to view your receipt."
  clickable
  hintText="Tap for details"
  onPress={() => router.push('/receipt')}
/>

// Custom icon
<StatusCard
  variant="warning"
  iconName="wifi-off"
  message="No internet connection."
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `StatusCardVariant` | `"error"` | `error` · `warning` · `info` · `success` |
| `title` | `string` | — | Bold uppercase label |
| `message` | `string` | — | Main message text |
| `description` | `string` | — | Smaller supplementary text |
| `iconName` | `string` | variant default | Override MaterialCommunityIcons name |
| `clickable` | `boolean` | `false` | Renders as `TouchableOpacity` |
| `onPress` | `(e) => void` | — | Press handler when `clickable` |
| `hintText` | `string` | `"Tap to check details."` | Small hint when `clickable` |

---

### AlphabetAvatar

Renders a circular avatar with the first letter of a name. Color is derived from the character automatically.

```tsx
import { AlphabetAvatar } from '@crownone/ui';

<AlphabetAvatar name="Hammad Anwar" />
<AlphabetAvatar name="Crown One" size={56} />
<AlphabetAvatar name="Admin" size={32} style={{ marginRight: 8 }} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Used for first letter and color |
| `size` | `number` | `44` | Diameter of the circle in dp |
| `style` | `ViewStyle` | — | Outer style |

---

### LoadingComponent

A simple wrapper around `ActivityIndicator` that only renders when `loading` is true.

```tsx
import { LoadingComponent } from '@crownone/ui';

<LoadingComponent loading={isFetching} size="small" />
<LoadingComponent loading={isSubmitting} size="large" color="#FF9500" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `loading` | `boolean` | `false` | Controls visibility |
| `size` | `"small" \| "large"` | required | Spinner size |
| `color` | `string` | `theme.colors.textInverse` | Spinner color |
| `style` | `ViewStyle` | — | Container style |

---

### FieldError

Displays a validation error message below a form field.

```tsx
import { FieldError } from '@crownone/ui';

<FieldError message={errors.email?.message} />

// Renders nothing when message is undefined/empty
<FieldError message={undefined} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | `string` | — | Error text; renders nothing if falsy |

---

### OrDivider

A horizontal divider with centered label — commonly used between login and social login sections.

```tsx
import { OrDivider } from '@crownone/ui';

<OrDivider />
<OrDivider label="OR CONTINUE WITH" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"OR"` | Center text |

---

### Skeleton

An animated pulsing placeholder for loading states.

```tsx
import { Skeleton } from '@crownone/ui';

// Wrap anything in a Skeleton to pulse it
<Skeleton style={{ width: 200, height: 20, borderRadius: 4, backgroundColor: '#E0E0E0' }} />
<Skeleton style={{ width: 120, height: 20, borderRadius: 4, backgroundColor: '#E0E0E0' }} />

// Slower pulse
<Skeleton duration={1500} style={{ width: '100%', height: 60, borderRadius: 8, backgroundColor: '#E0E0E0' }} />

// Composition example
function ProfileSkeleton() {
  return (
    <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
      <Skeleton style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#E0E0E0' }} />
      <View style={{ gap: 8 }}>
        <Skeleton style={{ width: 140, height: 16, borderRadius: 4, backgroundColor: '#E0E0E0' }} />
        <Skeleton style={{ width: 100, height: 12, borderRadius: 4, backgroundColor: '#E0E0E0' }} />
      </View>
    </View>
  );
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `style` | `ViewStyle` | — | Shape, size, and background of the skeleton |
| `duration` | `number` | `1000` | Pulse duration in ms |
| `children` | `ReactNode` | — | Optional inner content |

---

### BottomActionsBar

A sticky bottom bar with a blurred background, safe area support, and flexible layout.

```tsx
import { BottomActionsBar, StyledButton } from '@crownone/ui';

// Single button
<BottomActionsBar>
  <StyledButton title="Continue" onPress={handleContinue} style={{ flex: 1 }} />
</BottomActionsBar>

// Two buttons side by side
<BottomActionsBar>
  <StyledButton title="Cancel"  variant="light"   onPress={goBack}   containerStyle={{ flex: 1 }} />
  <StyledButton title="Confirm" variant="primary"  onPress={confirm}  containerStyle={{ flex: 1 }} />
</BottomActionsBar>

// Column layout
<BottomActionsBar layout="column">
  <StyledButton title="Primary Action"   onPress={fn} style={{ width: '100%' }} />
  <StyledButton title="Secondary Action" variant="light" onPress={fn} style={{ width: '100%' }} />
</BottomActionsBar>

// Non-sticky (inline in scroll content)
<BottomActionsBar sticky={false}>
  <StyledButton title="Submit" onPress={fn} style={{ flex: 1 }} />
</BottomActionsBar>

// Get height to pad ScrollView content
<BottomActionsBar onHeight={(h) => setBarHeight(h)}>
  <StyledButton title="Done" onPress={fn} style={{ flex: 1 }} />
</BottomActionsBar>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Action buttons or content |
| `layout` | `"row" \| "column"` | `"row"` | Flex direction |
| `gap` | `number` | `10` | Gap between children |
| `align` | `string` | `"center"` | `alignItems` value |
| `justify` | `string` | `"center"` | `justifyContent` value |
| `intensity` | `number` | `50` | BlurView blur intensity |
| `showTopEdge` | `boolean` | `true` | Thin border at the top |
| `sticky` | `boolean` | `true` | Absolute positioned at screen bottom |
| `respectSafeArea` | `boolean` | `true` | Adds bottom safe area inset |
| `horizontalPadding` | `number` | `16` | Horizontal padding |
| `verticalPadding` | `number` | `8` | Top padding |
| `onHeight` | `(h: number) => void` | — | Reports the bar height |

---

### BlurModalBackdrop

A full-screen blurred backdrop for modals, bottom sheets, or overlays.

```tsx
import { BlurModalBackdrop } from '@crownone/ui';
import { Modal } from 'react-native';

<Modal visible={visible} transparent animationType="fade">
  <BlurModalBackdrop onPress={() => setVisible(false)}>
    <View style={styles.modalContent}>
      <StyledText h6>Modal Title</StyledText>
      <StyledText p>Modal content here.</StyledText>
      <StyledButton title="Close" onPress={() => setVisible(false)} />
    </View>
  </BlurModalBackdrop>
</Modal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Modal content (not dismissable) |
| `onPress` | `() => void` | — | Called when the backdrop is tapped |
| `contentStyle` | `ViewStyle` | — | Style for the inner content wrapper |

---

### SearchBar

A ready-made search input built on `StyledTextField` with a magnify icon.

```tsx
import { SearchBar } from '@crownone/ui';

const [query, setQuery] = useState('');

<SearchBar
  value={query}
  setValue={setQuery}
  placeholder="Search transactions..."
/>

// With callback
<SearchBar
  value={query}
  setValue={setQuery}
  onChangeText={(text) => fetchResults(text)}
/>

// Custom styles
<SearchBar
  value={query}
  setValue={setQuery}
  containerStyle={{ marginBottom: 16 }}
  inputStyle={{ fontSize: 16 }}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Controlled value |
| `setValue` | `Dispatch<SetStateAction<string>>` | required | State setter |
| `onChangeText` | `(value: string) => void` | — | Optional callback on text change |
| `placeholder` | `string` | — | Placeholder text |
| `containerStyle` | `ViewStyle` | — | Outer container style |
| `inputStyle` | `TextStyle` | — | Text input style |

All `TextInputProps` are also accepted.

---

## Theming

### Default Theme

The library ships with `lightTheme` and `darkTheme`. If you don't provide a `ThemeProvider`, components use `lightTheme` automatically.

```ts
import { lightTheme, darkTheme } from '@crownone/ui';
```

The theme shape:

```ts
type AppTheme = {
  dark: boolean;
  colors: {
    primary, primaryPressed, primarySoft,
    secondary,
    background, backgroundSecondary, backgroundTertiary,
    surface, surfaceSecondary, card,
    border, borderSoft,
    text, textSecondary, textMuted, textInverse,
    icon, placeholder,
    success, successSoft,
    warning, warningSoft,
    danger, dangerSoft,
    info, infoSoft,
    overlay, shadow,
    tabIconDefault, tabIconSelected,
    statusBar,
  };
  spacing: { xs, sm, md, lg, xl, xxl };    // 4, 8, 12, 16, 24, 32
  radius:  { xs, sm, md, lg, xl, pill };   // 6, 10, 14, 18, 24, 999
};
```

### Dark Mode

```tsx
<ThemeProvider dark={colorScheme === 'dark'}>
  <App />
</ThemeProvider>
```

### Custom Theme

Pass any partial or full theme override:

```tsx
import { lightTheme, ThemeProvider } from '@crownone/ui';
import type { AppTheme } from '@crownone/ui';

const myTheme: AppTheme = {
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    primary: '#6200EE',         // purple brand color
    primaryPressed: '#3700B3',
    primarySoft: '#EDE7F6',
  },
};

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

### useTheme Hook

Access the current theme anywhere inside the provider tree:

```tsx
import { useTheme } from '@crownone/ui';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.surface, borderRadius: theme.radius.md }}>
      <StyledText textColor={theme.colors.primary}>Hello</StyledText>
    </View>
  );
}
```

---

## Publishing a New Version

All publishing is done from inside the `packages/crown-ui` directory.

**1. Update the version** in `package.json`:

```bash
# patch: 0.1.0 → 0.1.1  (bug fixes)
# minor: 0.1.0 → 0.2.0  (new components, backwards compatible)
# major: 0.1.0 → 1.0.0  (breaking changes)
npm version patch   # or minor / major
```

**2. Build:**

```bash
npm run build
```

**3. Login (first time only):**

```bash
npm login
```

**4. Publish:**

```bash
# With 2FA OTP code
npm publish --access public --otp=<6-digit-code>

# Or with an Automation token (no OTP needed)
npm publish --access public
```

---

## Development Workflow

When you add or update a component:

1. Edit source in `packages/crown-ui/src/`
2. Build: `cd packages/crown-ui && npm run build`
3. Bump version: `npm version patch`
4. Publish: `npm publish --access public --otp=<code>`

**To test locally before publishing** (in a consuming app):

```bash
# In packages/crown-ui
npm pack
# Produces @crownone-ui-0.x.x.tgz

# In consuming app
npm install /path/to/@crownone-ui-0.x.x.tgz
```

Or link it directly:

```bash
# In packages/crown-ui
npm link

# In consuming app
npm link @crownone/ui
```

---

## Peer Dependencies

| Package | Version | Why |
|---------|---------|-----|
| `react` | `>= 18` | Base |
| `react-native` | `>= 0.73` | Base |
| `@expo/vector-icons` | `>= 13` | `StyledIcon`, `StyledCheckbox`, `StyledTextField` |
| `expo-blur` | `>= 13` | `BottomActionsBar`, `BlurModalBackdrop` |
| `expo-image` | `>= 1` | `StyledImage` (native) |
| `expo-linear-gradient` | `>= 13` | `StyledButton` primary gradient |
| `react-native-reanimated` | `>= 3` | `Skeleton` |
| `react-native-safe-area-context` | `>= 4` | `BottomActionsBar` |
| `react-native-size-matters` | `>= 0.4` | `AlphabetAvatar` |

---

## License

MIT
