import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import RoomBookingStatusCard from "../components/Dashboard/RoomBookingStatusCard";
import TotalBookingCard from "../components/Dashboard/TotalBookingCard";
import TotalRevenueCard from "../components/Dashboard/TotalRevenueCard";
import TotalRevenueChart from "../components/Dashboard/TotalRevenueChart";

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
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
              <Grid item xs={12}>
                <RoomBookingStatusCard isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <TotalRevenueCard isLoading={isLoading} />
              </Grid>
              <Grid item xs={12} md={6} lg={12}>
                <TotalBookingCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
