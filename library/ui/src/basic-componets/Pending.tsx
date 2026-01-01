//@@viewOn:imports
import { getColorScheme } from "../tools/colors";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
export const PendingTypeScheme = {
  className: {
    name: "Class name",
    description: "Additional CSS class names for the SVG element.",
    required: false,
    type: "" as string,
  },
  type: {
    name: "Type",
    description: "Spinner style: circular or horizontal bar.",
    required: false,
    type: "circular" as "circular" | "horizontal",
  },
  size: {
    name: "Size",
    description: "Base size in pixels (affects dimensions).",
    required: false,
    type: 18 as number,
  },
  darkMode: {
    name: "Dark mode",
    description: "Use dark mode palette when true.",
    required: false,
    type: true as boolean,
  },
};

export type PendingProps = { [K in keyof typeof PendingTypeScheme]?: (typeof PendingTypeScheme)[K]["type"] };
//@@viewOff:propTypes

const Pending = ({ className, type = "circular", size = 18, darkMode = true }: PendingProps) => {
  const mutedScheme = getColorScheme("muted", darkMode);
  const textScheme = getColorScheme("text", darkMode);
  
  const strokeBackground = mutedScheme.color;
  const strokeForeground = textScheme.color;

  if (type === "horizontal") {
    // horizontal track with moving foreground bar inside (light track, darker moving bar)
    const trackWidth = Math.max(48, size * 4);
    const height = Math.max(6, Math.floor(size / 4));
    const innerWidth = Math.max(12, Math.floor(trackWidth * 0.28));
    const startX = -innerWidth;
    const endX = trackWidth;

    //@@viewOn:render
    return (
      <svg
        width={trackWidth}
        height={height}
        viewBox={`0 0 ${trackWidth} ${height}`}
        fill="none"
        aria-hidden={true}
        focusable={false}
        className={className}
        style={{ display: "block" }}
      >
        <rect
          x={0}
          y={0}
          width={trackWidth}
          height={height}
          rx={height / 2}
          fill={strokeBackground}
        />

        <rect
          x={startX}
          y={0}
          width={innerWidth}
          height={height}
          rx={height / 2}
          fill={strokeForeground}
        >
          <animate
            attributeName="x"
            values={`${startX};${endX};${startX}`}
            dur="1.2s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    );
  }

  // default circular spinner
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden={true}
      focusable={false}
      className={className}
      style={{ display: "block" }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={strokeBackground}
        strokeWidth="4"
      />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke={strokeForeground}
        strokeWidth="4"
        strokeLinecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 12 12"
          to="360 12 12"
          dur="0.9s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
//@@viewOff:render

//@@viewOn:exports
export { Pending };
export default Pending;
//@@viewOff:exports
