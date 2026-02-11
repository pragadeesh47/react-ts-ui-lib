import type { SideBarItem } from "@react-ts-ui-lib/ui";
import { getComponentList } from "./ComponentList";
import { getUtilsList } from "./utilsList";

export const getRouteList = (t: (key: string) => string): SideBarItem[] => [
  ...getComponentList(t),
  {
    title: t("sidebar.routes.table"),
    icon: "mdi-table-large",
    defaultExpandedItem: false,
    key: "Table",
  },
  {
    title: t("sidebar.routes.utilities"),
    icon: "mdi-wrench",
    defaultExpandedItem: false,
    key: "Utilities",
    itemList: getUtilsList(t),
  },
  { title: t("sidebar.routes.profile"), icon: "mdi-account", key: "Profile" },
  {
    title: t("sidebar.routes.contributors"),
    icon: "mdi-cog",
    key: "Contributors",
  },
  {
    title: t("sidebar.routes.aboutApplication"),
    icon: "mdi-cog",
    key: "AboutApplication",
  },
];
