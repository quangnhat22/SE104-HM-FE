import { IconUsers } from "@tabler/icons";

const accounts = {
  id: "accountsGroup",
  title: "Tài khoản",
  type: "group",

  children: [
    {
      id: "accounts",
      title: "Tài khoản",
      type: "item",
      url: "/accounts",
      icon: IconUsers,
      breadcrumbs: false,
    },
  ],
};

export default accounts;
