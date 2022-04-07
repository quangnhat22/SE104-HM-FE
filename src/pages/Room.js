import Paper from '@mui/material/Paper';
import RoomList from '../components/Room/RoomList';

const columns = [
    { id: 'number', label: 'STT', minWidth: 50, align: 'center' },
    { id: 'room', label: 'Phòng', minWidth: 150 },
    {
        id: 'roomType',
        label: 'Loại phòng',
        minWidth: 120
    },
    {
        id: 'price',
        label: 'Đơn giá',
        minWidth: 100
    },
    {
        id: 'note',
        label: 'Ghi chú',
        minWidth: 170
    },
    {
        id: 'status',
        label: 'Trạng thái',
        minWidth: 90
    },
    {
        id: 'more',
        label: '',
        minWidth: 170
    }
];

function createData(id, number, room, roomType, price, status, note) {
    return { id, number, room, roomType, price, status, note };
}

const roomList = [
    createData(1, 1, 'India', 'IN', 1324171354, false, 3287263),
    createData(2, 2, 'China', 'CN', 1403500365, true, 9596961),
    createData(3, 3, 'Italy', 'IT', 60483973, true, 301340),
    createData(4, 4, 'United States', 'US', 327167434, true, 9833520),
    createData(5, 5, 'Canada', 'CA', 37602103, false, 9984670),
    createData(6, 6, 'Australia', 'AU', 25475400, true, 7692024),
    createData(7, 7, 'Germany', 'DE', 83019200, true, 357578),
    createData(8, 8, 'Ireland', 'IE', 4857000, false, 70273),
    createData(9, 9, 'Mexico', 'MX', 126577691, true, 1972550),
    createData(10, 10, 'Mexico', 'MX', 126577691, false, 1972550)
];

export default function Room() {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <RoomList data={roomList} columns={columns} searchField="room" />
        </Paper>
    );
}
