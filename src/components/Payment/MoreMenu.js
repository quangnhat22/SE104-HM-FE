import { Box, IconButton, Tooltip } from "@mui/material";
import { IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlertModal from "../../ui-component/AlertModal";
import * as ActionTypes from "../../redux/constants/constant";

export default function MoreMenu({ room, handleDelete, disableStatus }) {
  const [openDelete, setOpenDelete] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteRoom = (room) => {
    dispatch({type: ActionTypes.REMOVE_ROOM_INVOICE_LOCAL, roomDelete: room});
    handleDelete(room);
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Tooltip title="Xoá phòng">
          <IconButton
            variant="text"
            color="error"
            size="large"
            disabled={disableStatus}
            onClick={handleOpen}
          >
            {
              !disableStatus ? (<IconTrash color="#F44336" />) : (<IconTrash color="#868E96" />) 
            }
            
          </IconButton>
        </Tooltip>
      </Box>
      {openDelete && (
        <AlertModal
          content="Bạn có chắc muốn xóa phòng?"
          handleClose={handleClose}
          action={() => handleDeleteRoom(room)}
        />
      )}
    </>
  );
}
