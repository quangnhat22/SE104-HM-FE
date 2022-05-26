import { Paper, Typography } from "@mui/material";
import TableReceipt from "../components/Table/TableReceipt";

function createData(MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien) {
  return { MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien };
}

const receiptList = [
  createData("HD001", "Đỗ Phú Quang", "India", 1, 100000, 100000),
  createData("HD002", "Phú Quang", "China", 2, 200000, 400000),
];

export default function Receipt() {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Hóa đơn
      </Typography>
      <TableReceipt data={receiptList} />
    </Paper>
  );
}
