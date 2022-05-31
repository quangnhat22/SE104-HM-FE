import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";

export default function SendEmailForm({ handleClose, handleSubmit }) {
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email không hợp lệ")
          .max(255)
          .required("Vui lòng nhập email"),
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
            error={Boolean(touched.email && errors.email)}
            sx={{ mb: 3, mt: 1, minWidth: "300px" }}
            onSubmit={(values) => {
              handleSubmit(values.email)
            }}
          >
            <TextField
              label="Email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.email && errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
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
