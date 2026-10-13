const yellows = {
  yellow50: "rgba(255, 250, 229, 1)",
  yellow100: "rgba(255, 240, 183, 1)",
  yellow200: "rgba(255, 231, 138, 1)",
  yellow300: "rgba(255, 222, 92, 1)",
  yellow400: "rgba(255, 213, 46, 1)",
  yellow500: "rgba(255, 204, 0, 1)",
  yellow600: "rgba(214, 171, 0, 1)",
  yellow700: "rgba(173, 139, 0, 1)",
  yellow800: "rgba(133, 106, 0, 1)",
  yellow900: "rgba(92, 73, 0, 1)",
} as const;

const oranges = {
  orange50: "rgba(255, 244, 229, 1)",
  orange100: "rgba(255, 225, 183, 1)",
  orange200: "rgba(255, 206, 138, 1)",
  orange300: "rgba(255, 187, 92, 1)",
  orange400: "rgba(255, 168, 46, 1)",
  orange500: "rgba(255, 149, 0, 1)",
  orange600: "rgba(214, 125, 0, 1)",
  orange700: "rgba(173, 101, 0, 1)",
  orange800: "rgba(133, 78, 0, 1)",
  orange900: "rgba(56, 45, 30, 1)",
} as const;

const indigoes = {
  indigo50: "rgba(239, 242, 254, 1)",
  indigo100: "rgba(226, 230, 253, 1)",
  indigo200: "rgba(202, 208, 251, 1)",
  indigo300: "rgba(170, 178, 247, 1)",
  indigo400: "rgba(136, 138, 241, 1)",
  indigo500: "rgba(116, 108, 232, 1)",
  indigo600: "rgba(99, 80, 219, 1)",
  indigo700: "rgba(85, 65, 193, 1)",
  indigo800: "rgba(69, 55, 156, 1)",
  indigo900: "rgba(60, 51, 124, 1)",
  indigo950: "rgba(18, 15, 36, 1)",
} as const;

const grays = {
  gray50: "rgba(255, 255, 255, 1)",
  gray100: "rgba(239, 239, 239, 1)",
  gray200: "rgba(220, 220, 220, 1)",
  gray300: "rgba(189, 189, 189, 1)",
  gray400: "rgba(152, 152, 152, 1)",
  gray500: "rgba(124, 124, 124, 1)",
  gray600: "rgba(101, 101, 101, 1)",
  gray700: "rgba(82, 82, 82, 1)",
  gray800: "rgba(70, 70, 70, 1)",
  gray900: "rgba(61, 61, 61, 1)",
  gray950: "rgba(41, 41, 41, 1)",
} as const;

const alertInfo = {
  alertInfo50: "rgba(242, 249, 253, 1)",
  alertInfo100: "rgba(228, 240, 250, 1)",
  alertInfo200: "rgba(195, 225, 244, 1)",
  alertInfo300: "rgba(142, 202, 235, 1)",
  alertInfo400: "rgba(81, 175, 223, 1)",
  alertInfo500: "rgba(51, 157, 212, 1)",
  alertInfo600: "rgba(28, 119, 173, 1)",
  alertInfo700: "rgba(24, 95, 140, 1)",
  alertInfo800: "rgba(24, 81, 116, 1)",
  alertInfo900: "rgba(25, 69, 97, 1)",
  alertInfo950: "rgba(17, 44, 64, 1)",
} as const;

const alertDanger = {
  alertDanger50: "rgba(254, 242, 242, 1)",
  alertDanger100: "rgba(253, 227, 227, 1)",
  alertDanger200: "rgba(253, 203, 203, 1)",
  alertDanger300: "rgba(250, 167, 167, 1)",
  alertDanger400: "rgba(244, 117, 117, 1)",
  alertDanger500: "rgba(234, 73, 73, 1)",
  alertDanger600: "rgba(217, 54, 54, 1)",
  alertDanger700: "rgba(181, 32, 32, 1)",
  alertDanger800: "rgba(149, 31, 31, 1)",
  alertDanger900: "rgba(124, 32, 32, 1)",
  alertDanger950: "rgba(67, 12, 12, 1)",
} as const;

const alertSuccess = {
  alertSuccess50: "rgba(241, 252, 243, 1)",
  alertSuccess100: "rgba(222, 250, 231, 1)",
  alertSuccess200: "rgba(191, 243, 206, 1)",
  alertSuccess300: "rgba(141, 232, 170, 1)",
  alertSuccess400: "rgba(83, 213, 125, 1)",
  alertSuccess500: "rgba(45, 189, 91, 1)",
  alertSuccess600: "rgba(31, 154, 70, 1)",
  alertSuccess700: "rgba(28, 121, 58, 1)",
  alertSuccess800: "rgba(27, 96, 50, 1)",
  alertSuccess900: "rgba(24, 79, 43, 1)",
  alertSuccess950: "rgba(8, 43, 20, 1)",
} as const;

const alertWarning = {
  alertWarning50: "rgba(255, 244, 237, 1)",
  alertWarning100: "rgba(255, 231, 212, 1)",
  alertWarning200: "rgba(255, 202, 168, 1)",
  alertWarning300: "rgba(255, 165, 113, 1)",
  alertWarning400: "rgba(255, 116, 56, 1)",
  alertWarning500: "rgba(254, 79, 17, 1)",
  alertWarning600: "rgba(239, 52, 7, 1)",
  alertWarning700: "rgba(198, 35, 8, 1)",
  alertWarning800: "rgba(157, 30, 15, 1)",
  alertWarning900: "rgba(126, 28, 16, 1)",
  alertWarning950: "rgba(68, 10, 6, 1)",
} as const;

const primary = oranges.orange500;

export const colors = {
  ...yellows,
  ...oranges,
  ...indigoes,
  ...grays,
  ...alertInfo,
  ...alertDanger,
  ...alertSuccess,
  ...alertWarning,
  successText: alertSuccess.alertSuccess600,
} as const;

export type AppColors = typeof colors;

export const palette = {
  primary,
  primaryPressed: oranges.orange600,
  primarySoft: oranges.orange100,

  secondary: indigoes.indigo600,
  secondarySoft: indigoes.indigo100,

  success: alertSuccess.alertSuccess600,
  successSoft: alertSuccess.alertSuccess50,

  warning: alertWarning.alertWarning500,
  warningSoft: alertWarning.alertWarning50,

  danger: alertDanger.alertDanger600,
  dangerSoft: alertDanger.alertDanger50,

  info: alertInfo.alertInfo600,
  infoSoft: alertInfo.alertInfo50,
} as const;
