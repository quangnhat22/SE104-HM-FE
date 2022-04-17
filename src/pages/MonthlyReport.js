import { Paper, Typography } from '@mui/material';
import MonthlyReportForm from '../components/MonthlyReport/MonthlyReportForm';

export default function MonthlyReport() {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', p: 5 }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
                Báo cáo tháng
            </Typography>

            <MonthlyReportForm />
        </Paper>
    );
}
