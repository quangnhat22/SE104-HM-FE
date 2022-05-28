import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import TableReceipt from "../components/Table/TableReceipt";
import Search from "../ui-component/Search";

export default function Receipt() {
  const { invoiceList } = useSelector((state) => state.InvoiceReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.FETCH_LIST_INVOICE_SAGA });
  }, []);
  const [filterName, setFilterName] = useState("");

  const handleChangeFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Hóa đơn
      </Typography>
      <TableReceipt data={invoiceList} />
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
