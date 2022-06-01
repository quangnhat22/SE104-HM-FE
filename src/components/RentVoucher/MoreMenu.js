import { Box, IconButton, Tooltip } from "@mui/material";
import { IconInfoCircle } from "@tabler/icons";
import { Link } from "react-router-dom";

export default function MoreMenu({rentVoucher}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "right" }}>
      <Link to={`/rent-voucher-detail/${rentVoucher.MaPhieuThuePhong}`}>
        <Tooltip title="Xem chi tiết">
          <IconButton variant="text" size="large" color="info">
            <IconInfoCircle />
          </IconButton>
        </Tooltip>
      </Link>
    </Box>
  );
}
