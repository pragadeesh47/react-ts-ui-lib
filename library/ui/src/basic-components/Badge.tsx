/* eslint-disable react-refresh/only-export-components */
//@@viewOn:imports
import React from "react";
import { getColorScheme, getSignificanceColor, type ColorScheme, type Significance } from "../tools/colors";
import { getRadiusValue, type RadiusToken } from "../tools/radius";
import Icon from "./Icon";
//@@viewOff:imports

//@@viewOn:propTypes
export const BadgeTypeScheme = {
  children: {
    name: "children",
    description: "Obsah badge (text nebo vlastní node).",
    required: false,
    type: undefined as React.ReactNode,
  },
  label: {
    name: "label",
    description: "Textový obsah badge (pokud není children).",
    required: false,
    type: "" as string,
  },
  icon: {
    name: "icon",
    description: "Název MDI ikony, renderuje interní Icon komponentu.",
    required: false,
    type: "" as string,
  },
  colorScheme: {
    name: "colorScheme",
    description: "Barevné schéma badge (primary, success, danger, warning, info).",
    required: false,
    type: "primary" as ColorScheme,
  },
  significance: {
    name: "significance",
    description: "Intenzita barvy: common (default), highlighted, distinct.",
    required: false,
    type: "common" as Significance,
  },
  radius: {
    name: "radius",
    description: "Předdefinované zaoblení (xs, sm, md, lg, full).",
    required: false,
    type: "md" as RadiusToken,
  },
  onClick: {
    name: "onClick",
    description: "Click handler pro badge.",
    required: false,
    type: (undefined as unknown) as React.MouseEventHandler<HTMLSpanElement>,
  },
  disabled: {
    name: "disabled",
    description: "Vypne interakce a změní vzhled.",
    required: false,
    type: false as boolean,
  },
  hidden: {
    name: "hidden",
    description: "Pokud true, badge se nevyrenderuje.",
    required: false,
    type: false as boolean,
  },
  noPrint: {
    name: "noPrint",
    description: "Skryje badge při tisku (přidá className no-print).",
    required: false,
    type: false as boolean,
  },
  className: {
    name: "className",
    description: "Dodatečné className pro wrapper.",
    required: false,
    type: "" as string,
  },
  tooltip: {
    name: "tooltip",
    description: "Native tooltip při hoveru.",
    required: false,
    type: "" as string,
  },
  darkMode: {
    name: "darkMode",
    description: "Použije tmavé schéma barev.",
    required: false,
    type: true as boolean,
  },
  removeDefaultStyle: {
    name: "removeDefaultStyle",
    description: "Bez defaultních stylů (ponechá jen obsah).",
    required: false,
    type: false as boolean,
  },
};

export type BadgeProps = {
  [K in keyof typeof BadgeTypeScheme]?: (typeof BadgeTypeScheme)[K]["type"];
};
//@@viewOff:propTypes

//@@viewOn:component
const Badge = ({
  children,
  label,
  icon = "",
  colorScheme = "primary",
  significance = "common",
  radius = "md",
  onClick,
  disabled = false,
  hidden = false,
  noPrint = false,
  className,
  tooltip,
  darkMode = true,
  removeDefaultStyle = false,
}: BadgeProps) => {
  //@@viewOn:private
  if (hidden) return null;

  const scheme = getSignificanceColor(colorScheme, significance, darkMode);
  const baseScheme = getColorScheme(colorScheme, darkMode);

  const disabledBg = getColorScheme("surface", darkMode).color;
  const disabledText = getColorScheme("muted", darkMode).color;

  const background = disabled ? disabledBg : scheme.color;
  const textColor = disabled ? disabledText : scheme.textColor;
  const borderRadius = getRadiusValue(radius);

  const clickable = !!onClick && !disabled;
  const content = children ?? label;
  //@@viewOff:private

  //@@viewOn:render
  return (
    <span
      className={`${className ?? ""} ${noPrint ? "no-print" : ""}`.trim()}
      onClick={clickable ? onClick : undefined}
      role={clickable ? "button" : undefined}
      aria-disabled={disabled || undefined}
      title={tooltip}
      style={
        removeDefaultStyle
          ? undefined
          : {
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 8px",
              background,
              color: textColor,
              borderRadius,
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 600,
              cursor: clickable ? "pointer" : "default",
              userSelect: "none",
              border: `1px solid ${disabled ? disabledBg : baseScheme.color}`,
              opacity: disabled ? 0.65 : 1,
            }
      }
    >
      {icon && <Icon icon={icon} size={0.75} darkMode={darkMode} />}
      {content}
    </span>
  );
  //@@viewOff:render
};
//@@viewOff:component

//@@viewOn:exports
export { Badge };
export default Badge;
//@@viewOff:exports
