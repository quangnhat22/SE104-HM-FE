import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import CustomTableHead from "../../ui-component/CustomTableHead";
import applySortFilter from "../../utils/table-sort-filter";
import MoreMenu from "../Booking/MoreMenu";

const columns = [
  { id: "STT", label: "STT", minWidth: 50, align: "center" },
  { id: "TenKhachHang", label: "Khách hàng", minWidth: 150 },
  {
    id: "TenLoaiKhach",
    label: "Loại khách",
    minWidth: 120,
  },
  {
    id: "CMND",
    label: "CMND/CCCD",
    minWidth: 100,
  },
  {
    id: "DiaChi",
    label: "Địa chỉ",
    minWidth: 170,
  },
  {
    id: "more",
    label: "",
    minWidth: 170,
  },
];

export default function TableCustomer({ data , handleModify, handleDelete }) {
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
                    <MoreMenu
                      customer={row}
                      handleModify={handleModify}
                      handleDelete={handleDelete}
                    />
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
