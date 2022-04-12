import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { Box, Button, FormControl, FormHelperText, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconPlus } from '@tabler/icons';
import { Formik } from 'formik';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerList from './CustomerList';
import NewCustomerModal from './NewCustomerModal';

const columns = [
    { id: 'number', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'customerName', label: 'Khách hàng', minWidth: 150 },
    {
        id: 'customerType',
        label: 'Loại khách',
        minWidth: 120
    },
    {
        id: 'idNumber',
        label: 'CMND/CCCD',
        minWidth: 100
    },
    {
        id: 'address',
        label: 'Địa chỉ',
        minWidth: 170
    },
    {
        id: 'more',
        label: '',
        minWidth: 170
    }
];

function createData(id, number, customerName, customerType, idNumber, address) {
    return { id, number, customerName, customerType, idNumber, address };
}

const customerList = [createData(1, 1, 'India', 'IN', 1324171354, 3287263), createData(2, 2, 'China', 'CN', 1403500365, 9596961)];

export default function BookingForm() {
    const { id } = useParams();

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
                    roomName: id,
                    startDate: new Date().toISOString().slice(0, 10),
                    submit: null
                }}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} id="booking-form">
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={Boolean(touched.roomName && errors.roomName)} sx={{ mb: 3 }}>
                                    <TextField
                                        label="Tên phòng"
                                        value={values.roomName}
                                        name="roomName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    {touched.roomName && errors.roomName && <FormHelperText error>{errors.roomName}</FormHelperText>}
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
                                                setFieldValue('startDate', value);
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

            <CustomerList data={customerList} columns={columns} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ mt: 4 }} startIcon={<IconPlus />} onClick={handleOpen}>
                    Thêm khách hàng
                </Button>
            </Box>

            {open && <NewCustomerModal handleClose={handleClose} />}

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" form="booking-form" type="submit" sx={{ mt: 4 }}>
                    Xác nhận
                </Button>
            </Box>
        </>
    );
}
