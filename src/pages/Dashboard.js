import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import RoomBookingStatusCard from "../components/Dashboard/RoomBookingStatusCard";
import TotalRevenueCard from "../components/Dashboard/TotalRevenueCard";
import TotalRevenueChart from "../components/Dashboard/TotalRevenueChart";
import * as ActionSagaTypes from "../redux/constants/constantSaga";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    dispatch({ type: ActionSagaTypes.FETCH_LIST_ROOM_SAGA });
    dispatch({ type: ActionSagaTypes.FETCH_REPORT_IN_YEAR_SAGA });
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <TotalRevenueChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={12}>
                <TotalRevenueCard isLoading={isLoading} />
              </Grid>
              <Grid item xs={12}>
                <RoomBookingStatusCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
