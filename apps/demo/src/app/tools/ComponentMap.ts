import React from "react";

const componentMap: { [key: string]: React.LazyExoticComponent<React.FC> } = {
  //Routes
  Contributors: React.lazy(() => import("../Contributions")),

  //Components
  SideBar: React.lazy(() => import("../../Documentation/SideBar")),
  Pending: React.lazy(() => import("../../Documentation/Pending")),
  Icon: React.lazy(() => import("../../Documentation/Icon")),
  Button: React.lazy(() => import("../../Documentation/button-doc")),
  Navbar: React.lazy(() => import("../../Documentation/Navbar")),
};

export { componentMap };
export default componentMap;
