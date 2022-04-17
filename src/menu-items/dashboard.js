import { IconDashboard, IconActivity, IconBuilding } from "@tabler/icons";

const dashboard = {
  id: "dashboardGroup",
  title: "Dashboard",
  type: "group",

  children: [
    {
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "",
      icon: IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "room",
      title: "Phòng",
      type: "collapse",
      icon: IconBuilding,

      children: [
        {
          id: "roomList",
          title: "Danh mục phòng",
          type: "item",
          url: "/room",
          target: false,
          breadcrumbs: false,
        },
        {

          id: 'monthlyReport',
          title: 'Báo cáo tháng',
          type: 'item',
          url: '/monthly-report',
          target: false,
          breadcrumbs: false
        },
        {
          id: 'payment',
          title: 'Thanh toán',
          type: 'item',
          url: '/payment',
          target: false,
          breadcrumbs: false
        },
      ],
    },
  ],
};

export default dashboard;
