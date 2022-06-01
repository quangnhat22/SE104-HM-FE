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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableCustomer from "../components/Table/TableCustomer";
import CustomerModal from "../components/Booking/CustomerModal";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import * as ActionTypes from "../redux/constants/constant";
import numberWithCommas from "../utils/number-with-commas";
const _ = require("lodash");

export default function Booking() {
  let navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const {
    DonGia,
    MaPhong,
    SoKhachToiDa,
    SoKhachKhongPhuThu,
    surchargeList,
    typeCustomerList,
  } = location.state;
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingCustomer, setModifyingCustomer] = useState();
  const [modifyingCustomerType, setModifyingCustomerType] = useState(0);
  const [rateTotal, setRateToTal] = useState(1);
  const { customerList } = useSelector((state) => state.CustomerReducerLocal);
  const [totalPricePerDay, setTotalPricePerDay] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: ActionTypes.REMOVE_ALL_CLIENT_RENT_VOUCHER
    })
    setTotalPricePerDay(0);
  }, []);

  useEffect(() => {
    if (customerList.length === 0) {
      setTotalPricePerDay(0);
    } else {
      //type customer to object
      let typeCustomerObject = hashTypeCustomer(typeCustomerList);
      let arrayCustomerList = _.uniqBy(customerList, "MaLoaiKhach");
      let rateTypeCustomer = 1;
      _.forEach(arrayCustomerList, (element) => {
        rateTypeCustomer *= typeCustomerObject[element.TenLoaiKhach];
      });
      if (customerList.length <= SoKhachKhongPhuThu) {
        setRateToTal(rateTypeCustomer)
        setTotalPricePerDay(DonGia * rateTypeCustomer);
      } else {
        //tinh toan he so phu thu khi length vuot qua
        let heSoPhuThu = _.find(surchargeList, (element) => {
          return element.SoKhach === customerList.length;
        })?.TiLePhuThu;
        if (heSoPhuThu === undefined) {
          heSoPhuThu = 1;
        }
        setRateToTal(rateTypeCustomer * (heSoPhuThu+1))
        setTotalPricePerDay(DonGia * rateTypeCustomer * (heSoPhuThu+1));
      }
    }
  }, [customerList]);

  function hashTypeCustomer(typeCustomers) {
    return _.chain(typeCustomers)
      .keyBy("TenLoaiKhach")
      .mapValues("HeSoPhuThu")
      .value();
  }

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewCustomer = () => {
    if (customerList.length >= SoKhachToiDa) {
      toast.warning("Không thể thêm khách mới vì phòng đã đầy!");
    } else {
      setOpenNew(true);
    }
  };

  const handleModifyCustomer = (customer) => {
    let index = typeCustomerList.findIndex(
      (type) => type.MaLoaiKhach == customer.MaLoaiKhach
    );
    setModifyingCustomerType(index);
    setModifyingCustomer(customer);
    setOpenModify(true);
  };

  const handleDeleteCustomer = (customer) => {
    dispatch({
      type: ActionTypes.REMOVE_CLIENT_RENT_VOUCER,
      customer: customer,
    });
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
          if (customerList.length > 0) {
            const customers = _.map(customerList, (customer) => {
              return {
                CMND: customer.CMND,
                MaLoaiKhach: customer.MaLoaiKhach,
                DiaChi: customer.DiaChi,
                TenKhachHang: customer.TenKhachHang,
              };
            });
            const newBookingValue = {
              MaPhong: values.MaPhong,
              NgayBatDauThue: values.startDate,
              CacKhachHang: customers,
              DonGiaThueTrenNgay: Math.round(totalPricePerDay * 100) / 100,
            };
            dispatch({
              type: SagaActionTypes.ADD_RENT_VOUCHER_SAGA,
              rentVoucher: newBookingValue,
            });
            setTotalPricePerDay(0);
            setRateToTal(1);
            dispatch({
              type: ActionTypes.REMOVE_ALL_CLIENT_RENT_VOUCHER
            })
            navigate("/room", { replace: true });
          } else {
            toast.error(
              "Vui lòng thêm khách hàng trước khi tạo phiếu thuê phòng mới."
            );
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
        <Typography variant="h5" gutterBottom sx={{ mt: 2}} color="secondary">
          {(customerList.length !== 0) ? `Đơn giá: ${numberWithCommas(Math.round(DonGia * 100) / 100)}` : `Đơn giá: ${0}`}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Typography variant="h5" gutterBottom sx={{ mt: 2}} color="secondary">
          {`Hệ số phụ thu: ${rateTotal}`}
        </Typography>
      </Box>
      
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 2 }} color="secondary">
          {`Tổng tiền: ${numberWithCommas(
            Math.round(totalPricePerDay * 100) / 100
          )} VNĐ`}
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
          indexType={modifyingCustomerType}
        />
      )}
    </Paper>
  );
}
