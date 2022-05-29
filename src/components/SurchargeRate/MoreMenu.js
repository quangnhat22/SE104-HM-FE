import { Box, IconButton, Tooltip } from "@mui/material";
import { IconTrash } from "@tabler/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AlertModal from "../../ui-component/AlertModal";
import * as SagaActionTypes from "../../redux/constants/constantSaga";

export default function MoreMenu({ surchargeRate, handleDelete }) {
  const [openDelete, setOpenDelete] = useState(false);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteSurchargeRate = (surchargeRate) => {
    handleClose();
    handleDelete(surchargeRate);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
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
          content="Bạn có chắc muốn xóa tỉ lệ phụ thu này?"
          handleClose={handleClose}
          action={() => handleDeleteSurchargeRate(surchargeRate)}
        />
      )}
    </>
  );
}
