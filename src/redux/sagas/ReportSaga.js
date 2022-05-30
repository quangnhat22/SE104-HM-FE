import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import * as ActionTypes from "../constants/constant";
import { ReportService } from "../../services/ReportService";
import { FETCH_REPORT_SAGA } from "../constants/constantSaga";
import { STATUS_SUCCESS } from "../../services/urlAPI";

function* actFetchReport(action) {
  let { thang, nam } = action;
  
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    let { data, status } = yield call(() =>
      ReportService.getReport(thang, nam)
    );
    data.ReportDetails.forEach(reportDetail => reportDetail.index = data.ReportDetails.indexOf(reportDetail) + 1);
    data.ReportDetails.forEach(reportDetail => reportDetail.TenLoaiPhong = reportDetail.RoomType.TenLoaiPhong);
    
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

export function* followActFetchReport() {
  yield takeLatest(FETCH_REPORT_SAGA, actFetchReport);
}
