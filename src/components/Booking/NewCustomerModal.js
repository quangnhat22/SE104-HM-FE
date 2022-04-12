import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const customerTypes = [
    { id: 1, type: 'Nội địa' },
    { id: 2, type: 'Nước ngoài' }
];

export default function NewCustomerModal({ handleClose }) {
    return (
        <Dialog open="true" sx={{ p: 4 }}>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm khách hàng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        customerName: '',
                        customerType: customerTypes[0].type
                    }}
                    validationSchema={Yup.object().shape({
                        customerName: Yup.string().required('Vui lòng nhập tên khách hàng'),
                        idNumber: Yup.string().required('Vui lòng nhập CMND/CCCD'),
                        address: Yup.string().required('Vui lòng nhập địa chỉ')
                    })}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.customerName && errors.customerName)} sx={{ mb: 3, mt: 1 }}>
                                <TextField
                                    label="Tên khách hàng"
                                    value={values.customerName}
                                    name="customerName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.customerName && errors.customerName && (
                                    <FormHelperText error>{errors.customerName}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 3 }}>
                                <Autocomplete
                                    name="customerType"
                                    options={customerTypes}
                                    defaultValue={customerTypes[0]}
                                    disableClearable
                                    getOptionLabel={(option) => option.type}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    onChange={(event, value) => {
                                        setFieldValue('customerType', value.type);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Loại khách" value={values.customerType} />}
                                />
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(touched.idNumber && errors.idNumber)}>
                                <TextField
                                    label="CMND/CCCD"
                                    value={values.idNumber}
                                    name="idNumber"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.idNumber && errors.idNumber && <FormHelperText error>{errors.idNumber}</FormHelperText>}
                            </FormControl>
                            <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(touched.address && errors.address)}>
                                <TextField
                                    label="Địa chỉ"
                                    value={values.address}
                                    name="address"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.address && errors.address && <FormHelperText error>{errors.address}</FormHelperText>}
                            </FormControl>

                            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
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
