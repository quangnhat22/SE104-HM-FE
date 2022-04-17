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

export default function RoomTypeModal({ type, roomType, handleClose }) {
  const handleNewRoom = (values) => {
    toast.success(`Thêm loại phòng ${values.roomType} thành công`);
    handleClose();
  };

  const handleModifyRoom = (values) => {
    toast.success(`Chỉnh sửa loại phòng ${values.roomType} thành công`);
    handleClose();
  };
  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Thêm loại phòng" : "Chỉnh sửa loại phòng"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            roomType: roomType ? roomType.roomType : "",
            roomPrice: roomType ? roomType.roomPrice : "1",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            roomType: Yup.string().required("Vui lòng nhập tên loại phòng"),
            roomPrice: Yup.number()
              .typeError("Số không hợp lệ")
              .min(1, "Giá trị không thể nhỏ hơn 1")
              .required("Vui lòng nhập đơn giá"),
          })}
          onSubmit={async (values) => {
            if (type === "new") handleNewRoom(values);
            else handleModifyRoom(values);
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
                error={Boolean(touched.roomType && errors.roomType)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên loại phòng"
                  value={values.roomType}
                  name="roomType"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.roomType && errors.roomType && (
                  <FormHelperText error>{errors.roomType}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.roomPrice && errors.roomPrice)}
              >
                <TextField
                  label="Đơn giá"
                  value={values.roomPrice}
                  name="roomPrice"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VNĐ</InputAdornment>
                    ),
                  }}
                />
                {touched.roomPrice && errors.roomPrice && (
                  <FormHelperText error>{errors.roomPrice}</FormHelperText>
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
