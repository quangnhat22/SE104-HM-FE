import {
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
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as SagaActionTypes from "../../redux/constants/constantSaga";

export default function CustomerTypeModal({ type, customerType, handleClose }) {
  console.log(customerType);
  const dispatch = useDispatch();
  const handleNewCustomerType = (values) => {
    dispatch({ type: SagaActionTypes.ADD_TYPE_CUSTOMER_SAGA, typeCustomer: values });
    handleClose();
  };

  const handleModifyCustomerType = (values) => {
    dispatch({ type: SagaActionTypes.EDIT_TYPE_CUSTOMER_SAGA, typeCustomer: values });
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Thêm loại khách hàng" : "Chỉnh sửa loại khách hàng"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            MaLoaiKhach: customerType ? customerType.MaLoaiKhach : "",
            TenLoaiKhach: customerType ? customerType.TenLoaiKhach : "",
            HeSoPhuThu: customerType ? customerType.HeSoPhuThu : 1,
          }}
          validationSchema={Yup.object().shape({
            TenLoaiKhach: Yup.string().required(
              "Vui lòng nhập tên loại khách hàng"
            ),
            HeSoPhuThu: Yup.number()
              .typeError("Số không hợp lệ, nếu là số thập phân vui lòng dùng dấu \".\" thay cho dấu \",\"")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .required("Vui lòng nhập hệ số phụ thu"),
          })}
          onSubmit={async (values) => {
            if (type === "new") handleNewCustomerType(values);
            else handleModifyCustomerType(values);
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
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.TenLoaiKhach && errors.TenLoaiKhach)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên loại khách hàng"
                  value={values.TenLoaiKhach}
                  name="TenLoaiKhach"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.TenLoaiKhach && errors.TenLoaiKhach && (
                  <FormHelperText error>{errors.TenLoaiKhach}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(
                  touched.HeSoPhuThu && errors.HeSoPhuThu
                )}
              >
                <TextField
                  label="Hệ số phụ thu"
                  value={values.HeSoPhuThu}
                  name="HeSoPhuThu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.HeSoPhuThu && errors.HeSoPhuThu && (
                  <FormHelperText error>
                    {errors.HeSoPhuThu}
                  </FormHelperText>
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
