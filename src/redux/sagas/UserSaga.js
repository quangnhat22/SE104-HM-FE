import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import { UserService } from "../../services/UserService";
import * as ActionTypes from "../constants/constant";
import {
  ADD_NEW_USER_SAGA,
  DELETE_USER_SAGA,
  EDIT_USER_SAGA,
  FETCH_LIST_USER_SAGA,
  FORGOT_PASSWORD_SAGA,
  POST_USER_LOGIN_SAGA,
  RESET_PASSWORD_SAGA,
} from "../constants/constantSaga";

function* actLogin(action) {
  let { userLogin } = action;
  try {
    let { data, status } = yield call(() => UserService.postLogin(userLogin));
    if (status === STATUS_SUCCESS) {
      toast.success("Đăng nhập thành công!");
      Cookies.set("token", data.token);
      Cookies.set("level", data.CapBac);
      yield put({
        type: ActionTypes.GET_USER,
        userLogin: data,
      });
    }
  } catch (err) {
    toast.error("Đăng nhập thất bại!");
  }
}

function* actFetchListUser() {
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });

    let { data, status } = yield call(() => UserService.getListUser());
    if (status === STATUS_SUCCESS) {
      yield put({
        type: ActionTypes.GET_USER_LIST,
        userList: data,
      });
      yield put({ type: ActionTypes.HIDE_LOADING });
    }
  } catch (err) {
    console.log(err);
  }
}

function* actNewUser(action) {
  let { user } = action;
  try {
    let { status } = yield call(() => UserService.addNewUser(user));
    if (status === STATUS_CREATE_SUCCESS) {
      yield put({ type: FETCH_LIST_USER_SAGA });
      toast.success("Thêm tài khoản thành công!");
    }
  } catch (err) {}
}

function* actEditUser(action) {
  let { user } = action;
  try {
    let { status } = yield call(() => UserService.editUser(user));
    if (status === STATUS_SUCCESS) {
      yield put({ type: FETCH_LIST_USER_SAGA });
      toast.success("Sửa thông tin tài khoản thành công!");
    }
  } catch (err) {}
}

function* actDeleteUser(action) {
  let { MaNguoiDung } = action;
  try {
    let { status } = yield call(() => UserService.deleteUser(MaNguoiDung));
    if (status === STATUS_SUCCESS) {
      yield put({ type: FETCH_LIST_USER_SAGA });
      toast.success("Xóa tài khoản thành công!");
    }
  } catch (err) {}
}

function* actForgotPassword(action) {
  let { email } = action;
  try {
    let { status } = yield call(() => UserService.forgotPassword(email));
    if (status === STATUS_SUCCESS) {
      yield put({ type: ActionTypes.SET_RESET_STATE_2 });
      toast.success(
        "Gửi yêu cầu đổi mật khẩu thành công! Vui lòng kiểm tra email!"
      );
    }
  } catch (err) {}
}

function* actResetPassword(action) {
  let { resetContent } = action;
  try {
    let { status } = yield call(() => UserService.resetPassword(resetContent));
    if (status === STATUS_SUCCESS) {
      yield put({ type: ActionTypes.SET_RESET_STATE_1 });
      toast.success("Thay đổi mật khẩu thành công");
    } else toast.error("Thay đổi mật khẩu thất bại");
  } catch (err) {
    toast.error("Thay đổi mật khẩu thất bại");
  }
}

export function* followActLogin() {
  yield takeLatest(POST_USER_LOGIN_SAGA, actLogin);
}

export function* followActFetchListUser() {
  yield takeLatest(FETCH_LIST_USER_SAGA, actFetchListUser);
}

export function* followActNewUser() {
  yield takeLatest(ADD_NEW_USER_SAGA, actNewUser);
}

export function* followActEditUser() {
  yield takeLatest(EDIT_USER_SAGA, actEditUser);
}

export function* followActDeleteUser() {
  yield takeLatest(DELETE_USER_SAGA, actDeleteUser);
}

export function* followActForgotPassword() {
  yield takeLatest(FORGOT_PASSWORD_SAGA, actForgotPassword);
}

export function* followActResetPassword() {
  yield takeLatest(RESET_PASSWORD_SAGA, actResetPassword);
}
