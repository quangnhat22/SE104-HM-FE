import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import chartConfig from "../../chart-config/total-revenue-of-month-chart";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalGrowthBarChart from "../../ui-component/cards/Skeleton/TotalGrowthBarChart";

const TotalRevenueOfMonthChart = ({ isLoading }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const primaryDark = theme.palette.primary.dark;

  useEffect(() => {
    const newChartData = {
      ...chartConfig.options,
      colors: [primaryDark],
      xaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      grid: {
        borderColor: grey200,
      },
      tooltip: {
        theme: "light",
      },
      legend: {
        labels: {
          colors: grey500,
        },
      },
    };

    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [navType, primaryDark, primary, grey200, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard sx={{mt: 3}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        Tổng doanh thu của tháng
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">2,324,000 VNĐ</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart series={[1000, 2000]} {...chartConfig} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalRevenueOfMonthChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalRevenueOfMonthChart;
