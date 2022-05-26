import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function SurchargeRateModal({ handleClose }) {
  const handleNewTiLePhuThu = (values) => {
    toast.success(
      `Thêm tỉ lệ phụ thu thành công với số khách ${values.SoKhach}`
    );
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>Thêm tỉ lệ phụ thu</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            SoKhach: "",
            TiLePhuThu: "",
          }}
          validationSchema={Yup.object().shape({
            SoKhach: Yup.number()
              .typeError("Số không hợp lệ")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .required("Vui lòng nhập số khách"),
            TiLePhuThu: Yup.number()
              .typeError("Số không hợp lệ")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .max(100, "Giá trị không thể lớn hơn 100")
              .required("Vui lòng nhập tỷ lệ phụ thu"),
          })}
          onSubmit={async (values) => {
            handleNewTiLePhuThu(values);
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
                error={Boolean(touched.SoKhach && errors.SoKhach)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Số khách"
                  value={values.SoKhach}
                  name="SoKhach"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.SoKhach && errors.SoKhach && (
                  <FormHelperText error>{errors.SoKhach}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.TiLePhuThu && errors.TiLePhuThu)}
              >
                <TextField
                  label="Tỉ lệ phụ thu"
                  value={values.TiLePhuThu}
                  name="TiLePhuThu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
                {touched.TiLePhuThu && errors.TiLePhuThu && (
                  <FormHelperText error>{errors.TiLePhuThu}</FormHelperText>
                )}
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button onClick={handleClose} color="error" sx={{ mr: 1 }}>
                  Huỷ
                </Button>
                <Button type="submit" variant="outlined">
                  Thêm
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
