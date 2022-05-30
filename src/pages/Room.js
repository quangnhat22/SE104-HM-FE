import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RoomModal from "../components/Room/RoomModal";
import TableRoom from "../components/Table/TableRoom";
import Search from "../ui-component/Search";
import * as ActionSagaTypes from "../redux/constants/constantSaga";
import { useDispatch } from "react-redux";

export default function Room() {
  const { roomList } = useSelector((state) => state.RoomReducer);
  const { typeList } = useSelector((state) => state.TypeRoomReducer);
  const { roomStateList } = useSelector((state) => state.RoomStateReducer);
  const { loading } = useSelector((state) => state.LoadingReducer);
  const {SoKhachToiDa, SoKhachKhongPhuThu} = useSelector((state) => state.ConfigReducer);
  const {surchargeList} = useSelector(state => state.SurchargeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ActionSagaTypes.FETCH_LIST_ROOM_SAGA });
    dispatch({ type: ActionSagaTypes.FECTH_LIST_TYPE_ROOM_SAGA });
    dispatch({ type: ActionSagaTypes.FETCH_LIST_STATE_ROOM_SAGA });
    dispatch({ type: ActionSagaTypes.GET_CONFIG_SAGA });
    dispatch({type: ActionSagaTypes.FETCH_LIST_SURCHARGE_SAGA});
    dispatch({ type: ActionSagaTypes.FETCH_LIST_TYPE_CUSTOMER_SAGA });
  }, []);

  const [filterName, setFilterName] = useState("");
  const [openNew, setOpenNew] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  const [modifyingRoom, setModifyingRoom] = useState();
  const [modifyingRoomType, setModifyingRoomType] = useState(0);
  const handleClose = () => {
    setOpenNew(false);
    setOpenModify(false);
  };

  const handleNewRoom = () => {
    setOpenNew(true);
  };

  const handleModify = (room) => {
    let index = typeList.findIndex(
      (type) => type.MaLoaiPhong == room.MaLoaiPhong
    );
    setModifyingRoomType(index);
    setModifyingRoom(room);
    setOpenModify(true);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 5 }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        Danh mục phòng
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Search
          placeholder="Tìm mã phòng, tên phòng, loại phòng ..."
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

      {openNew && (
        <RoomModal
          handleClose={handleClose}
          type="new"
          typeRooms={typeList}
          statesRoomList={roomStateList}
        />
      )}
      {openModify && (
        <RoomModal
          handleClose={handleClose}
          type="modify"
          room={modifyingRoom}
          typeRooms={typeList}
          typeIndex={modifyingRoomType}
        />
      )}
      {loading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "4rem",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <TableRoom
          data={roomList}
          filterName={filterName}
          handleModify={handleModify}
          SoKhachToiDa = {SoKhachToiDa.GiaTri}
          SoKhachKhongPhuThu = {SoKhachKhongPhuThu.GiaTri}
          surchargeList = {surchargeList}
        />
      )}
    </Paper>
  );
}
