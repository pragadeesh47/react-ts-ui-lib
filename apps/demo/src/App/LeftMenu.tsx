//@@viewOn:imports
import React from "react";
import { SideBar } from "@react-ts-ui-lib/ui";
import type { SideBarItem } from "@react-ts-ui-lib/ui";
import routeList from "../App/tools/RouteList";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
type LeftMenuPropTypes = {
  setSelectedItem: React.Dispatch<React.SetStateAction<SideBarItem | null>>;
};
//@@viewOff:propTypes

const LeftMenu = ({ setSelectedItem }: LeftMenuPropTypes) => {
  //@@viewOn:private
  const handleItemClick = (item: SideBarItem) => {
    setSelectedItem(item);
  };
  //@@viewOff:private

  //@@viewOn:render
  return <SideBar itemList={routeList} onItemClick={handleItemClick} />;
  //@@viewOff:render
};

//@@viewOn:exports
export { LeftMenu };
export default LeftMenu;
//@@viewOff:exports
