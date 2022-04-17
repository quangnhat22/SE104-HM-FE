import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SurchargeRateSetting() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Cài đặt tỷ lệ phụ thu
      </Typography>

      <>
        <Formik
          initialValues={{
            surchargeRate: 1,
            maxCustomerInRoom: 1,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            surchargeRate: Yup.number()
              .typeError("Số không hợp lệ")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .max(100, "Giá trị không thể lớn hơn 100")
              .required("Vui lòng nhập tỷ lệ phụ thu"),
            maxCustomerInRoom: Yup.number()
              .typeError("Số không hợp lệ")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .required("Vui lòng nhập số lượng khách tối đa"),
          })}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form id="surchargeRateForm" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={matchDownSM ? 0 : 2}>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.maxCustomerInRoom && errors.maxCustomerInRoom
                    )}
                    sx={{ mb: 3 }}
                  >
                    <TextField
                      label="Số lượng khách tối đa trong phòng"
                      value={values.maxCustomerInRoom}
                      name="maxCustomerInRoom"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.maxCustomerInRoom && errors.maxCustomerInRoom && (
                      <FormHelperText error>
                        {errors.maxCustomerInRoom}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    error={Boolean(
                      touched.surchargeRate && errors.surchargeRate
                    )}
                    sx={{ mb: 3 }}
                  >
                    <TextField
                      label="Tỷ lệ phụ thu"
                      value={values.surchargeRate}
                      name="surchargeRate"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                      }}
                    />
                    {touched.surchargeRate && errors.surchargeRate && (
                      <FormHelperText error>
                        {errors.surchargeRate}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>

        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button type="submit" form="surchargeRateForm" variant="outlined" sx={{ mt: 2 }}>
            Xác nhận
          </Button>
        </Box>
      </>
    </Paper>
  );
}
