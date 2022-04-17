import { Box, Button, Paper, Typography } from "@mui/material";
import { IconPlus } from "@tabler/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import CustomerTypeList from "../components/CustomerSettings/CustomerTypeList";
import CustomerTypeModal from "../components/CustomerSettings/CustomerTypeModal";

const columns = [
  { id: "number", label: "STT", minWidth: 50, align: "center" },
  { id: "customerType", label: "Loại khách hàng", minWidth: 180 },
  { id: "surchargeFactor", label: "Hệ số phụ thu", minWidth: 150 },
  {
    id: "more",
    label: "",
    minWidth: 170,
  },
];

function createData(id, number, customerType, surchargeFactor) {
  return { id, number, customerType, surchargeFactor };
}

const typeList = [
  createData(1, 1, "Loại A", 1),
  createData(2, 2, "Loại B", 1.5),
];

export default function CustomerSettings() {
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

      <CustomerTypeList
        columns={columns}
        data={typeList}
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
