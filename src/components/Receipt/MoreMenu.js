import { Box, IconButton, Tooltip } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MoreMenu({receipt}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Link to={`/receipt/${receipt.MaHoaDon}`} state={{receipt: receipt}}>
        <Tooltip title="Xem chi tiết">
          <IconButton variant="text" size="large" color="info">
            <IconInfoCircle />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
}
