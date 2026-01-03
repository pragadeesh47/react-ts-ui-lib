//@@viewOn:imports
import React, { useState } from "react";
import { type ColorScheme, getColorScheme } from "../tools/colors";
import Pending from "./Pending";
import Icon from "./Icon";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  button: (
    removeDefaultStyle?: boolean,
    disabled?: boolean,
    pending?: boolean,
    colorScheme: ColorScheme = "primary",
    darkMode = true
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    const primaryScheme = getColorScheme("primary", darkMode);
    const successScheme = getColorScheme("success", darkMode);
    const dangerScheme = getColorScheme("danger", darkMode);
    const warningScheme = getColorScheme("warning", darkMode);
    const infoScheme = getColorScheme("info", darkMode);
    const surfaceScheme = getColorScheme("surface", darkMode);
    const mutedScheme = getColorScheme("muted", darkMode);

    const schemeMap: Record<string, typeof primaryScheme> = {
      primary: primaryScheme,
      success: successScheme,
      danger: dangerScheme,
      warning: warningScheme,
      info: infoScheme,
    };

    const scheme = schemeMap[colorScheme as string];

    const isDisabled = disabled || pending;
    const background = isDisabled ? surfaceScheme.color : scheme.color;
    const textColor = isDisabled ? mutedScheme.color : scheme.textColor;

    return {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "0.5rem 1rem",
      border: "none",
      borderRadius: 8,
      background: background,
      color: textColor,
      cursor: isDisabled ? "not-allowed" : "pointer",
      fontWeight: 600,
      transition:
        "transform 120ms ease, background 160ms ease, color 160ms ease",
      outline: "none",
      WebkitTapHighlightColor: "transparent",
      position: "relative",
    };
  },

  buttonHover: (
    removeDefaultStyle?: boolean,
    disabled?: boolean,
    pending?: boolean,
    colorScheme: ColorScheme = "primary",
    darkMode = true
  ): React.CSSProperties => {
    if (removeDefaultStyle || disabled || pending) {
      return {};
    }

    const primaryDarkScheme = getColorScheme("primaryDark", darkMode);
    const successDarkScheme = getColorScheme("successDark", darkMode);
    const dangerDarkScheme = getColorScheme("dangerDark", darkMode);
    const warningDarkScheme = getColorScheme("warningDark", darkMode);
    const infoDarkScheme = getColorScheme("infoDark", darkMode);

    const schemeMap: Record<string, typeof primaryDarkScheme> = {
      primary: primaryDarkScheme,
      success: successDarkScheme,
      danger: dangerDarkScheme,
      warning: warningDarkScheme,
      info: infoDarkScheme,
    };

    const scheme = schemeMap[colorScheme as string];

    return {
      cursor: "pointer",
      background: scheme.color,
    };
  },

  buttonFocus: (
    removeDefaultStyle?: boolean,
    disabled?: boolean,
    pending?: boolean
  ): React.CSSProperties => {
    if (removeDefaultStyle || disabled || pending) {
      return {};
    }

    return {};
  },

  content: (isPending?: boolean): React.CSSProperties => ({
    visibility: isPending ? "hidden" : "visible",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
  }),

  spinnerContainer: (): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
export const ButtonTypeScheme = {
  children: {
    name: "children",
    required: false,
    description:
      "Content rendered inside the button (text, icons, custom nodes).",
    type: undefined as React.ReactNode,
  },
  disabled: {
    name: "disabled",
    required: false,
    description: "Prevents interaction and visually disables the button.",
    type: false as boolean,
  },
  loading: {
    name: "loading",
    description:
      "Alias for pending state – indicates that an async action is running.",
    required: false,
    type: false as boolean,
  },
  colorScheme: {
    name: "colorScheme",
    description:
      "Determines visual look of the button based on predefined color palette (primary, success, danger…).",
    required: false,
    type: "primary" as ColorScheme,
  },
  icon: {
    name: "icon",
    description: "Name of mdi icon rendered inside the button.",
    required: false,
    type: "" as string,
  },
  iconPosition: {
    name: "iconPosition",
    description:
      "Controls whether icon is rendered on the left or right side of the content.",
    required: false,
    type: "undefined" as "left" | "right",
  },
  label: {
    name: "label",
    description:
      "Simple text alternative to children – useful for easy text buttons or accessibility.",
    required: false,
    type: "" as string,
  },
  onClick: {
    name: "onClick",
    description: "Triggered when the user clicks the button.",
    required: false,
    type: undefined as (e: React.MouseEvent<HTMLButtonElement>) => void,
  },
  className: {
    name: "className",
    description:
      "Additional CSS class names applied to the root button element.",
    required: false,
    type: "" as string,
  },
  removeDefaultStyle: {
    name: "removeDefaultStyle",
    description:
      "Disables built-in styling and leaves only raw button element for full customization.",
    required: false,
    type: false as boolean,
  },
  tooltip: {
    name: "tooltip",
    description: "Browser default tooltip shown when hovering over the button.",
    required: false,
    type: "" as string,
  },
  type: {
    name: "type",
    description: "Native button type (button, submit, reset).",
    required: false,
    type: "" as "button" | "submit" | "reset",
  },
  darkMode: {
    name: "darkMode",
    description:
      "Renders the button using dark mode palette (affects colorScheme behavior).",
    required: false,
    type: true as boolean,
  },
  isPending: {
    name: "isPending",
    description:
      "Shows loading spinner and blocks interactions. Content becomes visually hidden.",
    required: false,
    type: false as boolean,
  },
};

export type ButtonProps = {
  [K in keyof typeof ButtonTypeScheme]?: (typeof ButtonTypeScheme)[K]["type"];
};
//@@viewOff:propTypes

const Button = ({
  children,
  label,
  disabled = false,
  className,
  removeDefaultStyle = false,
  type = "button",
  tooltip,
  isPending = false,
  colorScheme = "primary",
  onClick,
  icon = "",
  iconPosition = "left",
  darkMode = true,
}: ButtonProps) => {
  //@@viewOn:private
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  const isDisabled = disabled || isPending;

  //@@viewOff:private
  //@@viewOn:render
  return (
    <button
      disabled={isDisabled}
      className={className}
      style={{
        ...Css.button(
          removeDefaultStyle,
          disabled,
          isPending,
          colorScheme,
          darkMode
        ),
        ...(hover && !isDisabled
          ? Css.buttonHover(
              removeDefaultStyle,
              disabled,
              isPending,
              colorScheme,
              darkMode
            )
          : {}),
        ...(focus && !isDisabled
          ? Css.buttonFocus(removeDefaultStyle, disabled, isPending)
          : {}),
      }}
      type={type}
      title={tooltip}
      aria-label={
        tooltip ?? (typeof children === "string" ? children : undefined)
      }
      aria-busy={isPending || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      onClick={onClick}
    >
      <span style={Css.content(isPending)}>
        {iconPosition === "left" && <Icon icon={icon} />}
        {children || label}
        {iconPosition === "right" && <Icon icon={icon} />}
      </span>
      {isPending && (
        <span style={Css.spinnerContainer()}>
          <Pending darkMode={darkMode} />
        </span>
      )}
    </button>
  );
  //@@viewOff:render
};

//@@viewOn:exports
export { Button };
export default Button;
//@@viewOff:exports
