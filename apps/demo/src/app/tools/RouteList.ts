import { componentList } from "./ComponentList";

const routeList = [
  { title: "Home", icon: "mdi-home" },
  {
    title: "Documentation",
    icon: "mdi-home",
    defaultExpandedItem: true,
    itemList: componentList,
  },
  { title: "Profile", icon: "mdi-account" },
  { title: "Contributors", icon: "mdi-cog" },
  { title: "About Application", icon: "mdi-cog" },
];

export default routeList;
