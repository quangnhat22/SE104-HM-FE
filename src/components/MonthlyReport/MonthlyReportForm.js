import { Autocomplete, FormControl, Grid, TextField, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import RoomRevenueList from './RoomRevenueList';

const columns = [
    { id: 'number', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'roomType', label: 'Loại phòng', minWidth: 150 },
    {
        id: 'revenue',
        label: 'Doanh thu',
        minWidth: 170
    },
    {
        id: 'turnoverRate',
        label: 'Tỷ lệ',
        minWidth: 170
    }
];

function createData(id, number, roomType, revenue, turnoverRate) {
    return { id, number, roomType, revenue, turnoverRate };
}

const monthList = [
    { id: 1, month: '1/2022' },
    { id: 2, month: '2/2022' }
];

const roomTypeList = [createData(1, 1, 'Loại A', 1000000, 50), createData(2, 2, 'Loại B', 1000000, 50)];
export default function MonthlyReportForm() {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <Formik
                initialValues={{
                    month: monthList[0].month,
                    submit: null
                }}
                onSubmit={async (values) => {
                    console.log(values);
                }}
            >
                {({ setFieldValue, handleSubmit, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <Autocomplete
                                        name="month"
                                        options={monthList}
                                        defaultValue={monthList[0]}
                                        disableClearable
                                        getOptionLabel={(option) => option.month}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        onChange={(event, value) => {
                                            setFieldValue('month', value.month);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Chọn tháng" value={values.month} />}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>

            <RoomRevenueList columns={columns} data={roomTypeList} />
        </>
    );
}
