import { Box, IconButton, Tooltip } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MoreMenu({receipt}) {
  const handleClick = () => {
    receipt.CTHD.forEach(cthd => cthd.STT = receipt.CTHD.indexOf(cthd) + 1);
    receipt.CTHD.forEach(cthd => cthd.ThanhTien = cthd.SoNgayThue * cthd.DonGia);
  }
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Link to={`/receipt/${receipt.MaHoaDon}`} state={{receipt: receipt}}>
        <Tooltip title="Xem chi tiết">
          <IconButton variant="text" size="large" color="info" onClick={handleClick}>
            <IconInfoCircle />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
}
