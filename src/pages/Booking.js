import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import TableCustomer from "../components/Table/TableCustomer";
import CustomerModal from "../components/Booking/CustomerModal";

function createData(id, number, name, type, idNumber, address) {
  return { id, number, name, type, idNumber, address };
}

const customerList = [
  createData(1, 1, "India", "Nội địa", 1324171354, 3287263),
  createData(2, 2, "China", "Nước ngoài", 1403500365, 9596961),
];

export default function Booking() {
  const { id } = useParams();

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingCustomer, setModifyingCustomer] = useState();

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewCustomer = () => {
    setOpenNew(true);
  };

  const handleModifyCustomer = (customer) => {
    setModifyingCustomer(customer);
    setOpenModify(true);
  };

  const handleDeleteCustomer = (customer) => {
    toast.success("Xóa khách hàng thành công!");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Phiếu thuê phòng: {id}
      </Typography>
      <Formik
        initialValues={{
          roomName: id,
          startDate: new Date().toISOString().slice(0, 10),
          submit: null,
        }}
        onSubmit={async (values) => {
          console.log(values);
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
          <form noValidate onSubmit={handleSubmit} id="booking-form">
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.roomName && errors.roomName)}
                  sx={{ mb: 3 }}
                >
                  <TextField
                    label="Tên phòng"
                    value={values.roomName}
                    name="roomName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled
                  />
                  {touched.roomName && errors.roomName && (
                    <FormHelperText error>{errors.roomName}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={DateAdapter}>
                    <MobileDatePicker
                      label="Ngày bắt đầu thuê"
                      inputFormat="DD/MM/YYYY"
                      showToolbar={false}
                      value={values.startDate}
                      name="startDate"
                      onChange={(value) => {
                        setFieldValue("startDate", value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>

      <TableCustomer
        data={customerList}
        handleModify={handleModifyCustomer}
        handleDelete={handleDeleteCustomer}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 4 }}
          startIcon={<IconPlus />}
          onClick={handleNewCustomer}
        >
          Thêm khách hàng
        </Button>
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

      {openNew && <CustomerModal handleClose={handleClose} type="new" />}
      {openModify && (
        <CustomerModal
          handleClose={handleClose}
          type="modify"
          customer={modifyingCustomer}
        />
      )}
    </Paper>
  );
}
