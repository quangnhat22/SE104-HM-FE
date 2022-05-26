import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRef } from "react";
import { useLocation, useParams } from "react-router";
import ReactToPrint from "react-to-print";
import TableReceiptDetail from "../components/Table/TableReceiptDetail";
import TableReceiptDetailPrint from "../components/Table/TableRecepitDetailPrint";
import numberWithCommas from "../utils/number-with-commas";

export default function Payment() {
  const componentRef = useRef(null);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const { receipt } = location.state;
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
        <Box>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            {`Mã hóa đơn: ${receipt.MaHoaDon}  -  Ngày lập: ${receipt.NgayLap}`}
          </Typography>
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h4" display="inline">
                Khách hàng / Cơ quan:
              </Typography>
              <Typography
                variant="h4"
                display="inline"
                sx={{ ml: 1 }}
                color="primary"
              >
                {receipt.KhachHang_CoQuan}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography variant="h4" display="inline">
                Địa chỉ:
              </Typography>
              <Typography
                variant="h4"
                display="inline"
                sx={{ ml: 1 }}
                color="primary"
              >
                {receipt.DiaChi}
              </Typography>
            </Grid>
          </Grid>

          <TableReceiptDetail data={receipt.CTHD} />

          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{ mt: 4 }}
              color="secondary"
            >
              {`${numberWithCommas(receipt.TongTien)} VNĐ`}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <ReactToPrint
            trigger={() => (
              <Button variant="outlined" sx={{ mt: 4 }}>
                In hóa đơn
              </Button>
            )}
            content={() => componentRef.current}
          />
        </Box>
      </Paper>

      {/* print template */}
      <div style={{ display: "none" }}>
        <Paper
          ref={componentRef}
          sx={{ width: "100%", overflow: "hidden", p: 5 }}
        >
          <Box>
            <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
              {`Mã hóa đơn: ${receipt.MaHoaDon}  -  Ngày lập: ${receipt.NgayLap}`}
            </Typography>
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography variant="h4" display="inline">
                  Khách hàng / Cơ quan:
                </Typography>
                <Typography
                  variant="h4"
                  display="inline"
                  sx={{ ml: 1 }}
                  color="primary"
                >
                  {receipt.KhachHang_CoQuan}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <Typography variant="h4" display="inline">
                  Địa chỉ:
                </Typography>
                <Typography
                  variant="h4"
                  display="inline"
                  sx={{ ml: 1 }}
                  color="primary"
                >
                  {receipt.DiaChi}
                </Typography>
              </Grid>
            </Grid>

            <TableReceiptDetailPrint data={receipt.CTHD} />

            <Box sx={{ display: "flex", justifyContent: "right" }}>
              <Typography
                variant="h3"
                gutterBottom
                sx={{ mt: 4 }}
                color="secondary"
              >
                {`${numberWithCommas(receipt.TongTien)} VNĐ`}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    </>
  );
}
