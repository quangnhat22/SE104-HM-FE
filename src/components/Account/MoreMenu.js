import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import AlertModal from "../../ui-component/AlertModal";

export default function MoreMenu({ account, handleModify, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleDeleteAccount = (account) => {
    handleCloseDelete();
    handleDelete(account);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            variant="text"
            color="primary"
            size="large"
            onClick={() => handleModify(account)}
          >
            <IconPencil />
          </IconButton>
        </Tooltip>
        <Tooltip title="Xoá tài khoản">
          <IconButton
            size="large"
            variant="text"
            color="error"
            onClick={handleOpenDelete}
          >
            <IconTrash color="#F44336" />
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa tài khoản này?"
          handleClose={handleCloseDelete}
          action={() => handleDeleteAccount(account)}
        />
      )}
    </>
  );
}
