import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField
} from "@mui/material";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import * as SagaActionTypes from "../../redux/constants/constantSaga";

export default function AccountModal({
  handleClose,
  type,
  account,
  userGroupIndex,
  userGroupList,
}) {
  const dispatch = useDispatch();
  const handleNewAccount = (values) => {
    dispatch({
      type: SagaActionTypes.ADD_NEW_USER_SAGA,
      user: values,
    });
    handleClose();
  };

  const handleModifyAccount = (values) => {
    dispatch({
      type: SagaActionTypes.EDIT_USER_SAGA,
      user: values,
    });
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Tạo tài khoản" : "Chỉnh sửa tài khoản"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            MaNguoiDung: account ? account.MaNguoiDung : "",
            HoTen: account ? account.HoTen : "",
            Email: account ? account.Email : "",
            MaNhom: account
              ? account.UserGroup.MaNhom
              : userGroupList[1].MaNhom,
            TenNhom: account
              ? account.UserGroup.TenNhom
              : userGroupList[1].TenNhom,
          }}
          validationSchema={Yup.object().shape({
            HoTen: Yup.string().required("Vui lòng nhập họ và tên"),
            Email: Yup.string().required("Vui lòng nhập email"),
          })}
          onSubmit={(values) => {
            if (type === "new") handleNewAccount(values);
            else handleModifyAccount(values);
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
                error={Boolean(touched.HoTen && errors.HoTen)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Họ và tên"
                  value={values.HoTen}
                  name="HoTen"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.HoTen && errors.HoTen && (
                  <FormHelperText error>{errors.HoTen}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                error={Boolean(touched.Email && errors.Email)}
                sx={{ mb: 3 }}
              >
                <TextField
                  label="Email"
                  value={values.Email}
                  name="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.Email && errors.Email && (
                  <FormHelperText error>{errors.Email}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  name="TenNhom"
                  options={userGroupList}
                  defaultValue={
                    account ? userGroupList[userGroupIndex] : userGroupList[0]
                  }
                  disabled
                  disableClearable
                  getOptionLabel={(option) => option.TenNhom}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => {
                    setFieldValue("TenNhom", value.TenNhom);
                    setFieldValue("MaNhom", value.MaNhom);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vai trò"
                      value={values.TenNhom}
                    />
                  )}
                />
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
                  Huỷ
                </Button>
                <Button type="submit" variant="outlined">
                  {type === "new" ? "Tạo" : "Xác nhận"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
