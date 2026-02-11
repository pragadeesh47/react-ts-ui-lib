import type { SideBarItem } from "@react-ts-ui-lib/ui";

export const getUtilsList = (t: (key: string) => string): SideBarItem[] => [
  {
    title: t("sidebar.utilities.copyToClipboard"),
    icon: "mdi-content-copy",
    iconColor: "cyan",
    key: "CopyToClipboard",
  },
  {
    title: t("sidebar.utilities.getMostFrequentValue"),
    icon: "mdi-chart-bar",
    iconColor: "cyan",
    key: "GetMostFrequentValue",
  },
  {
    title: t("sidebar.utilities.generatePassword"),
    icon: "mdi-key-variant",
    iconColor: "cyan",
    key: "GeneratePassword",
  },
  {
    title: t("sidebar.utilities.parseQueryString"),
    icon: "mdi-link-variant",
    iconColor: "cyan",
    key: "ParseQueryString",
  },
  {
    title: t("sidebar.utilities.generateRandomString"),
    icon: "mdi-format-letter-case",
    iconColor: "cyan",
    key: "GenerateRandomString",
  },
  {
    title: t("sidebar.utilities.validateEmail"),
    icon: "mdi-email-check",
    iconColor: "cyan",
    key: "ValidateEmail",
  },
  {
    title: t("sidebar.utilities.validateJson"),
    icon: "mdi-code-json",
    iconColor: "cyan",
    key: "ValidateJson",
  },
];
