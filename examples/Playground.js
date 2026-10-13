/**
 * @crownone/ui — Interactive Playground
 *
 * Every component in the library on one screen. Toggle light/dark mode at the
 * top, interact with anything, and edit this file to experiment.
 *
 * Docs: https://github.com/hammadev/crownone-ui
 */
import React, { useEffect, useState } from 'react';
import { Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  AlphabetAvatar,
  BlurModalBackdrop,
  BottomActionsBar,
  FieldError,
  LoadingComponent,
  OrDivider,
  SearchBar,
  Skeleton,
  StatusCard,
  StyledButton,
  StyledCard,
  StyledCheckbox,
  StyledChip,
  StyledDropdown,
  StyledIcon,
  StyledImage,
  StyledRadioButton,
  StyledTabs,
  StyledText,
  StyledTextField,
  ThemeProvider,
  useTheme,
} from '@crownone/ui';

// The library expects Inter under these family names on iOS/Android.
// Loaded from a CDN so the playground needs no local font files.
const FONT_CDN = 'https://cdn.jsdelivr.net/npm/@expo-google-fonts/inter@0.4.1';
const INTER_FONTS = {
  inter_light: `${FONT_CDN}/300Light/Inter_300Light.ttf`,
  inter_regular: `${FONT_CDN}/400Regular/Inter_400Regular.ttf`,
  inter_medium: `${FONT_CDN}/500Medium/Inter_500Medium.ttf`,
  inter_semiBold: `${FONT_CDN}/600SemiBold/Inter_600SemiBold.ttf`,
  inter_bold: `${FONT_CDN}/700Bold/Inter_700Bold.ttf`,
};

// On web the library uses the CSS family "Inter" with font weights.
function useWebInterFont() {
  useEffect(() => {
    if (Platform.OS !== 'web' || document.getElementById('inter-font')) return;
    const link = document.createElement('link');
    link.id = 'inter-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    document.head.appendChild(link);
  }, []);
}

const PRODUCTS = [
  'Crown Solar Panel 550W',
  'Crown Inverter 6kW',
  'Lithium Battery 5kWh',
  'Brake Shoe Set',
  'Chain Sprocket Kit',
  'Spark Plug CR7',
];

const COUNTRIES = [
  { label: 'Pakistan', value: 'PK' },
  { label: 'United Arab Emirates', value: 'AE' },
  { label: 'United Kingdom', value: 'GB' },
  { label: 'Saudi Arabia (unavailable)', value: 'SA', disabled: true },
];

const CHIP_FILTERS = ['All', 'Pending', 'Approved', 'Rejected'];

export default function App() {
  const [fontsLoaded] = useFonts(INTER_FONTS);
  const [mode, setMode] = useState('light');
  useWebInterFont();

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider dark={mode === 'dark'}>
        <Playground mode={mode} setMode={setMode} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function Playground({ mode, setMode }) {
  const theme = useTheme();
  const [toast, setToast] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  // `id` re-triggers the timer when the same message is shown twice in a row.
  const notify = (message) => setToast({ message, id: Date.now() });

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, { backgroundColor: theme.colors.backgroundSecondary }]}>
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: barHeight + 24 }]}>
        <View style={styles.header}>
          <StyledText h4>@crownone/ui</StyledText>
          <StyledText small textColor="textMuted">
            Interactive playground — every component, live.
          </StyledText>
        </View>

        <StyledTabs
          activeKey={mode}
          onTabChange={setMode}
          tabs={[
            { key: 'light', label: '☀️  Light' },
            { key: 'dark', label: '🌙  Dark' },
          ]}
        />

        <TypographySection />
        <ButtonsSection notify={notify} />
        <ChipsSection />
        <FormSection notify={notify} />
        <SelectionSection />
        <SearchSection />
        <FeedbackSection notify={notify} />
        <LoadingSection />
        <MediaSection />
        <ModalSection onOpen={() => setModalVisible(true)} />
      </ScrollView>

      {toast ? (
        <View
          pointerEvents="none"
          style={[styles.toast, { bottom: barHeight + 12, backgroundColor: theme.colors.surface }]}
        >
          <StatusCard variant="success" message={toast.message} />
        </View>
      ) : null}

      <BottomActionsBar layout="row" gap={12} onHeight={setBarHeight}>
        <StyledButton
          title="Reject"
          variant="danger"
          onPress={() => notify('Rejected from the BottomActionsBar')}
          containerStyle={styles.flex}
        />
        <StyledButton
          title="Approve"
          variant="success"
          onPress={() => notify('Approved from the BottomActionsBar')}
          containerStyle={styles.flex}
        />
      </BottomActionsBar>

      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => {
          setModalVisible(false);
          notify('Transfer confirmed in the modal');
        }}
      />
    </SafeAreaView>
  );
}

