import * as ActionTypes from "../constants/constant";

const initialState = {
  roomList: [
    {
      MaPhong: "",
      TenPhong: "",
      MaLoaiPhong: "",
      GhiChu: null,
      MaTinhTrang: "",
      TenLoaiPhong: "",
      DonGia: "",
      TenTinhTrang: "",
    },
  ],
};

export const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ROOM_LIST:
      state.roomList = action.roomList
      return {...state}
    default:
      return state;
  }
};
