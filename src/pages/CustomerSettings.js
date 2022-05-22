import { Box, Button, Paper, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as ActionTypes from "../redux/constants/constant";
import * as ActionTypesSaga from "../redux/constants/constantSaga"
import CustomerTypeModal from "../components/CustomerSettings/CustomerTypeModal";
import TableCustomerType from "../components/Table/TableCustomerType";

export default function CustomerSettings() {
  const {typeCustomerList} = useSelector(state => state.TypeCustomerReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER})
  },[])
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingCustomerType, setModifyingCustomerType] = useState();

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewCustomerType = () => {
    setOpenNew(true);
  };

  const handleModify = (customerType) => {
    setModifyingCustomerType(customerType);
    setOpenModify(true);
  };

  const handleDelete = (customerType) => {
    toast.success(
      `Xóa loại khách hàng ${customerType.customerType} thành công!`
    );
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Cài đặt khách hàng
      </Typography>

      <TableCustomerType
        data={typeCustomerList}
        handleModify={handleModify}
        handleDelete={handleDelete}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 4 }}
          startIcon={<IconPlus />}
          onClick={handleNewCustomerType}
        >
          Thêm loại khách hàng
        </Button>
      </Box>

      {openNew && <CustomerTypeModal type="new" handleClose={handleClose} />}
      {openModify && (
        <CustomerTypeModal
          type="modify"
          handleClose={handleClose}
          customerType={modifyingCustomerType}
        />
      )}
    </Paper>
  );
}
