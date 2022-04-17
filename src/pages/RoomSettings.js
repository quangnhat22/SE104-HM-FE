import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { IconPlus } from '@tabler/icons';
import RoomTypeList from '../components/RoomSettings/RoomTypeList';
import NewRoomTypeModal from '../components/RoomSettings/NewRoomTypeModal';

const columns = [
    { id: 'number', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'roomType', label: 'Loại phòng', minWidth: 150 },
    {
        id: 'roomPrice',
        label: 'Đơn giá',
        minWidth: 120
    },
    {
        id: 'more',
        label: '',
        minWidth: 170
    }
];

function createData(id, number, roomType, roomPrice) {
    return { id, number, roomType, roomPrice };
}

const typeList = [createData(1, 1, 'Loại A', 3287263), createData(2, 2, 'Loại B', 9596961)];

export default function RoomSettings() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Cài đặt loại phòng
            </Typography>

            <RoomTypeList columns={columns} data={typeList} />

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button sx={{ mt: 4 }} startIcon={<IconPlus />} onClick={handleOpen}>
                    Thêm loại phòng
                </Button>
            </Box>

            {open && <NewRoomTypeModal handleClose={handleClose} />}

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button variant="outlined" sx={{ mt: 4 }}>
                    Xác nhận
                </Button>
            </Box>
        </Paper>
    );
}
