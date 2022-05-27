import { Autocomplete, Box, Button, Dialog, DialogContent, DialogTitle, FormControl, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as ActionTypes from "../../redux/constants/constant";
import { useDispatch } from "react-redux";
import { differenceInDays } from 'date-fns';

const roomList = [
    { id: 1, TenPhong: 'A010' },
    { id: 2, TenPhong: 'A011' },
    { id: 3, TenPhong: 'A012' },
    { id: 4, TenPhong: 'A013' },
    { id: 5, TenPhong: 'A014' }
];

export default function AddRoomModal({ handleClose, rentList }) {
    const dispatch = useDispatch();
    console.log(rentList);
    return (
        <Dialog open="true" sx={{ p: 4 }} fullWidth>
            <DialogTitle sx={{ fontSize: 20 }}>Thêm phòng</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={{
                        PhieuThuePhong: rentList[0]
                    }}
                    onSubmit={async (values) => {
                        //handle distance date
                        let date = new Date(values.PhieuThuePhong.NgayBatDauThue);
                        let currentDate = Date.now();
                        const distanceDate = differenceInDays(currentDate, date);

                        let submitValue = {
                            MaPhong: values.PhieuThuePhong.MaPhong,
                            TenPhong: values.PhieuThuePhong.TenPhong,
                            MaPhieuThuePhong: values.PhieuThuePhong.MaPhieuThuePhong,
                            SoNgayThue: distanceDate,
                            DonGia: values.PhieuThuePhong.DonGiaThueTrenNgay,
                            ThanhTien: Math.round(distanceDate * values.PhieuThuePhong.DonGiaThueTrenNgay * 100)/100
                        }
                        dispatch({type: ActionTypes.ADD_ROOM_INVOICE_LOCAL, PhieuThuePhong: submitValue});
                    }}
                >
                    {({ handleSubmit, setFieldValue, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
                                <Autocomplete
                                    name="TenPhong"
                                    options={rentList}
                                    defaultValue={rentList[0]}
                                    disableClearable
                                    getOptionLabel={(option) => `Mã phiếu: ${option.MaPhieuThuePhong} - ${option.TenPhong} - Ngày bắt đầu thuê: ${option.NgayBatDauThue}`}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    onChange={(event, value) => {
                                        setFieldValue('PhieuThuePhong', value);
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
