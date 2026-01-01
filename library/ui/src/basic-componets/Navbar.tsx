//@@viewOn:imports
import React from "react";
import type { ReactNode } from "react";
import { type ColorScheme, getColorScheme } from "../tools/colors";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  container: (
    removeDefaultStyle?: boolean,
    colorScheme: ColorScheme = "background",
    darkMode = true
  ): React.CSSProperties => {
    if (removeDefaultStyle) return {};
    const scheme = getColorScheme(colorScheme, darkMode);

    // Border color: light in dark mode, dark in light mode
    const borderColor = darkMode ? "#374151" : "#e5e7eb";

    return {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
      padding: "0 16px",
      backgroundColor: scheme.color,
      borderBottom: `1px solid ${borderColor}`,
      boxSizing: "border-box",
      minWidth: "100%",
      color: scheme.textColor,
    };
  },

  section: (align: "left" | "center" | "right"): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: align === "center" ? 1 : undefined,
    justifyContent:
      align === "center"
        ? "center"
        : align === "right"
        ? "flex-end"
        : "flex-start",
  }),

  logo: (
    removeDefaultStyle?: boolean,
    colorScheme: ColorScheme = "background",
    darkMode = true
  ): React.CSSProperties => {
    if (removeDefaultStyle) return {};
    const scheme = getColorScheme(colorScheme, darkMode);
    return {
      fontSize: 18,
      fontWeight: 600,
      color: scheme.textColor,
      cursor: "pointer",
    };
  },

  actionButton: (removeDefaultStyle?: boolean): React.CSSProperties => {
    if (removeDefaultStyle) return {};
    return {
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    };
  },
};
//@@viewOff:css

//@@viewOn:propTypes
export const NavbarTypeScheme = {
  logo: {
    name: "Logo",
    description: "Content rendered in the left section; string or custom node.",
    required: false,
    type: "LOGO" as string | ReactNode,
  },
  centerContent: {
    name: "Center content",
    description: "Content placed in the centered section of the navbar.",
    required: false,
    type: undefined as ReactNode,
  },
  rightContent: {
    name: "Right content",
    description: "Content placed in the right section (e.g., actions).",
    required: false,
    type: undefined as ReactNode,
  },
  onLogoClick: {
    name: "On logo click",
    description: "Callback fired when the logo is clicked.",
    required: false,
    type: undefined as () => void,
  },
  removeDefaultStyle: {
    name: "Remove default style",
    description: "Disables built-in styling for container, logo, and buttons.",
    required: false,
    type: false as boolean,
  },
  colorScheme: {
    name: "Color scheme",
    description: "Background and text colors based on theme palette.",
    required: false,
    type: "background" as ColorScheme,
  },
  darkMode: {
    name: "Dark mode",
    description: "Use dark mode palette when true.",
    required: false,
    type: true as boolean,
  },
};

export type NavbarProps = { [K in keyof typeof NavbarTypeScheme]?: (typeof NavbarTypeScheme)[K]["type"] };
//@@viewOff:propTypes

//@@viewOn:render
function Navbar({
  logo = "LOGO",
  centerContent,
  rightContent,
  onLogoClick,
  removeDefaultStyle = false,
  colorScheme = "background",
  darkMode = true,
}: NavbarProps) {
  return (
    <header style={Css.container(removeDefaultStyle, colorScheme, darkMode)}>
      {/* LEFT – LOGO */}
      <div style={Css.section("left")}>
        <div
          style={Css.logo(removeDefaultStyle, colorScheme, darkMode)}
          onClick={onLogoClick}
        >
          {logo}
        </div>
      </div>

      {/* CENTER */}
      <div style={Css.section("center")}>{centerContent}</div>

      {/* RIGHT – ACTIONS */}
      <div style={Css.section("right")}>{rightContent}</div>
    </header>
  );
}
//@@viewOff:render

//@@viewOn:exports
export { Navbar };
export default Navbar;
//@@viewOff:exports
