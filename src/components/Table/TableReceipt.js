import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import CustomTableHead from "../../ui-component/CustomTableHead";
import SearchNotFound from "../../ui-component/SearchNotFound";
import applySortFilter from "../../utils/table-sort-filter";
import MoreMenu from "../Receipt/MoreMenu";

const columns = [
  { id: "MaHoaDon", label: "Mã hóa đơn", minWidth: 120, align: "center" },
  { id: "KhachHang_CoQuan", label: "Tên Khách hàng / Cơ quan", minWidth: 250 },
  {
    id: "DiaChi",
    label: "Địa chỉ",
    minWidth: 300,
  },
  {
    id: "NgayLap",
    label: "Ngày lập",
    minWidth: 150,
  },
  {
    id: "TongTien",
    label: "Tổng tiền",
    minWidth: 150,
  },
  {
    id: "more",
    label: "",
    minWidth: 50,
  },
];

export default function TableReceipt({ data, filterName }) {
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("number");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredData = applySortFilter(data, order, orderBy, filterName);

  const isUserNotFound = filteredData.length === 0;

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
          {filteredData.map((row) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = row[column.id];
                return column.id === "more" ? (
                  <TableCell align="center" key={row.id}>
                    <MoreMenu receipt={row} />
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
        {isUserNotFound && (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={6} sx={{ py: 6 }}>
                <SearchNotFound searchQuery={filterName} />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
