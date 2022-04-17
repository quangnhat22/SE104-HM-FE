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

const roomTypes = [
  { id: 1, type: "A", price: 150000 },
  { id: 2, type: "B", price: 170000 },
  { id: 3, type: "C", price: 200000 },
];

export default function RoomModal({ handleClose, type, room }) {
  const handleNewRoom = (values) => {
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
            roomName: room ? room.room : "",
            roomType: room ? room.type : roomTypes[0].type,
            roomPrice: room ? room.price : roomTypes[0].price,
            note: room ? room.note : "",
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            roomName: Yup.string().required("Vui lòng nhập tên phòng"),
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
                error={Boolean(touched.roomName && errors.roomName)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên phòng"
                  value={values.roomName}
                  name="roomName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.roomName && errors.roomName && (
                  <FormHelperText error>{errors.roomName}</FormHelperText>
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
