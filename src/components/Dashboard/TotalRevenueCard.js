import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EarningIcon from "../../assets/images/icons/earning.svg";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonEarningCard from "../../ui-component/cards/Skeleton/EarningCard";
import numberWithCommas from "../../utils/number-with-commas"

const _ = require("lodash");

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));

const TotalRevenueCard = ({ isLoading }) => {
  const theme = useTheme();
  const { reportList } = useSelector((state) => state.ReportInYearReducer);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    setTotalRevenue(_.sumBy(reportList, (report) => parseInt(report.TongDoanhThu)));
  }, [reportList]);

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 3 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.secondary[800],
                      }}
                    >
                      <img src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{
                        fontSize: "2.125rem",
                        fontWeight: 500,
                        mr: 1,
                        mt: 1.75,
                        mb: 0.75,
                      }}
                    >
                      {`${numberWithCommas(totalRevenue)} VNĐ`}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Avatar
                      sx={{
                        cursor: "pointer",
                        ...theme.typography.smallAvatar,
                        backgroundColor: theme.palette.secondary[200],
                        color: theme.palette.secondary.dark,
                      }}
                    >
                      <ArrowUpwardIcon
                        fontSize="inherit"
                        sx={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                      />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: theme.palette.secondary[200],
                  }}
                >
                  Tổng doanh thu
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalRevenueCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalRevenueCard;
