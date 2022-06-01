import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { RentVoucherService } from "../../services/RentVoucherService";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";
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
    }
    yield put({ type: ActionTypes.HIDE_LOADING });
  } catch (err) {
    console.log(err);
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

function* actNewRentVoucher(action) {
  let { rentVoucher } = action;
  try {
    let { status } = yield call(() =>
      RentVoucherService.addNewRentVoucher(rentVoucher)
    );
    if (status === STATUS_CREATE_SUCCESS) {
      yield put({ type: SagaActionTypes.FETCH_LIST_ROOM_SAGA });
      toast.success("Tạo phiếu thuê phòng thành công!");
    } else {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
  } catch (err) {
    toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
  }
}

function* actFetchRentVoucherDetail(action) {
  let { MaPhieuThuePhong } = action;
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });

    let { data, status } = yield call(() =>
      RentVoucherService.getRentVoucherDetail(MaPhieuThuePhong)
    );
    console.log(data);
    if (status === STATUS_SUCCESS) {
      yield put({ type: ActionTypes.GET_RENT_VOUCHER_DETAIL, rentDetail: data });
    } else {
      toast.error("Đã có lỗi xảy ra vui lòng thử lại!");
    }
    yield put({ type: ActionTypes.HIDE_LOADING });
  } catch (err) {
    console.log(err);
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

export function* followActFetchListRentVoucher() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_RENT_VOUCHER_SAGA,
    actFetchListRentVoucher
  );
}

export function* followActNewRentVoucher() {
  yield takeLatest(SagaActionTypes.ADD_RENT_VOUCHER_SAGA, actNewRentVoucher);
}

export function* followActFetchRentVoucherDetail() {
  yield takeLatest(SagaActionTypes.FETCH_RENT_VOUCHER_DETAIL_SAGA, actFetchRentVoucherDetail);
}

