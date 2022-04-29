import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomTableHead from "../../ui-component/CustomTableHead";
import SearchNotFound from "../../ui-component/SearchNotFound";
import MoreMenu from "../Room/MoreMenu";
import applySortFilter from "../../utils/table-sort-filter";

const columns = [
  { id: "number", label: "STT", minWidth: 50, align: "center" },
  { id: "room", label: "Phòng", minWidth: 150 },
  {
    id: "roomType",
    label: "Loại phòng",
    minWidth: 120,
  },
  {
    id: "price",
    label: "Đơn giá",
    minWidth: 100,
  },
  {
    id: "note",
    label: "Ghi chú",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 90,
  },
  {
    id: "more",
    label: "",
    minWidth: 170,
  },
];

export default function TableRoom({
  data,
  searchField,
  filterName,
  handleModify,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("number");

  const handleDelete = (room) => {
    toast.success("Xóa phòng thành công!");
  };

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

  const filteredData = applySortFilter(
    data,
    order,
    orderBy,
    searchField,
    filterName
  );

  const isUserNotFound = filteredData.length === 0;

  return (
    <>
      <TableContainer sx={{ maxHeight: 460 }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead
            order={order}
            orderBy={orderBy}
            columns={columns}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];

                    switch (column.id) {
                      case "more":
                        return (
                          <TableCell align="center" key={row.id}>
                            <MoreMenu
                              room={row}
                              handleModify={handleModify}
                              handleDelete={handleDelete}
                            />
                          </TableCell>
                        );
                      case "status":
                        return (
                          <TableCell align="left" key="more">
                            {value ? (
                              <Chip
                                label="Đã đặt"
                                color="warning"
                                sx={{
                                  bgcolor: "warning.light",
                                  color: "warning.dark",
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  width: "90px",
                                }}
                              />
                            ) : (
                              <Chip
                                label="Còn trống"
                                color="primary"
                                sx={{
                                  bgcolor: "success.light",
                                  color: "success.dark",
                                  fontSize: "13px",
                                  fontWeight: "bold",
                                  width: "90px",
                                }}
                              />
                            )}
                          </TableCell>
                        );
                      default:
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                    }
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