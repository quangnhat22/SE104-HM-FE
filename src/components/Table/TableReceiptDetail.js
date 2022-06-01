import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import CustomTableHead from "../../ui-component/CustomTableHead";
import applySortFilter from "../../utils/table-sort-filter";
import MoreMenu
 from "../RentVoucher/MoreMenu";
const columns = [
  { id: "STT", label: "STT", minWidth: 50, align: "center" },
  { id: "MaPhieuThuePhong", label: "Mã phiếu thuê phòng", minWidth: 150 },
  {
    id: "SoNgayThue",
    label: "Số ngày thuê",
    minWidth: 170,
  },
  {
    id: "DonGia",
    label: "Đơn giá",
    minWidth: 170,
  },
  {
    id: "ThanhTien",
    label: "Thành tiền",
    minWidth: 170,
  },
  {
    id: "more",
    label: "",
    minWidth: 50,
  },
];

export default function TableReceiptDetail({ data }) {
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("number");
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = applySortFilter(data, order, orderBy);

  return (
    <TableContainer sx={{ maxHeight: 450 }}>
      <Table stickyHeader aria-label="sticky table">
        <CustomTableHead
          order={order}
          orderBy={orderBy}
          columns={columns}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {sortedData.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return column.id === "more" ? (
                  <TableCell align="center" key={row.id}>
                    <MoreMenu rentVoucher={row} />
                  </TableCell>
                ) : (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === "number"
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
