import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputAdornment, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function NewRoomTypeModal({ handleClose }) {
    return (
        <Dialog open="true" sx={{ p: 4 }}>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm loại phòng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        roomType: '',
                        roomPrice: '1',
                        submit: null
                    }}
                    validationSchema={Yup.object().shape({
                        roomType: Yup.string().required('Vui lòng nhập tên loại phòng'),
                        roomPrice: Yup.number()
                            .typeError('Số không hợp lệ')
                            .min(1, 'Giá trị không thể nhỏ hơn 1')
                            .required('Vui lòng nhập đơn giá')
                    })}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth error={Boolean(touched.roomType && errors.roomType)} sx={{ mb: 3, mt: 1 }}>
                                <TextField
                                    label="Tên loại phòng"
                                    value={values.roomType}
                                    name="roomType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                />
                                {touched.roomType && errors.roomType && <FormHelperText error>{errors.roomType}</FormHelperText>}
                            </FormControl>

                            <FormControl fullWidth sx={{ mb: 3 }} error={Boolean(touched.roomPrice && errors.roomPrice)}>
                                <TextField
                                    label="Đơn giá"
                                    value={values.roomPrice}
                                    name="roomPrice"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">VNĐ</InputAdornment>
                                    }}
                                />
                                {touched.roomPrice && errors.roomPrice && <FormHelperText error>{errors.roomPrice}</FormHelperText>}
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
