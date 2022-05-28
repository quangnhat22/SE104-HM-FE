import * as ActionTypes from "../constants/constant";
const _ = require("lodash");

const initialState = {
  customerList: [],
};

export const CustomerReducerLocal = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_CLIENT_RENT_VOUCHER_LIST:
      // add new elements
      state.customerList = [...state.customerList, action.customer];
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
        if (element.CMND !== null) {
          return element.CMND === action.customer.CMND;
        }
        return element.TenKhachHang === action.customer.TenKhachHang;
      });
      //add index for elements in new array
      state.customerList = _.map(state.customerList, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(state.customerList, element) + 1,
        });
      });
      return { ...state };
    default:
      return state;
  }
};
