import * as ActionTypes from "../constants/constant";
const _ = require("lodash");

const initialState = {
  customerList: [],
  TongTienPhieuThuePhong: 0,
};

export const CustomerReducerLocal = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CLIENT_RENT_VOUCHER_LIST:
      // add new elements
      state.customerList = [...state.customerList, action.customer];
      // hanlde total price per day

      //add index for elements in array
      state.customerList = _.map(state.customerList, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(state.customerList, element) + 1,
        });
      });
      return { ...state };
    case ActionTypes.REMOVE_CLIENT_RENT_VOUCER:
      //remove element
      _.remove(state.customerList, (element) => {
        return element.STT === action.customer.STT;
      });
      //add index for elements in new array
      state.customerList = _.map(state.customerList, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(state.customerList, element) + 1,
        });
      });
      return { ...state };
    case ActionTypes.UPDATE_CLIENT_RENT_VOUCHER:
      console.log(action.newCustomer);
      state.customerList = _.map(state.customerList, (element) => {
        return element.STT === action.STT
          ? {
              STT: action.STT,
              CMND: action.newCustomer.CMND,
              DiaChi: action.newCustomer.DiaChi,
              MaLoaiKhach: action.newCustomer.MaLoaiKhach,
              TenLoaiKhach: action.newCustomer.TenLoaiKhach,
              TenKhachHang: action.newCustomer.TenKhachHang,
            }
          : element;
      });
      console.log(state);
      return { ...state };
    case ActionTypes.REMOVE_ALL_CLIENT_RENT_VOUCHER:
      //remove all element
      _.remove(state.customerList, (element) => {
        return true;
      });
      state.TongTienPhieuThuePhong = 0;
      return { ...state };
    default:
      return state;
  }
};
