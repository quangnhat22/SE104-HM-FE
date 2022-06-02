import * as ActionTypes from "../constants/constant";
const initialState = {
  surchargeList: [
    {
      SoKhach: 0,
      TiLePhuThu: 0
    }
  ],
};

export const SurchargeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SURCHARGE_LIST:
      state.surchargeList = action.surchargeList;
      return { ...state };
    default:
      return state;
  }
};
