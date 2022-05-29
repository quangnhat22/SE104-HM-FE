import * as ActionTypes from "../constants/constant";
const initialState = {
  SoKhachToiDa: {
    MaThamSo: "",
    TenThamSo: "",
    GiaTri: 1
  },
  SoKhachKhongPhuThu: {
    MaThamSo: "",
    TenThamSo: "",
    GiaTri: 1
  }
};

export const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CONFIG:
      state.SoKhachToiDa = action.SoKhachToiDa;
      state.SoKhachKhongPhuThu = action.SoKhachKhongPhuThu;
      return { ...state };
    default:
      return { ...state };
  }
};