/* ---------------------------------------------------------------------------
 * Sections
 * ------------------------------------------------------------------------- */

function Section({ title, subtitle, children }) {
  return (
    <StyledCard style={styles.section}>
      <StyledText variant="bodyLargeBold">{title}</StyledText>
      {subtitle ? (
        <StyledText small textColor="textMuted">
          {subtitle}
        </StyledText>
      ) : null}
      <View style={styles.sectionBody}>{children}</View>
    </StyledCard>
  );
}

function TypographySection() {
  return (
    <Section title="StyledText" subtitle="Headings, body sizes and theme colors">
      <StyledText h2>Heading 2</StyledText>
      <StyledText h4>Heading 4</StyledText>
      <StyledText h6>Heading 6</StyledText>
      <StyledText p>Paragraph text for regular content.</StyledText>
      <StyledText small textColor="textMuted">Small muted helper text.</StyledText>
      <View style={styles.wrap}>
        <StyledText primary bold>Primary</StyledText>
        <StyledText textColor="success" bold>Success</StyledText>
        <StyledText textColor="warning" bold>Warning</StyledText>
        <StyledText textColor="danger" bold>Danger</StyledText>
      </View>
    </Section>
  );
}

function ButtonsSection({ notify }) {
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      notify('Submit finished after 1.5s');
    }, 1500);
  };

  return (
    <Section title="StyledButton" subtitle="Tap any button — presses are throttled to one per second">
      <StyledButton title="Primary" onPress={() => notify('Primary pressed')} />
      <View style={styles.row}>
        <StyledButton title="Outline" variant="outline" onPress={() => notify('Outline pressed')} containerStyle={styles.flex} />
        <StyledButton title="Light" variant="light" onPress={() => notify('Light pressed')} containerStyle={styles.flex} />
      </View>
      <View style={styles.row}>
        <StyledButton title="Success" variant="success" onPress={() => notify('Success pressed')} containerStyle={styles.flex} />
        <StyledButton title="Danger" variant="danger" onPress={() => notify('Danger pressed')} containerStyle={styles.flex} />
        <StyledButton title="Info" variant="info" onPress={() => notify('Info pressed')} containerStyle={styles.flex} />
      </View>
      <StyledButton
        title={loading ? 'Submitting…' : 'Submit (shows loading)'}
        loading={loading}
        rounded
        rightIcon={<StyledIcon name="send" size={18} color="#FFFFFF" />}
        onPress={submit}
      />
      <StyledButton title="Disabled" disabled onPress={() => {}} />
    </Section>
  );
}

function ChipsSection() {
  const [filter, setFilter] = useState('All');

  return (
    <Section title="StyledChip" subtitle="Tap a filter chip to select it">
      <View style={styles.wrap}>
        {CHIP_FILTERS.map((label) => (
          <StyledChip key={label} label={label} selected={filter === label} onPress={() => setFilter(label)} />
        ))}
      </View>
      <View style={styles.wrap}>
        <StyledChip label="Done" variant="success" size="sm" />
        <StyledChip label="Pending" variant="warning" size="sm" />
        <StyledChip label="Failed" variant="danger" size="sm" />
        <StyledChip label="Info" variant="info" size="sm" />
        <StyledChip label="Primary" variant="primary" size="sm" />
        <StyledChip label="Outline" variant="outline" size="sm" />
      </View>
    </Section>
  );
}

