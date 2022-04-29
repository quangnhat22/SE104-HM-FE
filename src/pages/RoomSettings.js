import { Box, Button, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { IconPlus } from "@tabler/icons";
import RoomTypeModal from "../components/RoomSettings/RoomTypeModal";
import { toast } from "react-toastify";
import TableRoomType from "../components/Table/TableRoomType";

function createData(id, number, roomType, roomPrice) {
  return { id, number, roomType, roomPrice };
}

const typeList = [
  createData(1, 1, "Loại A", 3287263),
  createData(2, 2, "Loại B", 9596961),
];

export default function RoomSettings() {
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingRoomType, setModifyingRoomType] = useState();

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewRoomType = () => {
    setOpenNew(true);
  };

  const handleModify = (roomType) => {
    setModifyingRoomType(roomType);
    setOpenModify(true);
  };

  const handleDelete = (roomType) => {
    toast.success(`Xóa loại phòng ${roomType.roomType} thành công!`);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Cài đặt loại phòng
      </Typography>

      <TableRoomType
        data={typeList}
        handleModify={handleModify}
        handleDelete={handleDelete}
      />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ mt: 4 }}
          startIcon={<IconPlus />}
          onClick={handleNewRoomType}
        >
          Thêm loại phòng
        </Button>
      </Box>

      {openNew && <RoomTypeModal type="new" handleClose={handleClose} />}
      {openModify && (
        <RoomTypeModal
          type="modify"
          handleClose={handleClose}
          roomType={modifyingRoomType}
        />
      )}
    </Paper>
  );
}
