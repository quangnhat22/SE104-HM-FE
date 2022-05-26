import { Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as SagaActionTypes from "../redux/constants/constantSaga";
import TableReceipt from "../components/Table/TableReceipt";

export default function Receipt() {
  const { invoiceList } = useSelector(state => state.InvoiceReducer);
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch({type: SagaActionTypes.FETCH_LIST_INVOICE_SAGA});
  }, [])
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Hóa đơn
      </Typography>
      <TableReceipt data={invoiceList} />
    </Paper>
  );
}
