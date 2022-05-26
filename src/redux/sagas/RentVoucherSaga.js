import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";
import { RentVoucherService } from "../../services/RentVoucherService";
import { STATUS_SUCCESS } from "../../services/urlAPI";
const _ = require("lodash");

function* actFetchListRentVoucher() {
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    let { data, status } = yield call(() =>
      RentVoucherService.getRentVoucherList()
    );
    if (status === STATUS_SUCCESS) {
      let newRentList = _.map(data, (element) => {
        return _.extend({}, element, {
          STT: _.indexOf(data, element) + 1,
          TenPhong: element.Phong?.TenPhong,
        });
      });
      yield put({
        type: ActionTypes.GET_RENT_VOUCHER_LIST,
        rentList: newRentList,
      });
      yield put({ type: ActionTypes.HIDE_LOADING });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActFetchListRentVoucher() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_RENT_VOUCHER_SAGA,
    actFetchListRentVoucher
  );
}
