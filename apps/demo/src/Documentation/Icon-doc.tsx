//@@viewOn:imports
import React from "react";
import { Documentation, Icon as UiIcon, IconTypeScheme } from "@react-ts-ui-lib/ui";
//@@viewOff:imports

//@@viewOn:constants
const TITLE = "Icon Component";
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
//@@viewOff:propTypes

const IconDoc = () => {
  //@@viewOn:private
  const propTypesList = Object.values(IconTypeScheme);

  const componentList = [
    {
      category: "Basic",
      itemList: [
        { label: "default", components: <UiIcon icon="mdi-check" /> },
        { label: "size 2", components: <UiIcon icon="mdi-check" size={2} /> },
        { label: "red", components: <UiIcon icon="mdi-heart" color="#ef4444" /> },
        { label: "label", components: <UiIcon icon="mdi-information" label="Info" /> },
        { label: "tooltip", components: <UiIcon icon="mdi-help-circle" tooltip="Help" /> },
      ],
    },
  ];
  //@@viewOff:private

  //@@viewOn:render
  return (
    <div>
      <Documentation title={TITLE} propTypesList={propTypesList} componentList={componentList} />
    </div>
  );
  //@@viewOff:render
};

//@@viewOn:exports
export { IconDoc as Icon };
export default IconDoc;
//@@viewOff:exports
