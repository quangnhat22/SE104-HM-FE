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
import { useDispatch } from "react-redux";
import * as ActionTypes from "../../redux/constants/constant";
import * as SagaActionTypes from "../../redux/constants/constantSaga"

const roomTypes = [
  { id: 1, type: "A", price: 150000 },
  { id: 2, type: "B", price: 170000 },
  { id: 3, type: "C", price: 200000 },
];

export default function RoomModal({ handleClose, type, room }) {
  const dispatch = useDispatch();

  const handleNewRoom = (values) => {
    console.log(values);
    //dispatch({type: SagaActionTypes.ADD_NEW_ROOM_SAGA})
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
            TenPhong: room ? room.room : "",
            roomType: room ? room.type : roomTypes[0].type,
            roomPrice: room ? room.price : roomTypes[0].price,
            note: room ? room.note : "",
            submit: null,
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
                  name="roomType"
                  options={roomTypes}
                  defaultValue={roomTypes[0]}
                  disableClearable
                  getOptionLabel={(option) => option.type}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => {
                    setFieldValue("roomPrice", value.price);
                    setFieldValue("roomType", value.type);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại phòng"
                      value={values.roomType}
                    />
                  )}
                />
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Giá"
                  value={numberWithCommas(values.roomPrice)}
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
                  value={values.note}
                  name="note"
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
