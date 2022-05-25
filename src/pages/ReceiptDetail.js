import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router";
import TableReceiptDetail from "../components/Table/TableReceiptDetail";
import numberWithCommas from "../utils/number-with-commas";

function createData(
  id,
  number,
  TenPhong,
  numberOfRentalDays,
  price,
  totalPrice
) {
  return { id, number, TenPhong, numberOfRentalDays, price, totalPrice };
}

const customerList = [
  createData(1, 1, "India", 1, 100000, 100000),
  createData(2, 2, "China", 2, 200000, 400000),
];

export default function Payment() {
  const { id } = useParams();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Box>
        <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
          {`Hóa đơn: ${id} - 1/1/2022`}
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
              Đỗ Phú Quang
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
              KTX Khu A
            </Typography>
          </Grid>
        </Grid>

        <TableReceiptDetail data={customerList} />

        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ mt: 4 }}
            color="secondary"
          >
            {`${numberWithCommas(500000)} VNĐ`}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button variant="outlined" sx={{ mt: 4 }}>
          In hóa đơn
        </Button>
      </Box>
    </Paper>
  );
}
