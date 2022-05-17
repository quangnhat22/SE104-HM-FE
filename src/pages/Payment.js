import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { IconPlus } from "@tabler/icons";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AddRoomModal from "../components/Payment/AddRoomModal";
import TableRoomPayment from "../components/Table/TableRoomPayment";
import numberWithCommas from "../utils/number-with-commas";

function createData(
  id,
  number,
  TenPhong,
  numberOfRentalDays,
  price,
  totalPrice
) {
  return { id, number, TenPhong, numberOfRentalDays, price, totalPrice };
}

const customerList = [
  createData(1, 1, "India", 1, 100000, 100000),
  createData(2, 2, "China", 2, 200000, 400000),
];

export default function Payment() {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDeleteRoom = (room) => {
    toast.success(`Xóa phòng ${room.TenPhong} thành công!`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Thanh toán
      </Typography>
      <Formik
        initialValues={{
          customerName: "",
          address: "",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          customerName: Yup.string().required("Vui lòng nhập tên khách hàng"),
          address: Yup.string().required("Vui lòng nhập địa chỉ"),
        })}
        onSubmit={async (values) => {
          console.log(values);
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
          <form noValidate onSubmit={handleSubmit} id="booking-form">
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.customerName && errors.customerName)}
                  sx={{ mb: 3 }}
                >
                  <TextField
                    label="Khách hàng / Cơ quan"
                    value={values.customerName}
                    name="customerName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.customerName && errors.customerName && (
                    <FormHelperText error>{errors.customerName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.address && errors.address)}
                  sx={{ mb: 3 }}
                >
                  <TextField
                    label="Địa chỉ"
                    value={values.address}
                    name="address"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.address && errors.address && (
                    <FormHelperText error>{errors.address}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <TableRoomPayment data={customerList} handleDelete={handleDeleteRoom} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button sx={{ mt: 4 }} startIcon={<IconPlus />} onClick={handleOpen}>
          Thêm phòng
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 2 }} color="secondary">
          {`${numberWithCommas(500000)} VNĐ`}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outlined"
          form="booking-form"
          type="submit"
          sx={{ mt: 4 }}
        >
          Xác nhận
        </Button>
      </Box>

      {open && <AddRoomModal handleClose={handleClose} />}
    </Paper>
  );
}
