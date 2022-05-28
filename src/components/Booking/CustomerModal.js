import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import * as ActionTypes from "../../redux/constants/constant";
import { useDispatch } from "react-redux";

export default function CustomerModal({ handleClose, type, customer, typeCustomer }) {
  const dispatch = useDispatch();
  const handleNewCustomer = (values) => {
    dispatch({ type: ActionTypes.GET_CLIENT_RENT_VOUCHER_LIST, customer: values});
    toast.success("Thêm khách hàng thành công");
    handleClose();
  };

  const handleModifyCustomer = (values) => {
    toast.success("Chỉnh sửa khách hàng thành công");
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Thêm khách hàng" : "Chỉnh sửa khách hàng"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            TenKhachHang: customer ? customer.TenKhachHang : "",
            TenLoaiKhach: customer ? customer.TenLoaiKhach : typeCustomer[0].TenLoaiKhach,
            MaLoaiKhach: customer ? customer.MaLoaiKhach : typeCustomer[0].MaLoaiKhach,
            CMND: customer ? customer.CMND : "",
            DiaChi: customer ? customer.DiaChi : "",
          }}
          validationSchema={Yup.object().shape({
            TenKhachHang: Yup.string().required("Vui lòng nhập tên khách hàng"),
            DiaChi: Yup.string().required("Vui lòng nhập địa chỉ"),
          })}
          onSubmit={async (values) => {
            if (type === "new") handleNewCustomer(values);
            else handleModifyCustomer(values);
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
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.TenKhachHang && errors.TenKhachHang)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên khách hàng"
                  value={values.TenKhachHang}
                  name="TenKhachHang"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.TenKhachHang && errors.TenKhachHang && (
                  <FormHelperText error>{errors.TenKhachHang}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  name="TenLoaiKhach"
                  options={typeCustomer}
                  defaultValue={typeCustomer[0]}
                  disableClearable
                  getOptionLabel={(option) => option.TenLoaiKhach}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => {
                    console.log(value);
                    setFieldValue("MaLoaiKhach", value.MaLoaiKhach);
                    setFieldValue("TenLoaiKhach", value.TenLoaiKhach);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại khách"
                      value={values.TenLoaiKhach}
                    />
                  )
                }
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
              >
                <TextField
                  label="CMND/CCCD"
                  value={values.CMND}
                  name="CMND"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.DiaChi && errors.DiaChi)}
              >
                <TextField
                  label="Địa chỉ"
                  value={values.DiaChi}
                  name="DiaChi"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.DiaChi && errors.DiaChi && (
                  <FormHelperText error>{errors.DiaChi}</FormHelperText>
                )}
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
                  Huỷ
                </Button>
                <Button type="submit" variant="outlined">
                  {type === "new" ? "Thêm" : "Xác nhận"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