function FormSection({ notify }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {};
  if (submitted && !name.trim()) errors.name = 'Name is required';
  if (submitted && !/^03\d{9}$/.test(mobile)) errors.mobile = 'Enter an 11-digit number starting with 03';
  if (submitted && password.length < 6) errors.password = 'Use at least 6 characters';
  const termsError = submitted && !accepted ? 'Please accept the terms' : '';
  const isValid = name.trim() && /^03\d{9}$/.test(mobile) && password.length >= 6 && accepted;

  const submit = () => {
    setSubmitted(true);
    if (isValid) notify(`Account created for ${name.trim()}`);
  };

  return (
    <Section title="Form inputs" subtitle="StyledTextField · StyledCheckbox · FieldError — submit empty to see validation">
      <StyledTextField
        label="Full name"
        placeholder="Enter your name"
        text={name}
        setText={setName}
        icon={<StyledIcon name="account-outline" size={20} />}
        formKey="name"
        errors={errors}
      />
      <StyledTextField
        label="Mobile number"
        placeholder="03XXXXXXXXX"
        keyboardType="phone-pad"
        maxLength={11}
        text={mobile}
        setText={setMobile}
        icon={<StyledIcon name="phone-outline" size={20} />}
        formKey="mobile"
        errors={errors}
      />
      <StyledTextField
        label="Password"
        placeholder="At least 6 characters"
        text={password}
        setText={setPassword}
        secureTextEntry
        withPasswordToggle
        formKey="password"
        errors={errors}
      />
      <StyledTextField label="Referral code" text="CROWN-2026" setText={() => {}} disabled />

      <Pressable style={styles.row} onPress={() => setAccepted((v) => !v)}>
        <StyledCheckbox value={accepted} onChange={setAccepted} />
        <StyledText p style={styles.flex}>I accept the terms and conditions</StyledText>
      </Pressable>
      <FieldError message={termsError} />

      <StyledButton title="Create account" onPress={submit} />
    </Section>
  );
}

function SelectionSection() {
  const [country, setCountry] = useState(null);
  const [wallet, setWallet] = useState('cash');
  const [tab, setTab] = useState('all');

  const wallets = [
    { key: 'cash', label: 'Cash wallet' },
    { key: 'points', label: 'Points wallet' },
  ];

  return (
    <Section title="Selection" subtitle="StyledDropdown · StyledRadioButton · StyledTabs">
      <StyledDropdown
        items={COUNTRIES}
        value={country}
        onChange={setCountry}
        placeholder="Select country"
        formKey="country"
        errors={{}}
      />

      {wallets.map((item) => (
        <Pressable key={item.key} style={styles.row} onPress={() => setWallet(item.key)}>
          <StyledRadioButton isSelected={wallet === item.key} />
          <StyledText p>{item.label}</StyledText>
        </Pressable>
      ))}
      <View style={styles.row}>
        <StyledRadioButton isSelected={false} isDisabled />
        <StyledText p textColor="textMuted">Bank transfer (disabled)</StyledText>
      </View>

      <StyledTabs
        activeKey={tab}
        onTabChange={setTab}
        tabs={[
          { key: 'all', label: 'All', badge: 12 },
          { key: 'active', label: 'Active', badge: 5 },
          { key: 'closed', label: 'Closed' },
        ]}
      />
      <StyledText small textColor="textMuted">
        Selected: {country ?? 'no country'} · {wallet} · {tab} tab
      </StyledText>
    </Section>
  );
}

function SearchSection() {
  const [query, setQuery] = useState('');
  const results = PRODUCTS.filter((p) => p.toLowerCase().includes(query.toLowerCase()));

  return (
    <Section title="SearchBar + AlphabetAvatar" subtitle="Type to filter the list">
      <SearchBar value={query} setValue={setQuery} placeholder="Search products..." />
      {results.map((product) => (
        <View key={product} style={styles.row}>
          <AlphabetAvatar name={product} size={36} />
          <StyledText p style={styles.flex}>{product}</StyledText>
        </View>
      ))}
      {results.length === 0 ? (
        <StyledText small textColor="textMuted">No products match “{query}”.</StyledText>
      ) : null}
    </Section>
  );
}

