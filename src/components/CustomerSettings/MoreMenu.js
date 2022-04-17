import { Box, IconButton, Tooltip } from '@mui/material';
import { IconPencil, IconTrash } from '@tabler/icons';

export default function MoreMenu() {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Tooltip title="Chỉnh sửa">
                    <IconButton variant="text" color="primary" size="large">
                        <IconPencil />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xoá">
                    <IconButton variant="text" color="error" size="large">
                        <IconTrash color="#F44336" />
                    </IconButton>
                </Tooltip>
            </Box>
        </>
    );
}
