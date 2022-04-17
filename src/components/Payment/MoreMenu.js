import { Box, IconButton, Tooltip } from '@mui/material';
import { IconTrash } from '@tabler/icons';

export default function MoreMenu() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Tooltip title="Xoá phòng">
                    <IconButton variant="text" color="error" size="large">
                        <IconTrash color="#F44336" />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
}
