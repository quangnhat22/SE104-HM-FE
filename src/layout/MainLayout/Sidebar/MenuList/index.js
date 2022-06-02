import { Typography } from "@mui/material";
import Cookies from "js-cookie";
import accounts from "../../../../menu-items/accounts";
import dashboard from "../../../../menu-items/dashboard";
import settings from "../../../../menu-items/settings";
import NavGroup from "./NavGroup";

const MenuList = () => {
  const userLevel = Cookies.get("level");

  const menuItem = {
    items:
      userLevel === "0"
        ? [dashboard, accounts, settings]
        : [dashboard],
  };

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });
  return <>{navItems}</>;
};

export default MenuList;
