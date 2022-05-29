import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
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
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableCustomer from "../components/Table/TableCustomer";
import CustomerModal from "../components/Booking/CustomerModal";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import numberWithCommas from "../utils/number-with-commas";
const _ = require("lodash");

export default function Booking() {
  const { id } = useParams();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const { DonGia, MaPhong } = location.state;
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingCustomer, setModifyingCustomer] = useState();
  const { customerList } = useSelector((state) => state.CustomerReducerLocal);
  const { typeCustomerList } = useSelector(
    (state) => state.TypeCustomerReducer
  );
  const [totalPricePerDay, setTotalPricePerDay] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.FETCH_LIST_TYPE_CUSTOMER_SAGA });
    setTotalPricePerDay(0);
  }, []);

  useEffect(() => {
    if(customerList.length > 0) {
      setTotalPricePerDay(DonGia)
    }
    if(customerList.length > 3) {
      setTotalPricePerDay(DonGia*1.5)
    }
  }, [customerList])

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewCustomer = () => {
    setOpenNew(true);
  };

  const handleModifyCustomer = (customer) => {
    setModifyingCustomer(customer);
    setOpenModify(true);
  };

  const handleDeleteCustomer = (customer) => {
    toast.success("Xóa khách hàng thành công!");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Phiếu thuê phòng: {id}
      </Typography>
      <Formik
        initialValues={{
          MaPhong: MaPhong,
          TenPhong: id,
          startDate: new Date().toISOString().slice(0, 10),
        }}
        onSubmit={async (values) => {
          if(customerList.length > 0) {
            const customers = _.map(customerList, customer => {
              return {
                CMND: customer.CMND,
                MaLoaiKhach: customer.MaLoaiKhach,
                DiaChi: customer.DiaChi,
                TenKhachHang: customer.TenKhachHang
              }
            })
            const newBookingValue = {
              MaPhong: values.MaPhong,
              NgayBatDauThue: values.startDate,
              CacKhachHang: customers,
              DonGiaThueTrenNgay: Math.round(totalPricePerDay * 100) / 100
            }
            dispatch({type: SagaActionTypes.ADD_RENT_VOUCHER_SAGA, rentVoucher: newBookingValue});
          }
          else {
            toast.error("Vui lòng thêm khách hàng trước khi tạo phiếu thuê phòng mới.");
          }
          
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit} id="booking-form">
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.TenPhong && errors.TenPhong)}
                  sx={{ mb: 3 }}
                >
                  <TextField
                    label="Tên phòng"
                    value={values.TenPhong}
                    name="TenPhong"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled
                  />
                  {touched.TenPhong && errors.TenPhong && (
                    <FormHelperText error>{errors.TenPhong}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label="Ngày bắt đầu thuê"
                      inputFormat="DD/MM/YYYY"
                      showToolbar={false}
                      value={values.startDate}
                      name="startDate"
                      onChange={(value) => {
                        setFieldValue("startDate", value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <TableCustomer
        data={customerList}
        handleModify={handleModifyCustomer}
        handleDelete={handleDeleteCustomer}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 4 }}
          startIcon={<IconPlus />}
          onClick={handleNewCustomer}
        >
          Thêm khách hàng
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ mt: 2 }}
                color="secondary"
              >
                {`Tổng tiền: ${numberWithCommas(Math.round(totalPricePerDay * 100) / 100)} VNĐ`}
              </Typography>
            </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          form="booking-form"
          type="submit"
          sx={{ mt: 4 }}
        >
          Xác nhận
        </Button>
      </Box>

      {openNew && (
        <CustomerModal
          typeCustomer={typeCustomerList}
          handleClose={handleClose}
          type="new"
        />
      )}
      {openModify && (
        <CustomerModal
          typeCustomer={typeCustomerList}
          handleClose={handleClose}
          type="modify"
          customer={modifyingCustomer}
        />
      )}
    </Paper>
  );
}
