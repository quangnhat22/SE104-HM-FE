import * as ActionTypes from "../constants/constant";
const _ = require("lodash");

const initialState = {
  CacPhieuThuePhong: [],
  TotalPrice: 0,
};

export const InvoiceReducerLocal = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ROOM_INVOICE_LOCAL:
      //add list
      state.CacPhieuThuePhong = [
        ...state.CacPhieuThuePhong,
        action.PhieuThuePhong,
      ];
      // handle total price
      state.TotalPrice += action.PhieuThuePhong.ThanhTien;
      // add index in array
      state.CacPhieuThuePhong = _.map(state.CacPhieuThuePhong, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(state.CacPhieuThuePhong, element) + 1,
        });
      });
      return { ...state };

    case ActionTypes.REMOVE_ROOM_INVOICE_LOCAL:
      _.remove(
        state.CacPhieuThuePhong,
        (phieuThuePhong) =>
          phieuThuePhong.MaPhieuThuePhong === action.MaPhieuThuePhong
      );
      // add index in new array
      state.CacPhieuThuePhong = _.map(state.CacPhieuThuePhong, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(state.CacPhieuThuePhong, element) + 1,
        });
      });
      return { ...state };
    case ActionTypes.REMOVE_ALL_ROOM_INVOICE_LOCAL:
      _.remove(state.CacPhieuThuePhong, (phieuThuePhong) => true);
      // add index in new array
      state.TotalPrice = 0;
      return { ...state };
    default:
      return state;
  }
};
