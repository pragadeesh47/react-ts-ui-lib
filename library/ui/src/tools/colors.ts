// 12 základních barev pro design systém
const colors = {
  // Application background (default darker gray)
  background: {
    color: "#1b1d1fff",
    key: "background" as const,
  },
  // Elevated surfaces (cards, panels)
  surface: {
    color: "#111827",
    key: "surface" as const,
  },

  // Primary action color (buttons, links)
  primary: {
    color: "#2563eb",
    key: "primary" as const,
  },
  primaryHover: {
    color: "#1d4ed8",
    key: "primaryHover" as const,
  },
  primaryDark: {
    color: "#1e40af",
    key: "primaryDark" as const,
  },

  // Informational / accent
  info: {
    color: "#06b6d4",
    key: "info" as const,
  },
  infoDark: {
    color: "#0891b2",
    key: "infoDark" as const,
  },

  // Status colors
  success: {
    color: "#16a34a",
    key: "success" as const,
  },
  successDark: {
    color: "#15803d",
    key: "successDark" as const,
  },
  danger: {
    color: "#ef4444",
    key: "danger" as const,
  },
  dangerDark: {
    color: "#dc2626",
    key: "dangerDark" as const,
  },
  warning: {
    color: "#f59e0b",
    key: "warning" as const,
  },
  warningDark: {
    color: "#d97706",
    key: "warningDark" as const,
  },

  // Typography / neutral
  text: {
    color: "#e6eef8",
    key: "text" as const,
  },
  muted: {
    color: "#9ca3af",
    key: "muted" as const,
  },

  // UI outlines / borders
  border: {
    color: "#374151",
    key: "border" as const,
  },

  // Generic shadow color (RGBA string may still be used inline)
  shadow: {
    color: "rgba(2,6,23,0.08)",
    key: "shadow" as const,
  },
};

export const colorsKeyList = [
  colors.primary.key,
  colors.success.key,
  colors.danger.key,
  colors.warning.key,
  colors.info.key,
  colors.surface.key,
  colors.background.key,
] as const;

export type ColorScheme = typeof colorsKeyList[number];

export default colors;
