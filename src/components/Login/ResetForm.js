import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  TextField,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

export default function ResetForm({ handleClose, handleSubmit, handleBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        ResetCode: "",
        MatKhau: "",
      }}
      validationSchema={Yup.object().shape({
        ResetCode: Yup.string().required("Vui lòng nhập mã xác nhận"),
        MatKhau: Yup.string().max(255).required("Vui lòng nhập mật khẩu mới"),
      })}
      onSubmit={(values) =>
        handleSubmit({ ResetCode: values.ResetCode, MatKhau: values.MatKhau })
      }
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
            error={Boolean(touched.ResetCode && errors.ResetCode)}
            sx={{ mb: 3, mt: 1 }}
          >
            <TextField
              label="Mã xác nhận"
              value={values.ResetCode}
              name="ResetCode"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.ResetCode && errors.ResetCode && (
              <FormHelperText error>{errors.ResetCode}</FormHelperText>
            )}
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            error={Boolean(touched.MatKhau && errors.MatKhau)}
            sx={{ mb: 3, mt: 1 }}
          >
            <InputLabel htmlFor="password-field">Mật khẩu</InputLabel>
            <OutlinedInput
              id="password-field"
              type={showPassword ? "text" : "password"}
              value={values.MatKhau}
              name="MatKhau"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật khẩu"
            />
            {touched.MatKhau && errors.MatKhau && (
              <FormHelperText error>{errors.MatKhau}</FormHelperText>
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
