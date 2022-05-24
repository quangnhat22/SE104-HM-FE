import { Box, Button, CircularProgress, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RoomModal from "../components/Room/RoomModal";
import TableRoom from "../components/Table/TableRoom";
import Search from "../ui-component/Search";
import * as ActionSagaTypes from "../redux/constants/constantSaga"
import { useDispatch } from "react-redux";

export default function Room() {
  const {roomList} = useSelector(state => state.RoomReducer);
  const {typeList} = useSelector(state => state.TypeRoomReducer);
  const {loading} = useSelector(state => state.LoadingReducer);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch({type: ActionSagaTypes.FETCH_LIST_ROOM_SAGA});
    dispatch({type: ActionSagaTypes.FECTH_LIST_TYPE_ROOM_SAGA});
  }, []);

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

      {openNew && 
        <RoomModal 
          handleClose={handleClose} 
          type="new" 
          typeRooms = {typeList}/>
      }
      {openModify && (
        <RoomModal
          handleClose={handleClose}
          type="modify"
          room={modifyingRoom}
          typeRooms = {typeList}/>
        )
      }
      {
        loading ?
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", paddingTop:"4rem"}}>
          <CircularProgress />
        </div> :
        <TableRoom
          data={roomList}
          searchField="room"
          filterName={filterName}
          handleModify={handleModify}
        />
      }
      
      
    </Paper>
  );
}
