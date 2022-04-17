import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import AlertModal from "../../ui-component/AlertModal";

export default function MoreMenu({ customer, handleModify, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteCustomer = (customer) => {
    handleClose();
    handleDelete(customer);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton variant="text" color="primary" size="large"  onClick={() => handleModify(customer)}>
            <IconPencil />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá khách hàng">
          <IconButton variant="text" color="error" size="large" onClick={handleOpen}>
            <IconTrash color="#F44336" />
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa khách hàng?"
          handleClose={handleClose}
          action={() => handleDeleteCustomer(customer)}
        />
      )}
    </>
  );
}
