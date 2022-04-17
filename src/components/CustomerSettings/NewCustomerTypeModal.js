import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function NewCustomerTypeModal({ handleClose }) {
    return (
        <Dialog open="true" sx={{ p: 4 }}>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm loại khách hàng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        roomType: '',
                        roomPrice: '0',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        roomType: Yup.string().required('Vui lòng nhập tên loại khách hàng')
                    })}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.customerType && errors.roomType)} sx={{ mb: 3, mt: 1 }}>
                                <TextField
                                    label="Tên loại khách hàng"
                                    value={values.customerType}
                                    name="customerType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.customerType && errors.customerType && (
                                    <FormHelperText error>{errors.customerType}</FormHelperText>
                                )}
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
