import { Box, Button, Paper } from "@mui/material";
import { useState } from "react";
import RoomModal from "../components/Room/RoomModal";
import TableRoom from "../components/Table/TableRoom";
import Search from "../ui-component/Search";

function createData(id, number, room, roomType, price, status, note) {
  return { id, number, room, roomType, price, status, note };
}

const roomList = [
  createData(1, 1, "India", "IN", 1324171354, false, 3287263),
  createData(2, 2, "China", "CN", 1403500365, true, 9596961),
  createData(3, 3, "Italy", "IT", 60483973, true, 301340),
  createData(4, 4, "United States", "US", 327167434, true, 9833520),
  createData(5, 5, "Canada", "CA", 37602103, false, 9984670),
  createData(6, 6, "Australia", "AU", 25475400, true, 7692024),
  createData(7, 7, "Germany", "DE", 83019200, true, 357578),
  createData(8, 8, "Ireland", "IE", 4857000, false, 70273),
  createData(9, 9, "Mexico", "MX", 126577691, true, 1972550),
  createData(10, 10, "Mexico", "MX", 126577691, false, 1972550),
];

export default function Room() {
  const [filterName, setFilterName] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingRoom, setModifyingRoom] = useState();

  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewRoom = () => {
    setOpenNew(true);
  };

  const handleModify = (room) => {
    setModifyingRoom(room);
    setOpenModify(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Box sx={{ display: "flex" }}>
        <Search
          placeholder="Tìm phòng"
          filterName={filterName}
          setFilterName={handleFilterByName}
        />
        <Button
          onClick={handleNewRoom}
          variant="outlined"
          sx={{ ml: 2, py: "12px", borderRadius: 3 }}
        >
          Thêm phòng
        </Button>
      </Box>

      {openNew && <RoomModal handleClose={handleClose} type="new" />}
      {openModify && (
        <RoomModal
          handleClose={handleClose}
          type="modify"
          room={modifyingRoom}
        />
      )}
      <TableRoom
        data={roomList}
        searchField="room"
        filterName={filterName}
        handleModify={handleModify}
      />
    </Paper>
  );
}
