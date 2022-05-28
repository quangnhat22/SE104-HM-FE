import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SurchargeRateModal from "../components/SurchargeRate/SurchargeRateModal";
import TableSurchargeRate from "../components/Table/TableSurchargeRate";

function createData(SoKhach, TiLePhuThu) {
  return { SoKhach, TiLePhuThu };
}

const typeList = [createData(3, 25), createData(4, 15)];

export default function SurchargeRateSetting() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [openNew, setOpenNew] = useState(false);

  const handleClose = () => {
    setOpenNew(false);
  };

  const handleNewRoomType = () => {
    setOpenNew(true);
  };

  const handleDelete = (surchargeRate) => {
    toast.success(`Xóa tỉ lệ ${surchargeRate} thành công!`);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Cài đặt số lượng khách
        </Typography>
        <>
          <Formik
            initialValues={{
              SoKhachToiDa: 3,
              SoKhachKhongPhuThu: 2,
            }}
            validationSchema={Yup.object().shape({
              SoKhachToiDa: Yup.number()
                .typeError("Số không hợp lệ")
                .min(1, "Giá trị không thể nhỏ hơn 1")
                .required("Vui lòng nhập số lượng khách tối đa"),
              SoKhachKhongPhuThu: Yup.number()
                .typeError("Số không hợp lệ")
                .min(1, "Giá trị không thể nhỏ hơn 1")
                .required("Vui lòng nhập số lượng khách không phụ thu"),
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
                        touched.SoKhachToiDa && errors.SoKhachToiDa
                      )}
                    >
                      <TextField
                        label="Số lượng khách tối đa trong phòng"
                        value={values.SoKhachToiDa}
                        name="SoKhachToiDa"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.SoKhachToiDa &&
                        errors.SoKhachToiDa && (
                          <FormHelperText error>
                            {errors.SoKhachToiDa}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      fullWidth
                      error={Boolean(
                        touched.SoKhachKhongPhuThu && errors.SoKhachKhongPhuThu
                      )}
                    >
                      <TextField
                        label="Số lượng khách không phụ thu"
                        value={values.SoKhachKhongPhuThu}
                        name="SoKhachKhongPhuThu"
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.SoKhachKhongPhuThu &&
                        errors.SoKhachKhongPhuThu && (
                          <FormHelperText error>
                            {errors.SoKhachKhongPhuThu}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <Button variant="outlined" type="submit" sx={{ mt: 4 }}>
                      Xác nhận
                    </Button>
                  </Box>
                </Grid>
              </form>
            )}
          </Formik>
        </>
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 5, mt: 3 }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          Bảng tỷ lệ phụ thu
        </Typography>

        <>
          <TableSurchargeRate data={typeList} handleDelete={handleDelete} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              sx={{ mt: 4 }}
              startIcon={<IconPlus />}
              onClick={handleNewRoomType}
            >
              Thêm tỉ lệ phụ thu
            </Button>
          </Box>
          {openNew && <SurchargeRateModal handleClose={handleClose} />}
        </>
      </Paper>
    </>
  );
}
