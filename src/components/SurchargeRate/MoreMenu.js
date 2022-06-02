import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil } from "@tabler/icons";

export default function MoreMenu({
  surchargeRate,
  handleModify,
}) {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            variant="text"
            color="primary"
            size="large"
            onClick={() => handleModify(surchargeRate)}
          >
            <IconPencil />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
