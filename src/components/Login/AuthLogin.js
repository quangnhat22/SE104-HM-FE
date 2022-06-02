import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import AnimateButton from "../../ui-component/extended/AnimateButton";
import * as SagaActionTypes from "../../redux/constants/constantSaga";

const Login = ({ handleOpenReset }) => {
  const theme = useTheme();
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    dispatch({
      type: SagaActionTypes.POST_USER_LOGIN_SAGA,
      userLogin: values,
    });
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email không hợp lệ")
            .max(255)
            .required("Vui lòng nhập email"),
          password: Yup.string().max(255).required("Vui lòng nhập mật khẩu"),
        })}
        onSubmit={(values) => handleSubmit(values)}
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
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">
                Email
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText
                  error
                >
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={Boolean(touched.password && errors.password)}
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-password-login">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-password-login"
                >
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <Stack direction="row" alignItems="center" justifyContent="right">
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ textDecoration: "none", cursor: "pointer" }}
                onClick={handleOpenReset}
              >
                Quên mật khẩu?
              </Typography>
            </Stack>
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  Đăng nhập
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
