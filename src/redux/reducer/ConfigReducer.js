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
  },
  showLoading: false
};

export const ConfigReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_CONFIG:
      state.showLoading = true;
      return {...state}
    case ActionTypes.GET_CONFIG:
      state.SoKhachToiDa = action.SoKhachToiDa;
      state.SoKhachKhongPhuThu = action.SoKhachKhongPhuThu;
      state.showLoading = true;
      return { ...state };
    case ActionTypes.SUCCESS_CONFIG:
      state.showLoading = false;
      return {...state};
    default:
      return { ...state };
  }
};
