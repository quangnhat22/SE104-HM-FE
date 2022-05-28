import { Box, IconButton, Tooltip } from "@mui/material";
import {
  IconCirclePlus,
  IconCreditCard,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AlertModal from "../../ui-component/AlertModal";
import * as ActionTypes from "../../redux/constants/constant";

export default function MoreMenu({ room, handleModify, handleDelete }) {
  console.log(room);
  const [openDelete, setOpenDelete] = useState(false);
  const [enableNewVoucher, setEnableNewVoucher] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    if (currentDate.getHours() > ActionTypes.CHECK_IN_TIME) {
      setEnableNewVoucher(true);
    }
  }, []);

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteRoom = (room) => {
    handleClose();
    handleDelete(room);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        {room.TenTinhTrang === "Phòng đang sử dụng" ? (
          <Link to="/payment">
            <Tooltip title="Thanh toán" size="large">
              <IconButton variant="text" color="success">
                <IconCreditCard />
              </IconButton>
            </Tooltip>
          </Link>
        ) : (
          <>
            {enableNewVoucher ? (
              <Link to={`/booking/${room.MaPhong}`}>
                <Tooltip title="Thuê phòng">
                  <IconButton variant="text" size="large" color="success">
                    <IconCirclePlus />
                  </IconButton>
                </Tooltip>
              </Link>
            ) : (
              <Link to={`/booking/${room.MaPhong}`}>
                <Tooltip title="Thuê phòng (Lưu ý: Thời gian đặt phòng sẽ bắt đầu tính sau 14:00)">
                  <IconButton variant="text" size="large" color="success">
                    <IconCirclePlus />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
            <Tooltip title="Chỉnh sửa">
              <IconButton
                variant="text"
                color="primary"
                size="large"
                onClick={() => handleModify(room)}
              >
                <IconPencil />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xoá phòng">
              <IconButton
                size="large"
                variant="text"
                color="error"
                onClick={() => handleOpen()}
              >
                <IconTrash color="#F44336" />
              </IconButton>
            </Tooltip>
          </>
        )}
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
