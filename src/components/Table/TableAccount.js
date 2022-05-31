import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import CustomTableHead from "../../ui-component/CustomTableHead";
import SearchNotFound from "../../ui-component/SearchNotFound";
import applySortFilter from "../../utils/table-sort-filter";
import MoreMenu from "../Account/MoreMenu";

const columns = [
  { id: "MaNguoiDung", label: "Mã người dùng", minWidth: 120, align: "center" },
  { id: "HoTen", label: "Họ và tên", minWidth: 200 },
  {
    id: "TenNhom",
    label: "Vai trò",
    minWidth: 150,
  },
  {
    id: "Email",
    label: "Email",
    minWidth: 250,
  },
  {
    id: "more",
    label: "",
    minWidth: 170,
  },
];

export default function TableAccount({
  data,
  filterName,
  handleModify,
  handleDelete,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("number");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredData = applySortFilter(data, order, orderBy, filterName);

  const isUserNotFound = filteredData.length === 0;

  return (
    <>
      <TableContainer sx={{ maxHeight: 460 }}>
        <Table stickyHeader>
          <CustomTableHead
            order={order}
            orderBy={orderBy}
            columns={columns}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const newRow = { ...row, TenNhom: row.UserGroup.TenNhom };
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = newRow[column.id];
                      return column.id === "more" ? (
                        <TableCell align="center" key={newRow.id}>
                          <MoreMenu
                            account={newRow}
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
                );
              })}
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
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số dòng trên trang"
        sx={{ mr: 2 }}
      />
    </>
  );
}
