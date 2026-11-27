import StyledText from "../../../components/atoms/StyledText";
import { Ionicons } from "@expo/vector-icons";
import { Image, type ImageSource } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { forwardRef, Fragment } from "react";
import { StyleSheet, View } from "react-native";
import ViewShot from "react-native-view-shot";

// Fixed palette on purpose: the receipt is shared as an image and must look
// the same regardless of the sender's light/dark theme.
const COLORS = {
  gradientTop: "#FF8C00",
  gradientBottom: "#FF4F00",
  text: "#3A3A3C",
  muted: "#8A8A8E",
  line: "#E1E1E4",
  avatar: "#EEEEEF",
  card: "#FFFFFF",
  canvas: "#EDEDF0",
  white: "#FFFFFF",
  badge: "rgba(255, 255, 255, 0.22)",
};

export interface ReceiptParty {
  name: string;
  mobile: string;
}

export interface ReceiptDetailRow {
  label: string;
  value: string;
  /** Shown before the label, like the "#" on the ID row. */
  icon?: keyof typeof Ionicons.glyphMap;
}

export interface ShareableReceiptData {
  title: string;
  /** e.g. "01:45 PM • 13 Jul, 2026" */
  dateText: string;
  /** Small pill under the date, e.g. "REQUEST". */
  badge?: string;
  idLabel: string;
  idValue: string;
  fromLabel: string;
  from: ReceiptParty;
  toLabel: string;
  to: ReceiptParty;
  /** Extra rows rendered between the ID row and the "to" party. */
  details?: ReceiptDetailRow[];
  amountLabel: string;
  amountText: string;
  disclaimer: string;
}

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("") || "-";

function PartyRow({
  label,
  party,
  last = false,
}: {
  label: string;
  party: ReceiptParty;
  last?: boolean;
}) {
  return (
    <View style={[styles.section, last && styles.sectionLast]}>
      <StyledText variant="bodyXSmallBold" style={styles.partyLabel}>
        {label}
      </StyledText>
      <View style={styles.partyRow}>
        <View style={styles.avatar}>
          <StyledText variant="bodyMediumBold" style={styles.avatarText}>
            {getInitials(party.name)}
          </StyledText>
        </View>
        <View style={styles.partyInfo}>
          <StyledText variant="bodySmallBold" style={styles.partyName}>
            {party.name}
          </StyledText>
          <StyledText variant="bodyXSmallRegular" style={styles.partyMobile}>
            {party.mobile}
          </StyledText>
        </View>
      </View>
    </View>
  );
}

export interface ShareableReceiptProps {
  data: ShareableReceiptData;
  /** Logo shown in the gradient header. Pass a white/transparent logo, e.g. require("./assets/logo.png"). */
  logo?: ImageSource | number;
}

const ShareableReceipt = forwardRef<ViewShot, ShareableReceiptProps>(
  ({ data, logo }, ref) => (
    <ViewShot ref={ref} options={{ format: "png", quality: 1 }}>
      <View style={styles.canvas} collapsable={false}>
        <View style={styles.cardShadow}>
          <View style={styles.card}>
            <LinearGradient
              colors={[COLORS.gradientTop, COLORS.gradientBottom]}
              style={styles.header}
            >
              {logo != null && (
                <Image
                  source={logo}
                  style={styles.headerLogo}
                  contentFit="contain"
                />
              )}
              <View style={styles.headerText}>
                <StyledText variant="bodySmallBold" style={styles.headerTitle}>
                  {data.title}
                </StyledText>
                <StyledText
                  variant="bodyXSmallRegular"
                  style={styles.headerDate}
                >
                  {data.dateText}
                </StyledText>
                {data.badge ? (
                  <View style={styles.badge}>
                    <StyledText
                      variant="bodyXXSmallRegular"
                      style={styles.badgeText}
                    >
                      {data.badge}
                    </StyledText>
                  </View>
                ) : null}
              </View>
            </LinearGradient>

            <View style={styles.body}>
              <PartyRow label={data.fromLabel.toUpperCase()} party={data.from} />

              <View style={styles.divider} />

              <View style={styles.idRow}>
                <View style={styles.idLabel}>
                  <StyledText variant="bodyLargeRegular" style={styles.hash}>
                    #
                  </StyledText>
                  <StyledText
                    variant="bodySmallRegular"
                    style={styles.partyName}
                  >
                    {data.idLabel}
                  </StyledText>
                </View>
                <StyledText variant="bodySmallRegular" style={styles.partyName}>
                  {data.idValue}
                </StyledText>
              </View>

              {data.details?.map((row) => (
                <Fragment key={row.label}>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <View style={styles.idLabel}>
                      {row.icon ? (
                        <Ionicons
                          name={row.icon}
                          size={18}
                          color={COLORS.muted}
                        />
                      ) : null}
                      <StyledText
                        variant="bodySmallRegular"
                        style={row.icon ? styles.partyName : styles.detailLabel}
                      >
                        {row.label}
                      </StyledText>
                    </View>
                    <StyledText
                      variant="bodySmallBold"
                      style={styles.detailValue}
                    >
                      {row.value}
                    </StyledText>
                  </View>
                </Fragment>
              ))}

              <View style={styles.divider} />

              <PartyRow
                label={data.toLabel.toUpperCase()}
                party={data.to}
                last
              />
            </View>

            <View style={styles.tearWrap}>
              <View style={[styles.notch, styles.notchLeft]} />
              <View style={styles.tear} />
              <View style={[styles.notch, styles.notchRight]} />
            </View>

            <View style={styles.footer}>
              <StyledText variant="bodyXSmallBold" style={styles.partyLabel}>
                {data.amountLabel.toUpperCase()}
              </StyledText>
              <StyledText variant="heading4Bold" style={styles.amount}>
                {data.amountText}
              </StyledText>
            </View>
          </View>
        </View>

        <View style={styles.note}>
          <StyledText variant="bodyXSmallRegular" style={styles.noteText}>
            {data.disclaimer}
          </StyledText>
        </View>
      </View>
    </ViewShot>
  ),
);

