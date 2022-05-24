import Axios from "axios";
import {
  URL_ADD_NEW_ROOM,
  URL_DELETE_ROOM,
  URL_EDIT_ROOM,
  URL_GET_LIST_ROOM,
} from "./urlAPI";
export const RoomService = {
  getListRoom: () => {
    return Axios.get(URL_GET_LIST_ROOM);
  },
  addNewRoom: (newRoom) => {
    return Axios.post(URL_ADD_NEW_ROOM, {
      TenPhong: newRoom.TenPhong,
      MaLoaiPhong: newRoom.MaLoaiPhong,
      MaTinhTrang: newRoom.MaTinhTrang,
      GhiChu: newRoom.GhiChu,
    });
  },
  editRoom: (roomEdit) => {
    return Axios.put(URL_EDIT_ROOM(roomEdit.MaPhong), {
      TenPhong: roomEdit.TenPhong,
      MaLoaiPhong: roomEdit.MaLoaiPhong,
      MaTinhTrang: roomEdit.MaTinhTrang,
      GhiChu: roomEdit.GhiChu,
    });
  },
  deleteRoom: (maPhong) => {
    return Axios.delete(URL_DELETE_ROOM(maPhong));
  },
};
