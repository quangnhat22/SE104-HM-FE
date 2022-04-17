import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const customerTypes = ["Nội địa", "Nước ngoài"];

export default function CustomerModal({ handleClose, type, customer }) {
  const handleNewCustomer = (values) => {
    toast.success("Thêm khách hàng thành công");
    handleClose();
  };

  const handleModifyCustomer = (values) => {
    toast.success("Chỉnh sửa khách hàng thành công");
    handleClose();
  };

  return (
    <Dialog open="true" sx={{ p: 4 }}>
      <DialogTitle sx={{ fontSize: 20 }}>
        {type === "new" ? "Thêm khách hàng" : "Chỉnh sửa khách hàng"}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: customer ? customer.name : "",
            type: customer ? customer.type : customerTypes[0],
            idNumber: customer ? customer.idNumber : "",
            address: customer ? customer.address : "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Vui lòng nhập tên khách hàng"),
            idNumber: Yup.string().required("Vui lòng nhập CMND/CCCD"),
            address: Yup.string().required("Vui lòng nhập địa chỉ"),
          })}
          onSubmit={async (values) => {
            if (type === "new") handleNewCustomer(values);
            else handleModifyCustomer(values);
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
                error={Boolean(touched.name && errors.name)}
                sx={{ mb: 3, mt: 1 }}
              >
                <TextField
                  label="Tên khách hàng"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.name && errors.name && (
                  <FormHelperText error>{errors.name}</FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <Autocomplete
                  name="type"
                  options={customerTypes}
                  defaultValue={customer ? customer.type : customerTypes[0]}
                  disableClearable
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(event, value) => {
                    setFieldValue("type", value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Loại khách"
                      value={values.type}
                    />
                  )}
                />
              </FormControl>

              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.idNumber && errors.idNumber)}
              >
                <TextField
                  label="CMND/CCCD"
                  value={values.idNumber}
                  name="idNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {touched.idNumber && errors.idNumber && (
                  <FormHelperText error>{errors.idNumber}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                fullWidth
                sx={{ mb: 3 }}
                error={Boolean(touched.address && errors.address)}
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
