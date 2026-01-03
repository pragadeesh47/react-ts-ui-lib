/* eslint-disable react-refresh/only-export-components */
//@@viewOn:imports
import { Icon as MdiIcon } from "@mdi/react";
import * as mdiIcons from "@mdi/js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
export const IconTypeScheme = {
  icon: {
    name: "icon",
    description: "Name of the Material Design Icon (mdi-*) to render.",
    required: false,
    type: "mdi-close" as string,
  },
  size: {
    name: "size",
    description: "Icon size; can be a number (em) or string (CSS size).",
    required: false,
    type: 1 as number | string,
  },
  color: {
    name: "color",
    description: "Icon color (CSS color value).",
    required: false,
    type: "white" as string,
  },
  className: {
    name: "className",
    description: "Additional class names for the wrapper span.",
    required: false,
    type: "" as string,
  },
  onClick: {
    name: "onClick",
    description: "Click handler for the icon wrapper.",
    required: false,
    type: (undefined as unknown) as React.MouseEventHandler<HTMLSpanElement>,
  },
  removeDefaultStyle: {
    name: "removeDefaultStyle",
    description: "Render without default layout styles.",
    required: false,
    type: false as boolean,
  },
  hidden: {
    name: "hidden",
    description: "If true, the icon is not rendered.",
    required: false,
    type: false as boolean,
  },
  label: {
    name: "label",
    description: "Optional text label displayed next to the icon.",
    required: false,
    type: "" as string,
  },
  tooltip: {
    name: "tooltip",
    description: "Browser tooltip shown on hover.",
    required: false,
    type: "" as string,
  },
  darkMode: {
    name: "darkMode",
    description: "Use dark mode palette when true.",
    required: false,
    type: true as boolean,
  },
};

export type IconProps = { [K in keyof typeof IconTypeScheme]?: (typeof IconTypeScheme)[K]["type"] };
//@@viewOff:propTypes

function Icon({
  icon = "mdi-close",
  size = 1,
  color = "white",
  className,
  onClick,
  removeDefaultStyle = false,
  hidden = false,
  label = "",
  darkMode = true,
  tooltip,
}: IconProps) {
  //@@viewOn:private
  if (hidden) return null;
  if (!icon) return null;

  const camelCaseName = icon.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  const path = (mdiIcons as Record<string, string>)[camelCaseName];

  if (!path) {
    console.warn(`Icon "${icon}" not found!`);
    return null;
  }

  //@@viewOff:private

  //@@viewOn:render
  return (
    <span
      className={`inline-flex items-center gap-1 ${className || ""}`}
      onClick={onClick}
      title={tooltip}
      style={{
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
      }}
    >
      <MdiIcon
        path={path}
        size={size}
        color={darkMode ? color : "black"}
        style={removeDefaultStyle ? {} : { display: "flex" }}
      />
      {label && <span>{label}</span>}
    </span>
  );
  //@@viewOff:render
}

//@@viewOn:exports
export { Icon };
export default Icon;
//@@viewOff:exports
