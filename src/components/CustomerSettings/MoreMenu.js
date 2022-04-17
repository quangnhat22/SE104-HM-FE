import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import AlertModal from "../../ui-component/AlertModal";

export default function MoreMenu({ customerType, handleModify, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteCustomerType = (customerType) => {
    handleClose();
    handleDelete(customerType);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            variant="text"
            color="primary"
            size="large"
            onClick={() => handleModify(customerType)}
          >
            <IconPencil />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá">
          <IconButton
            variant="text"
            color="error"
            size="large"
            onClick={handleOpen}
          >
            <IconTrash color="#F44336" />
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa loại khách hàng?"
          handleClose={handleClose}
          action={() => handleDeleteCustomerType(customerType)}
        />
      )}
    </>
  );
}
