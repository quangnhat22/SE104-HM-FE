import { toast } from "react-toastify";
import { call, takeLatest, put, all } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";
import { ConfigService } from "../../services/ConfigService";

function* actFetchConfig() {
  try {
    yield put({ type: ActionTypes.REQUEST_CONFIG });
    
    let { data, status } = yield call(() => ConfigService.getListConfig());
    if (status === STATUS_SUCCESS) {
      //handle data before dispatch reducer
      let soKhachToiDa = {};
      let soKhachKhongPhuThu = {};
      if ((data[0].TenThamSo = "SoKhachToiDa")) {
        soKhachToiDa = data[0];
      }
      if ((data[1].TenThamSo = "SoKhachKhongPhuThu")) {
        soKhachKhongPhuThu = data[1];
      }
      yield put({
        type: ActionTypes.GET_CONFIG,
        SoKhachToiDa: soKhachToiDa,
        SoKhachKhongPhuThu: soKhachKhongPhuThu,
      });
      yield put({ type: ActionTypes.SUCCESS_CONFIG });   
    }
  } catch (err) {
    yield put({ type: ActionTypes.SUCCESS_CONFIG }); 
    toast.error("Có lỗi đã xảy ra")
  }
}

function* actUpdateNewConfig(action) {
  let {
    mtsSoKhachToiDa,
    mtsSoKhachKhongPhuThu,
    soKhachToiDa,
    soKhachKhongPhuThu,
  } = action;
  try {
    let { status: stSKTD } = yield call(() =>
      ConfigService.updateConfig(mtsSoKhachToiDa, soKhachToiDa)
    );
    let { status: stSKKPT } = yield call(() =>
      ConfigService.updateConfig(mtsSoKhachKhongPhuThu, soKhachKhongPhuThu)
    );
    if(stSKTD === STATUS_SUCCESS && stSKKPT === STATUS_SUCCESS) {
        toast.success("Cập nhập hệ số phụ thu thành công. Vui lòng đối chiếu với bảng phụ thu để tránh sai sót!")
        yield all([
          put ({type: SagaActionTypes.GET_CONFIG_SAGA}),
          put ({type:SagaActionTypes.FETCH_LIST_SURCHARGE_SAGA})
        ])
    }
  } catch (err) {}
}

export function* followActFetchConfig() {
  yield takeLatest(SagaActionTypes.GET_CONFIG_SAGA, actFetchConfig);
}

export function* followActUpdateNewConfig() {
    yield takeLatest(SagaActionTypes.UPDATE_CONFIG_SAGA, actUpdateNewConfig);
}