function FeedbackSection({ notify }) {
  return (
    <Section title="StatusCard" subtitle="The info card is clickable">
      <StatusCard variant="success" message="Payment completed" description="PKR 12,500 was added to your wallet." />
      <StatusCard variant="error" message="Transaction failed" description="Your card was declined." />
      <StatusCard variant="warning" message="Low balance" description="Top up to keep redeeming rewards." />
      <StatusCard
        variant="info"
        message="Verification pending"
        clickable
        hintText="Tap for details"
        onPress={() => notify('StatusCard pressed')}
      />
      <OrDivider />
      <StatusCard variant="warning" title="Offline" iconName="wifi-off" message="No internet connection." />
    </Section>
  );
}

function LoadingSection() {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const bg = theme.colors.backgroundTertiary;

  return (
    <Section title="Skeleton + LoadingComponent" subtitle="Toggle between the loading and loaded states">
      <View style={styles.row}>
        <StyledCheckbox value={loading} onChange={setLoading} />
        <StyledText p style={styles.flex}>Loading</StyledText>
        <LoadingComponent loading={loading} size="small" color={theme.colors.primary} />
      </View>
      {[0, 1, 2].map((i) =>
        loading ? (
          <View key={i} style={styles.row}>
            <Skeleton style={[styles.skeletonAvatar, { backgroundColor: bg }]} />
            <View style={styles.skeletonLines}>
              <Skeleton style={[styles.skeletonLineLg, { backgroundColor: bg }]} />
              <Skeleton style={[styles.skeletonLineSm, { backgroundColor: bg }]} />
            </View>
          </View>
        ) : (
          <View key={i} style={styles.row}>
            <AlphabetAvatar name={PRODUCTS[i]} size={44} />
            <View style={styles.flex}>
              <StyledText variant="bodyMediumBold">{PRODUCTS[i]}</StyledText>
              <StyledText small textColor="textMuted">In stock · ships in 2 days</StyledText>
            </View>
          </View>
        ),
      )}
    </Section>
  );
}

function MediaSection() {
  const theme = useTheme();
  const icons = ['home-outline', 'bell-outline', 'qrcode-scan', 'wallet-outline', 'cog-outline'];

  return (
    <Section title="StyledImage + StyledIcon" subtitle="Remote image with loader, and themed icons">
      <StyledImage
        source={{ uri: 'https://picsum.photos/id/1067/800/400' }}
        contentFit="cover"
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.wrap}>
        {icons.map((name) => (
          <View key={name} style={[styles.iconTile, { borderColor: theme.colors.borderSoft }]}>
            <StyledIcon name={name} size={24} />
          </View>
        ))}
      </View>
    </Section>
  );
}

function ModalSection({ onOpen }) {
  return (
    <Section title="BlurModalBackdrop" subtitle="Opens a modal over a blurred backdrop">
      <StyledButton title="Open modal" variant="outline" onPress={onOpen} />
    </Section>
  );
}

function ConfirmModal({ visible, onClose, onConfirm }) {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <BlurModalBackdrop onPress={onClose} contentStyle={styles.modalCenter}>
        <View style={[styles.modalCard, { backgroundColor: theme.colors.surface }]}>
          <StyledText h6>Confirm transfer</StyledText>
          <StyledText small textColor="textMuted">
            Send PKR 2,000 to Crown Wallet? Tap outside to dismiss.
          </StyledText>
          <View style={styles.row}>
            <StyledButton title="Cancel" variant="light" onPress={onClose} containerStyle={styles.flex} />
            <StyledButton title="Confirm" onPress={onConfirm} containerStyle={styles.flex} />
          </View>
        </View>
      </BlurModalBackdrop>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  header: {
    gap: 2,
    paddingTop: 8,
  },
  section: {
    gap: 4,
  },
  sectionBody: {
    gap: 12,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  flex: {
    flex: 1,
  },
  skeletonAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  skeletonLines: {
    flex: 1,
    gap: 8,
  },
  skeletonLineLg: {
    width: '80%',
    height: 14,
    borderRadius: 4,
  },
  skeletonLineSm: {
    width: '50%',
    height: 12,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 14,
  },
  iconTile: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    maxWidth: 528,
    alignSelf: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  modalCenter: {
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
});
