import {
  Autocomplete,
  FormControl,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import TableRoomRevenue from "../components/Table/TableRoomRevenue";

function createData(id, number, roomType, revenue, turnoverRate) {
  return { id, number, roomType, revenue, turnoverRate };
}

const monthList = [
  { id: 1, month: "1/2022" },
  { id: 2, month: "2/2022" },
];

const roomTypeList = [
  createData(1, 1, "Loại A", 1000000, 50),
  createData(2, 2, "Loại B", 1000000, 50),
];

export default function MonthlyReport() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Báo cáo tháng
      </Typography>

      <Formik
        initialValues={{
          month: monthList[0].month,
          submit: null,
        }}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        {({ setFieldValue, handleSubmit, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <Autocomplete
                    name="month"
                    options={monthList}
                    defaultValue={monthList[0]}
                    disableClearable
                    getOptionLabel={(option) => option.month}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(event, value) => {
                      setFieldValue("month", value.month);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Chọn tháng"
                        value={values.month}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      <TableRoomRevenue data={roomTypeList} />
    </Paper>
  );
}
