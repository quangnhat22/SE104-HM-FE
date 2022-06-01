import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import { UserGroupService } from "../../services/UserGroupService";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";

function* actFetchListUserGroup() {
  try {
    let { data, status } = yield call(() =>
      UserGroupService.getListUserGroup()
    );
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_USER_GROUP_LIST,
        userGroupList: data,
      });
    } else {
      toast.success("Đã có lỗi xảy ra!");
    }
  } catch (err) {
    toast.success("Đã có lỗi xảy ra!");
  }
}

export function* followFetchListUserGroup() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_USER_GROUP_SAGA,
    actFetchListUserGroup
  );
}
