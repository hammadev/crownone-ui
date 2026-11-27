const fmt = new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 });

const toNumber = (value?: number | string | null): number => {
  const n = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isNaN(n) ? 0 : n;
};

export const formatCashWallet = (value?: number | string | null): string =>
  `PKR ${fmt.format(toNumber(value))}`;

export const formatPointsWallet = (value?: number | string | null): string =>
  `${fmt.format(toNumber(value))} PTS`;
