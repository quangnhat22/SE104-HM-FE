import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ApexCharts from "apexcharts";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import chartConfig from "../../chart-config/total-revenue-of-year-chart";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonTotalGrowthBarChart from "../../ui-component/cards/Skeleton/TotalGrowthBarChart";
import numberWithCommas from "../../utils/number-with-commas";

const _ = require("lodash");

const TotalRevenueChart = ({ isLoading }) => {
  const [year, setYear] = useState("2021");
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();
  const { navType } = customization;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const primaryDark = theme.palette.primary.dark;
  const { invoiceList } = useSelector((state) => state.InvoiceReducer);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [yearList, setYearList] = useState([]);
  const [monthRevenueList, setMonthRevenueList] = useState([]);

  useEffect(() => {
    setTotalRevenue(_.sumBy(invoiceList, (invoice) => invoice.TongTien));
    let rawYearList = _.map(invoiceList, (invoice) =>
      invoice.NgayLap.slice(0, 4)
    );
    setYearList(_.uniq(rawYearList));
    let tempMonthRevenueList = [];
    for (let i = 1; i <= 12; i++) {
      tempMonthRevenueList.push(
        _.reduce(
          invoiceList,
          (sum, invoice) => {
            return parseInt(invoice.NgayLap.slice(5, 7)) === i
              ? sum + invoice.TongTien
              : sum;
          },
          0
        )
      );
    }
    setMonthRevenueList(tempMonthRevenueList);
  }, [invoiceList]);

  console.log(monthRevenueList);

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
      chart: {
        ...chartConfig.options.chart,
        events: {
          click(event, chartContext, config) {
            navigate(`./monthly-report/${year}/${config.dataPointIndex + 1}`);
          },
        },
      },
    };

    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
    }
  }, [navType, primaryDark, primary, grey200, isLoading, grey500, year]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
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
                        Tổng doanh thu của năm
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{`${numberWithCommas(
                        totalRevenue
                      )} VNĐ`}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    select
                    value={yearList[0]}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    {yearList.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart
                {...chartConfig}
                series={[
                  {
                    name: "Doanh thu",
                    data: monthRevenueList,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalRevenueChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalRevenueChart;
