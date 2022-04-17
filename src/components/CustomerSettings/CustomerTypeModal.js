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
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function CustomerTypeModal({ type, customerType, handleClose }) {
  const handleNewCustomerType = (values) => {
    toast.success(`Thêm loại khách hàng ${values.customerType} thành công`);
    handleClose();
  };

  const handleModifyCustomerType = (values) => {
    toast.success(
      `Chỉnh sửa loại khách hàng ${values.customerType} thành công`
    );
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
            customerType: customerType ? customerType.customerType : "",
            surchargeFactor: customerType ? customerType.surchargeFactor : 1,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            customerType: Yup.string().required(
              "Vui lòng nhập tên loại khách hàng"
            ),
            surchargeFactor: Yup.number()
              .typeError("Số không hợp lệ")
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
                error={Boolean(touched.customerType && errors.customerType)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên loại khách hàng"
                  value={values.customerType}
                  name="customerType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.customerType && errors.customerType && (
                  <FormHelperText error>{errors.customerType}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(
                  touched.surchargeFactor && errors.surchargeFactor
                )}
              >
                <TextField
                  label="Hệ số phụ thu"
                  value={values.surchargeFactor}
                  name="surchargeFactor"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.surchargeFactor && errors.surchargeFactor && (
                  <FormHelperText error>
                    {errors.surchargeFactor}
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
