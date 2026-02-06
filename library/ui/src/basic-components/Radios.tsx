/* eslint-disable react-refresh/only-export-components */
//@@viewOn:imports
import React from "react";
import { getColorScheme } from "../tools/colors";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  wrapper: (
    removeDefaultStyle?: boolean,
    direction: "row" | "column" = "column",
  ): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    return {
      display: "flex",
      flexDirection: direction,
      gap: "0.75rem",
      flexWrap: "wrap",
    };
  },

  optionRow: (removeDefaultStyle?: boolean): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    return {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      cursor: "pointer",
    };
  },

  radio: (removeDefaultStyle?: boolean, darkMode = true): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    const scheme = getColorScheme("primary", darkMode);

    return {
      width: "1.125rem",
      height: "1.125rem",
      accentColor: scheme.color,
      cursor: "pointer",
    };
  },

  labelText: (removeDefaultStyle?: boolean, darkMode = true): React.CSSProperties => {
    if (removeDefaultStyle) {
      return {};
    }

    const scheme = getColorScheme("background", darkMode);

    return {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: scheme.textColor,
      fontFamily: "inherit",
    };
  },
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
export type RadiosItem = {
  value: string | number;
  label: React.ReactNode;
};

export type RadiosProps = {
  className?: string;
  noPrint?: boolean;
  hidden?: boolean;
  removeDefaultStyle?: boolean;
  darkMode?: boolean;
  itemList: RadiosItem[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  direction?: "row" | "column";
};

// Const array for runtime prop extraction in documentation
export const RADIOS_PROP_NAMES = [
  "className",
  "noPrint",
  "hidden",
  "removeDefaultStyle",
  "darkMode",
  "itemList",
  "value",
  "onChange",
  "onFocus",
  "onBlur",
  "name",
  "id",
  "direction",
] as const;
//@@viewOff:propTypes

const Radios = ({
  className,
  noPrint = false,
  hidden = false,
  removeDefaultStyle = false,
  darkMode = true,
  itemList,
  value = "",
  onChange,
  onFocus,
  onBlur,
  name,
  id,
  direction = "column",
}: RadiosProps) => {
  //@@viewOn:private
  if (hidden) return null;

  const valueStr = value === undefined || value === null ? "" : String(value);
  //@@viewOff:private

  //@@viewOn:render
  return (
    <div
      className={`${className ?? ""} ${noPrint ? "no-print" : ""}`.trim()}
      style={Css.wrapper(removeDefaultStyle, direction)}
      role="radiogroup"
    >
      {itemList.map((item) => {
        const itemValueStr = String(item.value);
        const isChecked = valueStr === itemValueStr;
        const inputId = id ? `${id}-${itemValueStr}` : undefined;

        return (
          <label
            key={itemValueStr}
            style={Css.optionRow(removeDefaultStyle)}
            htmlFor={inputId}
          >
            <input
              type="radio"
              id={inputId}
              name={name}
              value={itemValueStr}
              checked={isChecked}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              style={Css.radio(removeDefaultStyle, darkMode)}
            />
            <span style={Css.labelText(removeDefaultStyle, darkMode)}>
              {typeof item.label === "string" ? item.label : String(item.label)}
            </span>
          </label>
        );
      })}
    </div>
  );
  //@@viewOff:render
};

//@@viewOn:exports
export { Radios };
export default Radios;
//@@viewOff:exports
