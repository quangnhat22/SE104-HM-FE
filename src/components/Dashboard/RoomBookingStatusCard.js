import { CardContent, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import chartConfig from "../../chart-config/booking-status-chart";
import MainCard from "../../ui-component/cards/MainCard";
import SkeletonPopularCard from "../../ui-component/cards/Skeleton/PopularCard";

const RoomBookingStatusCard = ({ isLoading }) => {
  const { roomList } = useSelector((state) => state.RoomReducer);
  const [bookedRoomList, setBookedRoomList] = useState();

  useEffect(() => {
    setBookedRoomList(
      roomList.filter((room) => room.TenTinhTrang === "Phòng đang sử dụng")
    );
  }, [roomList]);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Grid
                  container
                  alignContent="center"
                  justifyContent="space-between"
                >
                  <Typography variant="h4">Tình trạng đặt phòng</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: "16px !important" }}>
                <Chart
                  series={[
                    roomList.length - bookedRoomList.length,
                    bookedRoomList.length,
                  ]}
                  {...chartConfig}
                />
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

RoomBookingStatusCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default RoomBookingStatusCard;
