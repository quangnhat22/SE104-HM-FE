import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TableRentVoucherDetail from "../components/Table/TableRentVoucherDetail";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import numberWithCommas from "../utils/number-with-commas";
const _ = require("lodash");

export default function RentVoucherDetail() {
  const { id } = useParams();
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading } = useSelector((state) => state.LoadingReducer);
  const { rentDetail } = useSelector((state) => state.RentVoucherReducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SagaActionTypes.FETCH_RENT_VOUCHER_DETAIL_SAGA,
      MaPhieuThuePhong: id,
    });
  }, []);

  useEffect(() => {
    setTotalPrice(
      rentDetail.InvoiceDetail.DonGia * rentDetail.InvoiceDetail.SoNgayThue
    );
  }, [rentDetail]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Mã phiếu thuê phòng: {id}
      </Typography>
      <Grid container spacing={matchDownSM ? 0 : 2}>
        <Grid item xs={12}>
          <Typography variant="h4" display="inline">
            Mã phòng:
          </Typography>
          <Typography
            variant="h4"
            display="inline"
            sx={{ ml: 1 }}
            color="primary"
          >
            {rentDetail.Room.MaPhong}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" display="inline">
            Tên phòng:
          </Typography>
          <Typography
            variant="h4"
            display="inline"
            sx={{ ml: 1 }}
            color="primary"
          >
            {rentDetail.Room.TenPhong}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" display="inline">
            Ngày bắt đầu thuê:
          </Typography>
          <Typography
            variant="h4"
            display="inline"
            sx={{ ml: 1 }}
            color="primary"
          >
            {rentDetail.NgayBatDauThue}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" display="inline">
            Số ngày thuê:
          </Typography>
          <Typography
            variant="h4"
            display="inline"
            sx={{ ml: 1 }}
            color="primary"
          >
            {rentDetail.InvoiceDetail.SoNgayThue}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography variant="h4" display="inline">
            Đơn giá trên ngày:
          </Typography>
          <Typography
            variant="h4"
            display="inline"
            sx={{ ml: 1 }}
            color="primary"
          >
            {`${numberWithCommas(
              Math.round(rentDetail.DonGiaThueTrenNgay * 100) / 100
            )}
            VNĐ`}
          </Typography>
        </Grid>
      </Grid>

      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableRentVoucherDetail data={rentDetail.VoucherDetails} />
      )}

      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 2 }} color="secondary">
          {`Tổng tiền: ${numberWithCommas(
            Math.round(totalPrice * 100) / 100
          )} VNĐ`}
        </Typography>
      </Box>
    </Paper>
  );
}
