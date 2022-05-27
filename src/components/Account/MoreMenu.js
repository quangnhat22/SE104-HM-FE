import { Box, IconButton, Tooltip } from "@mui/material";
import { IconKey, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import AlertModal from "../../ui-component/AlertModal";

export default function MoreMenu({
  account,
  handleNewPassword,
  handleModify,
  handleDelete,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openNewPassword, setOpenNewPassword] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenNewPassword = () => {
    setOpenNewPassword(true);
  };

  const handleCloseNewPassword = () => {
    setOpenNewPassword(false);
  };

  const handleDeleteAccount = (account) => {
    handleCloseDelete();
    handleDelete(account);
  };

  const handleNewPasswordMoreMenu = (account) => {
    handleCloseNewPassword();
    handleNewPassword(account);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Cấp lại mật khẩu">
          <IconButton
            variant="text"
            size="large"
            color="success"
            onClick={handleOpenNewPassword}
          >
            <IconKey />
          </IconButton>
        </Tooltip>
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
      {openNewPassword && (
        <AlertModal
          content="Bạn có chắc muốn cấp lại mật khẩu cho tài khoản này?"
          handleClose={handleCloseNewPassword}
          action={() => handleNewPasswordMoreMenu(account)}
        />
      )}
    </>
  );
}
