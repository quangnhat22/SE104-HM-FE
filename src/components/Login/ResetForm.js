import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

export default function ResetForm({ handleClose, handleSubmit, handleBack }) {
  return (
    <Formik
      initialValues={{
        resetCode: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        resetCode: Yup.string().required("Vui lòng nhập mã xác nhận"),
        password: Yup.string().max(255).required("Vui lòng nhập mật khẩu mới"),
      })}
      onSubmit={handleSubmit}
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
            error={Boolean(touched.resetCode && errors.resetCode)}
            sx={{ mb: 3, mt: 1 }}
          >
            <TextField
              label="Mã xác nhận"
              value={values.resetCode}
              name="resetCode"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.resetCode && errors.resetCode && (
              <FormHelperText error>{errors.resetCode}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ mb: 3, mt: 1 }}
          >
            <TextField
              label="Mật khẩu mới"
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.password && errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Quay lại
            </Button>
            <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
              Huỷ
            </Button>
            <Button type="submit" variant="outlined">
              Xác nhận
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
