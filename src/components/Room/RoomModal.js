import {
  Autocomplete,
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
import numberWithCommas from "../../utils/number-with-commas";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import * as ActionTypes from "../../redux/constants/constant";
import * as SagaActionTypes from "../../redux/constants/constantSaga";
import { useEffect } from "react";

// const roomTypes = [
//   { id: 1, type: "A", price: 150000 },
//   { id: 2, type: "B", price: 170000 },
//   { id: 3, type: "C", price: 200000 },
// ];

export default function RoomModal({ handleClose, type, room, typeRooms }) {
  const dispatch = useDispatch();
  console.log(room);

  const handleNewRoom = (values) => {
    let newRoom = {
      TenPhong: values.TenPhong,
      MaLoaiPhong: values.MaLoaiPhong,
      MaTinhTrang: "",
      GhiChu: values.GhiChu,
    };
    dispatch({
      type: SagaActionTypes.ADD_NEW_ROOM_SAGA,
      room: values,
    });
    toast.success("Thêm phòng thành công");
    handleClose();
  };

  const handleModifyRoom = (values) => {
    console.log(toast);
    toast.success("Chỉnh sửa phòng thành công");
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Thêm phòng" : "Chỉnh sửa phòng"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            TenPhong: "",
            MaLoaiPhong: typeRooms[0].MaLoaiPhong,
            TenLoaiPhong: typeRooms[0].TenLoaiPhong,
            DonGia: typeRooms[0].DonGia,
            GhiChu: "",
            // submit: null,
          }}
          validationSchema={Yup.object().shape({
            TenPhong: Yup.string().required("Vui lòng nhập tên phòng"),
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
            setFieldValue,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                error={Boolean(touched.TenPhong && errors.TenPhong)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên phòng"
                  value={values.TenPhong}
                  name="TenPhong"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.TenPhong && errors.TenPhong && (
                  <FormHelperText error>{errors.TenPhong}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  name="TenLoaiPhong"
                  options={typeRooms}
                  defaultValue={typeRooms[0]}
                  disableClearable
                  getOptionLabel={(option) => option.TenLoaiPhong}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => {
                    console.log(value);
                    setFieldValue("DonGia", value.DonGia);
                    setFieldValue("TenLoaiPhong", value.TenLoaiPhong);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại phòng"
                      value={values.TenLoaiPhong}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Giá"
                  value={numberWithCommas(values.DonGia)}
                  name="roomPrice"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">VNĐ</InputAdornment>
                    ),
                  }}
                  disabled
                />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Ghi chú"
                  value={values.GhiChu}
                  name="GhiChu"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
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
