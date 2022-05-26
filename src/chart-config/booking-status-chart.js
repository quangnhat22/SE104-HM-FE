const chartConfig = {
  type: "donut",
  height: 400,
  width: "100%",
  options: {
    labels: ["Phòng trống", "Đã đặt"],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
            },
          },
        },
      },
    },
  },
};
export default chartConfig;
