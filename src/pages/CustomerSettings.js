import { Paper, Typography } from '@mui/material';
import CustomerSettingsForm from '../components/CustomerSettings/CustomerSettingsForm';

export default function CustomerSettings() {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Cài đặt khách hàng
            </Typography>

            <CustomerSettingsForm />
        </Paper>
    );
}
