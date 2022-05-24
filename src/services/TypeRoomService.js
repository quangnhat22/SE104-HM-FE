import Axios from "axios";
import {
  URL_ADD_TYPE_ROOM,
  URL_DELETE_TYPE_ROOM,
  URL_EDIT_TYPE_ROOM,
  URL_GET_LIST_TYPE_ROOM,
} from "./urlAPI";

export const TypeRoomService = {
  getListTypeRoom: () => {
    return Axios.get(URL_GET_LIST_TYPE_ROOM);
  },
  addTypeRoom: (typeRoom) => {
    return Axios.post(URL_ADD_TYPE_ROOM, {
      TenLoaiPhong: typeRoom.TenLoaiPhong,
      DonGia: typeRoom.DonGia,
    });
  },
  editListTypeRoom: (typeRoom) => {
    return Axios.put(URL_EDIT_TYPE_ROOM(typeRoom.MaLoaiPhong), {
      TenLoaiPhong: typeRoom.TenLoaiPhong,
      DonGia: typeRoom.DonGia,
    });
  },
  deleteTypeRoom: (MaLoaiPhong) => {
    return Axios.delete(URL_DELETE_TYPE_ROOM(MaLoaiPhong));
  },
};
