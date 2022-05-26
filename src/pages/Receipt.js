import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import TableReceipt from "../components/Table/TableReceipt";
import Search from "../ui-component/Search";

function createData(MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien) {
  return { MaHoaDon, KhachHang_CoQuan, DiaChi, NgayLap, TongTien };
}

const receiptList = [
  createData("HD001", "Đỗ Phú Quang", "India", 1, 100000, 100000),
  createData("HD002", "Phú Quang", "China", 2, 200000, 400000),
];

export default function Receipt() {
  const [filterName, setFilterName] = useState("");

  const handleChangeFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Hóa đơn
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Search
          placeholder="Tìm mã hóa đơn, tên khách hàng, địa chỉ ..."
          filterName={filterName}
          setFilterName={handleChangeFilterByName}
        />
      </Box>
      <TableReceipt data={receiptList} filterName={filterName} />
    </Paper>
  );
}
