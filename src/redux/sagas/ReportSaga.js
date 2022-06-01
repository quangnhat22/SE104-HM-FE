import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import * as ActionTypes from "../constants/constant";
import { ReportService } from "../../services/ReportService";
import { FETCH_REPORT_SAGA, GET_REPORT_EXCEL } from "../constants/constantSaga";
import { STATUS_SUCCESS } from "../../services/urlAPI";
const _ = require("lodash");

function* actFetchReport(action) {
  let { thang, nam } = action;
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    let { data, status } = yield call(() =>
      ReportService.getReport(thang, nam)
    );
    // data.ReportDetails.forEach(reportDetail => reportDetail.index = data.ReportDetails.indexOf(reportDetail) + 1);
    // data.ReportDetails.forEach(reportDetail => reportDetail.TenLoaiPhong = reportDetail.RoomType.TenLoaiPhong);
    data.ReportDetails = _.map(data.ReportDetails, (element) => {
      return _.extend({}, element, {
        index: _.indexOf(data.ReportDetails, element) + 1,
        TenLoaiPhong: element.RoomType.TenLoaiPhong,
        RatePercent: (element.TiLe * 100).toFixed(2)
      })
    } )

    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_REPORT,
        report: data,
      });
    } else {
      toast.error("Vui lòng kiểm tra các giá trị nhập vào.")
    }
    yield put({ type: ActionTypes.HIDE_LOADING });
  } catch (err) {
    toast.error("Vui lòng kiểm tra các giá trị nhập vào.")
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

function* actFetchReportExcel(action) {
  let { thang, nam } = action;
  try {
    let res = yield call(() =>
      ReportService.getReportExcel(thang,nam)
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.xlsx");
    document.body.appendChild(link);
    link.click(); }
  catch (err) {
    toast.error("Đã có lỗi xảy ra.");
  }
}

export function* followActFetchReport() {
  yield takeLatest(FETCH_REPORT_SAGA, actFetchReport);
}

export function* followActFetchReportExcel() {
  yield takeLatest(GET_REPORT_EXCEL, actFetchReportExcel)
}
