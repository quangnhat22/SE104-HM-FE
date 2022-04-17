import { Box, IconButton, Tooltip } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons";
import AlertModal from "../../ui-component/AlertModal";
import { useState } from "react";

export default function MoreMenu({ roomType, handleModify, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteRoomType = (roomType) => {
    handleClose();
    handleDelete(roomType);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Chỉnh sửa">
          <IconButton
            variant="text"
            color="primary"
            size="large"
            onClick={() => handleModify(roomType)}
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
          content="Bạn có chắc muốn xóa loại phòng?"
          handleClose={handleClose}
          action={() => handleDeleteRoomType(roomType)}
        />
      )}
    </>
  );
}
