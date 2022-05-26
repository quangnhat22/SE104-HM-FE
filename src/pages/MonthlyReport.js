import { Paper, TextField, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import TableRoomRevenue from "../components/Table/TableRoomRevenue";

export default function MonthlyReport() {
  const { month, year } = useParams();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = useState(new Date());
  const { report } = useSelector((state) => state.ReportReducer);
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   dispatch({
  //     type: SagaActionTypes.FETCH_REPORT_SAGA,
  //     thang: 2,
  //     nam: 2022
  //   });
  // }, [])
  console.log(report);
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Báo cáo tháng
      </Typography>
      {/* date picker with month and year */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["year", "month"]}
          label="Year and Month"
          minDate={new Date("2000-01-01")}
          maxDate={new Date("2100-12-01")}
          value={value}
          onChange={(newValue) => {
            let month = newValue.getUTCMonth() + 1;
            let year = newValue.getUTCFullYear();
            setValue(newValue);
            dispatch({
              type: SagaActionTypes.FETCH_REPORT_SAGA,
              thang: month,
              nam: year,
            });
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      {report ? <TableRoomRevenue data={report.ReportDetails} /> : ""}
    </Paper>
  );
}
