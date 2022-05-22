import * as ActionTypes from "../constants/constant";

const initialState = {
  typeCustomerList: [
    {
      MaLoaiKhach: "0",
      TenLoaiKhach: "ERROR",
      HeSoPhuThu: 0,
    },
  ],
};

export const TypeCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TYPE_CUSTOMER:
        state.typeCustomerList = action.typeCustomerList;
        return {...state};
    default:
      return { ...state };
  }
};
