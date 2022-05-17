import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { Formik } from 'formik';

const roomList = [
    { id: 1, TenPhong: 'A010' },
    { id: 2, TenPhong: 'A011' },
    { id: 3, TenPhong: 'A012' },
    { id: 4, TenPhong: 'A013' },
    { id: 5, TenPhong: 'A014' }
];

export default function AddRoomModal({ handleClose }) {
    return (
        <Dialog open="true" sx={{ p: 4 }}>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm phòng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        TenPhong: roomList[0].TenPhong
                    }}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
                                <Autocomplete
                                    name="TenPhong"
                                    options={roomList}
                                    defaultValue={roomList[0]}
                                    disableClearable
                                    getOptionLabel={(option) => option.TenPhong}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    onChange={(event, value) => {
                                        setFieldValue('TenPhong', value.TenPhong);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tên phòng" value={values.TenPhong} />}
                                />
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
