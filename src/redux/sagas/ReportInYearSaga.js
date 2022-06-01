import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { ReportService } from "../../services/ReportService";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypes from "../constants/constant";
import { FETCH_REPORT_IN_YEAR_SAGA } from "../constants/constantSaga";
const _ = require("lodash");

function* actFetchReportInYear() {
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    let { data, status } = yield call(() => ReportService.getReportInYear());

    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_REPORT_IN_YEAR,
        reportList: data,
      });
    } else {
      toast.error("Đã có lỗi xảy ra, vui lòng kiểm tra lại!");
    }
    yield put({ type: ActionTypes.HIDE_LOADING });
  } catch (err) {
    toast.error("Đã có lỗi xảy ra, vui lòng kiểm tra lại!");

    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

export function* followActFetchReportInYear() {
  yield takeLatest(FETCH_REPORT_IN_YEAR_SAGA, actFetchReportInYear);
}
