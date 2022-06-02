import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import CustomTableHead from "../../ui-component/CustomTableHead";
  import applySortFilter from "../../utils/table-sort-filter";
  import MoreMenu from "../Payment/MoreMenu";
  
  const columns = [
    { id: "STT", label: "STT", minWidth: 50, align: "center" },
    { id: "MaPhieuThuePhong", label: "Mã phiếu thuê", minWidth: 150 },
    { id: "TenPhong", label: "Phòng", minWidth: 150 },
    {
      id: "SoNgayThue",
      label: "Số ngày thuê",
      minWidth: 120,
    },
    {
      id: "DonGia",
      label: "Đơn giá",
      minWidth: 100,
    },
    {
      id: "ThanhTien",
      label: "Thành tiền",
      minWidth: 170,
    }
  ];
  
  export default function TableRoomPaymentPrint({ data, handleDelete }) {
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
                  return (
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
  