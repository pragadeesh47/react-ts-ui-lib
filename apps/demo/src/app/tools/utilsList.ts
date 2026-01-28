import type { SideBarItem } from "@react-ts-ui-lib/ui";

export const getUtilsList = (t: (key: string) => string): SideBarItem[] => [
  { title: t("sidebar.utilities.copyToClipboard"), icon: "mdi-content-copy", key: "CopyToClipboard" },
];
