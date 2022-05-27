import * as ActionTypes from "../constants/constant";

const initialState = {
  CacPhieuThuePhong: [],
  TotalPrice: 0
};

export const InvoiceReducerLocal = (state = initialState, action) => {
  switch (action.type) {
      case ActionTypes.ADD_ROOM_INVOICE_LOCAL :
          state.CacPhieuThuePhong = [...state.CacPhieuThuePhong, action.PhieuThuePhong]
          state.TotalPrice += action.PhieuThuePhong.ThanhTien
          return {...state}
    default:
      return state;
  }
};
