import { Box, Button, FormControl, FormHelperText, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconPlus } from '@tabler/icons';
import CustomerTypeList from './CustomerTypeList';
import NewCustomerTypeModal from './NewCustomerTypeModal';
import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const columns = [
    { id: 'number', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'customerType', label: 'Loại khách hàng', minWidth: 150 },
    {
        id: 'more',
        label: '',
        minWidth: 170
    }
];

function createData(id, number, customerType) {
    return { id, number, customerType };
}

const typeList = [createData(1, 1, 'Loại A', 3287263), createData(2, 2, 'Loại B', 9596961)];

export default function CustomerSettingsForm() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Formik
                initialValues={{
                    maxCustomerInRoom: 1,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    maxCustomerInRoom: Yup.number()
                        .typeError('Số không hợp lệ')
                        .min(1, 'Gía trị không thể nhỏ hơn 1')
                        .required('Vui lòng nhập số lượng khách tối đa')
                })}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl
                                    fullWidth
                                    error={Boolean(touched.maxCustomerInRoom && errors.maxCustomerInRoom)}
                                    sx={{ mb: 3 }}
                                >
                                    <TextField
                                        label="Số lượng khách tối đa trong phòng"
                                        value={values.maxCustomerInRoom}
                                        name="maxCustomerInRoom"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                    />
                                    {touched.maxCustomerInRoom && errors.maxCustomerInRoom && (
                                        <FormHelperText error>{errors.maxCustomerInRoom}</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>

            <CustomerTypeList columns={columns} data={typeList} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ mt: 4 }} startIcon={<IconPlus />} onClick={handleOpen}>
                    Thêm loại khách hàng
                </Button>
            </Box>

            {open && <NewCustomerTypeModal handleClose={handleClose} />}

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" sx={{ mt: 4 }}>
                    Xác nhận
                </Button>
            </Box>
        </>
    );
}
