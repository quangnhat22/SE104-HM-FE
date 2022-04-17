import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { Formik } from 'formik';

const roomList = [
    { id: 1, roomName: 'A010' },
    { id: 2, roomName: 'A011' },
    { id: 3, roomName: 'A012' },
    { id: 4, roomName: 'A013' },
    { id: 5, roomName: 'A014' }
];

export default function AddRoomModal({ handleClose }) {
    return (
        <Dialog open="true" sx={{ p: 4 }}>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm phòng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        roomName: roomList[0].roomName
                    }}
                    onSubmit={async (values) => {
                        console.log(values);
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
                                <Autocomplete
                                    name="roomName"
                                    options={roomList}
                                    defaultValue={roomList[0]}
                                    disableClearable
                                    getOptionLabel={(option) => option.roomName}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    onChange={(event, value) => {
                                        setFieldValue('roomName', value.roomName);
                                    }}
                                    renderInput={(params) => <TextField {...params} label="Tên phòng" value={values.roomName} />}
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
