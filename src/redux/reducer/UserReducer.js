import * as ActionTypes from "../constants/constant";

const initialState = {
  resetState: 1,
  userLogin: null,
  userList: [
    {
      MaNguoiDung: "",
      HoTen: "",
      Email: "",
      MatKhau: "",
      MaNhom: "",
      UserGroup: {
        MaNhom: "",
        TenNhom: "",
        CapBac: null,
      },
    },
  ],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_USER:
      state.userLogin = action.userLogin;
      return { ...state };
    case ActionTypes.GET_USER_LIST:
      state.userList = action.userList;
      return { ...state };
    case ActionTypes.SET_RESET_STATE_1:
      state.resetState = 1;
      return { ...state };
    case ActionTypes.SET_RESET_STATE_2:
      state.resetState = 2;
      return { ...state };
    default:
      return { ...state };
  }
};
