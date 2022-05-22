import * as ActionTypes from "../constants/constant";
const initialState = {
  typeList: [
    {
      MaLoaiPhong: "-1",
      TenLoaiPhong: "TBA",
      DonGia: 0,
    },
  ],
};

export const TypeRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TYPE_ROOM:
      state.typeList = action.typeList;
      return { ...state };
    default:
      return { ...state };
  }
};