ShareableReceipt.displayName = "ShareableReceipt";

export default ShareableReceipt;

const NOTCH = 22;
// One spacing value for every inner gap so top and bottom always match.
const GAP = 16;

const styles = StyleSheet.create({
  canvas: {
    width: 375,
    padding: 20,
    backgroundColor: COLORS.canvas,
  },
  // Shadow lives on a wrapper: the card clips its children (overflow hidden),
  // which would also clip its own iOS shadow.
  cardShadow: {
    borderRadius: 24,
    backgroundColor: COLORS.card,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: GAP,
    paddingVertical: GAP,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerText: {
    alignItems: "flex-end",
    gap: 2,
  },
  headerTitle: {
    color: COLORS.white,
  },
  headerDate: {
    color: COLORS.white,
    fontSize: 12,
  },
  badge: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: COLORS.badge,
  },
  badgeText: {
    color: COLORS.white,
    letterSpacing: 0.5,
  },
  body: {
    paddingHorizontal: GAP,
  },
  section: {
    paddingVertical: GAP,
    gap: 12,
  },
  // The dashed line sits NOTCH / 2 below the strip top, so trim that much here
  // and keep the space above and below it equal.
  sectionLast: {
    paddingBottom: GAP - NOTCH / 2,
  },
  partyLabel: {
    color: COLORS.muted,
    letterSpacing: 0.3,
    fontSize: 12,
  },
  partyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.avatar,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: COLORS.text,
  },
  partyInfo: {
    flex: 1,
    gap: 2,
  },
  partyName: {
    color: COLORS.text,
  },
  partyMobile: {
    color: COLORS.text,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.line,
  },
  idRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: GAP,
    gap: 12,
  },
  hash: {
    color: COLORS.muted,
    fontSize: 20,
    lineHeight: 24,
  },
  idLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingVertical: GAP,
    gap: 12,
  },
  detailLabel: {
    color: COLORS.muted,
  },
  detailValue: {
    color: COLORS.text,
    flexShrink: 1,
    textAlign: "right",
  },
  tearWrap: {
    height: NOTCH,
    justifyContent: "center",
  },
  tear: {
    marginHorizontal: NOTCH,
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.muted,
  },
  notch: {
    position: "absolute",
    width: NOTCH,
    height: NOTCH,
    borderRadius: NOTCH / 2,
    backgroundColor: COLORS.canvas,
  },
  notchLeft: {
    left: -NOTCH / 2,
  },
  notchRight: {
    right: -NOTCH / 2,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: GAP,
    paddingTop: GAP - NOTCH / 2,
    paddingBottom: GAP,
  },
  amount: {
    color: COLORS.text,
  },
  note: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 24,
    marginBottom: 0,
  },
  noteText: {
    color: COLORS.text,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
  },
});
