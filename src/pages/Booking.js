import { Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/Booking/BookingForm';

export default function Booking() {
    const { id } = useParams();
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Phiếu thuê phòng: {id}
            </Typography>
            <BookingForm />
        </Paper>
    );
}
