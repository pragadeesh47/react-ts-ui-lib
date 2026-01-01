//@@viewOn:imports
import React from "react";
import { Documentation, Navbar as UiNavbar, NavbarTypeScheme, Icon, Button } from "@react-ts-ui-lib/ui";
//@@viewOff:imports

//@@viewOn:constants
const TITLE = "Navbar Component";
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

//@@viewOn:propTypes
//@@viewOff:propTypes

const NavbarDoc = () => {
  //@@viewOn:private
  const propTypesList = Object.values(NavbarTypeScheme);

  const commonRight = (
    <>
      <Icon icon="mdi-bell" />
      <Icon icon="mdi-account" />
    </>
  );

  const componentList = [
    {
      category: "Layout",
      itemList: [
        {
          label: "logo string",
          components: <UiNavbar logo="LOGO" rightContent={commonRight} />,
        },
        {
          label: "custom logo",
          components: (
            <UiNavbar
              logo={<span style={{ fontWeight: 700 }}>MyApp</span>}
              centerContent={<Button label="Center" />}
              rightContent={commonRight}
            />
          ),
        },
      ],
    },
    {
      category: "Color scheme",
      itemList: [
        { label: "background", components: <UiNavbar colorScheme="background" /> },
        { label: "surface", components: <UiNavbar colorScheme="surface" /> },
      ],
    },
    {
      category: "Dark mode",
      itemList: [
        { label: "dark", components: <UiNavbar darkMode /> },
        { label: "light", components: <UiNavbar darkMode={false} /> },
      ],
    },
    {
      category: "Styling",
      itemList: [
        { label: "raw", components: <UiNavbar removeDefaultStyle /> },
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
export { NavbarDoc as Navbar };
export default NavbarDoc;
//@@viewOff:exports
