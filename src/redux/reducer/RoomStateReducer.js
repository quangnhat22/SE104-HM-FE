import * as ActionTypes from "../constants/constant";

const initialState = {
  roomStateList: [
    {
      MaTinhTrang: "",
      TenTinhTrang: "",
    },
  ],
};

export const RoomStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ROOM_STATE_LIST:
      state.roomStateList = action.roomStateList;
      return {...state}
    default:
      return state;
  }
};
