//@@viewOn:imports
import React, { Suspense } from "react";
import type { SideBarItem } from "@react-ts-ui-lib/ui";
import componentMap from "./tools/ComponentMap";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
type ContentProps = {
  selectedItem: SideBarItem | null;
};
//@@viewOff:propTypes

const Content = ({ selectedItem }: ContentProps) => {
  //@@viewOn:private
  if (!selectedItem) {
    return <div>Select a component from the menu.</div>;
  }

  const Component = componentMap[selectedItem.title];
  //@@viewOff:private

  //@@viewOn:render
  return (
    <div>
      <h1>{selectedItem.title}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {Component ? (
          <Component />
        ) : (
          <div>Component "{selectedItem.title}" not found in map</div>
        )}
      </Suspense>
    </div>
  );
  //@@viewOff:render
};

//@@viewOn:exports
export { Content };
export default Content;
//@@viewOff:exports
