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
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import * as SagaActionTypes from "../../redux/constants/constantSaga";

export default function RoomTypeModal({ type, roomType, handleClose }) {
  const dispatch = useDispatch();
  const handleNewRoom = (values) => {
    dispatch({ type: SagaActionTypes.ADD_TYPE_ROOM_SAGA, newTypeRoom: values });
    handleClose();
  };

  const handleModifyRoom = (values) => {
    dispatch({ type: SagaActionTypes.EDIT_TYPE_ROOM_SAGA, typeRoom: values });
    // toast.success(`Chỉnh sửa loại phòng ${values.roomType} thành công`);
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
            MaLoaiPhong: roomType ? roomType.MaLoaiPhong : "",
            TenLoaiPhong: roomType ? roomType.TenLoaiPhong : "",
            DonGia: roomType ? roomType.DonGia : 1,
          }}
          validationSchema={Yup.object().shape({
            TenLoaiPhong: Yup.string().required("Vui lòng nhập tên loại phòng"),
            DonGia: Yup.number()
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
                error={Boolean(touched.TenLoaiPhong && errors.TenLoaiPhong)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên loại phòng"
                  value={values.TenLoaiPhong}
                  name="TenLoaiPhong"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.TenLoaiPhong && errors.TenLoaiPhong && (
                  <FormHelperText error>{errors.TenLoaiPhong}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.DonGia && errors.DonGia)}
              >
                <TextField
                  label="Đơn giá"
                  value={values.DonGia}
                  name="DonGia"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VNĐ</InputAdornment>
                    ),
                  }}
                />
                {touched.DonGia && errors.DonGia && (
                  <FormHelperText error>{errors.DonGia}</FormHelperText>
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
