import {
  Box,
  Button,
  CircularProgress,
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import * as Yup from "yup";
import SurchargeRateModal from "../components/SurchargeRate/SurchargeRateModal";
import TableSurchargeRate from "../components/Table/TableSurchargeRate";
import * as SagaActionTypes from "../redux/constants/constantSaga";

export default function SurchargeRateSetting() {
  let navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { SoKhachToiDa, SoKhachKhongPhuThu, showLoading } = useSelector(
    (state) => state.ConfigReducer
  );
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingSurchargeRate, setModifyingSurchargeRate] = useState();
  const { surchargeList } = useSelector((state) => state.SurchargeReducer);

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CONFIG_SAGA });
    dispatch({ type: SagaActionTypes.FETCH_LIST_SURCHARGE_SAGA });
  }, []);

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewRoomType = () => {
    setOpenNew(true);
  };

  const handleModify = (surchargeRate) => {
    setModifyingSurchargeRate(surchargeRate);
    setOpenModify(true);
  };

  return (
    <>
      <>
        {showLoading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "4rem",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
              <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Cài đặt số lượng khách
              </Typography>
              <>
                <Formik
                  initialValues={{
                    MaSoKhachToiDa: SoKhachToiDa.MaThamSo,
                    SoKhachToiDa: SoKhachToiDa.GiaTri,
                    MaSoKhachKhongPhuThu: SoKhachKhongPhuThu.MaThamSo,
                    SoKhachKhongPhuThu: SoKhachKhongPhuThu.GiaTri,
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
                    if (values.SoKhachToiDa >= values.SoKhachKhongPhuThu) {
                      dispatch({
                        type: SagaActionTypes.UPDATE_CONFIG_SAGA,
                        mtsSoKhachToiDa: values.MaSoKhachToiDa,
                        mtsSoKhachKhongPhuThu: values.MaSoKhachKhongPhuThu,
                        soKhachToiDa: values.SoKhachToiDa,
                        soKhachKhongPhuThu: values.SoKhachKhongPhuThu,
                      });
                    } else {
                      toast.error(
                        "Số khách tối đa phải lớn hơn hoặc bằng số khác không phụ thu"
                      );
                    }
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
                    <form
                      id="surchargeRateForm"
                      noValidate
                      onSubmit={handleSubmit}
                    >
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
                            {touched.SoKhachToiDa && errors.SoKhachToiDa && (
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
                              touched.SoKhachKhongPhuThu &&
                                errors.SoKhachKhongPhuThu
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
                          <Button
                            variant="outlined"
                            type="submit"
                            sx={{ mt: 4 }}
                          >
                            Xác nhận
                          </Button>
                        </Box>
                      </Grid>
                    </form>
                  )}
                </Formik>
              </>
            </Paper>
          </>
        )}
      </>
      <>
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "4rem",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            <Paper sx={{ width: "100%", overflow: "hidden", p: 5, mt: 3 }}>
              <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Bảng tỷ lệ phụ thu
              </Typography>

              <>
                <TableSurchargeRate
                  data={surchargeList}
                  handleModify={handleModify}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    sx={{ mt: 4 }}
                    startIcon={<IconPlus />}
                    onClick={handleNewRoomType}
                  >
                    Thêm tỉ lệ phụ thu
                  </Button>
                </Box>
                {openNew && (
                  <SurchargeRateModal
                    type="new"
                    handleClose={handleClose}
                    soKhachToiDa={SoKhachToiDa.GiaTri}
                    soKhachKhongPhuThu={SoKhachKhongPhuThu.GiaTri}
                  />
                )}
                {openModify && (
                  <SurchargeRateModal
                    type="modify"
                    handleClose={handleClose}
                    soKhachToiDa={SoKhachToiDa.GiaTri}
                    soKhachKhongPhuThu={SoKhachKhongPhuThu.GiaTri}
                    surchargeRate={modifyingSurchargeRate}
                  />
                )}
              </>
            </Paper>
          </>
        )}
      </>
    </>
  );
}
