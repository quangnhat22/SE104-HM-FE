import { Paper, Typography } from '@mui/material';
import PaymentForm from '../components/Payment/PaymentForm';

export default function Payment() {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Thanh toán
            </Typography>
            <PaymentForm />
        </Paper>
    );
}
