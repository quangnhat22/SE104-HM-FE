import { toast } from 'react-toastify';
import {call, takeLatest, put} from 'redux-saga/effects';
import {SurchargeService} from "../../services/SurchargeService";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from '../../services/urlAPI';
import * as ActionTypes from "../constants/constant";
import { ADD_NEW_SURCHARGE_SAGA, DELETE_SURCHARGE_SAGA, EDIT_SURCHARGE_SAGA, FETCH_LIST_SURCHARGE_SAGA } from '../constants/constantSaga';

function * actFetchListSurcharge() {
    try {
        yield put({ type: ActionTypes.SHOW_LOADING });
        let {data, status} = yield call(()=> SurchargeService.getListSurcharge());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_SURCHARGE_LIST,
                surchargeList: data
            })
        }
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
    catch (err) {
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
}

function * actNewSurcharge(action) {
    let {SoKhach, TyLePhuThu} = action;
    try {
        let {status} = yield call(()=> SurchargeService.addSurcharge(SoKhach, TyLePhuThu));
        if(status === STATUS_CREATE_SUCCESS) {
            yield put ({type: FETCH_LIST_SURCHARGE_SAGA});
            toast.success("Thêm tỷ lệ phụ thu thành công!");
        }
    }
    catch (err) {

    }
}

function * actEditSurcharge(action) {
    let {SoKhach, TiLePhuThu} = action;
    try {
        let {status} = yield call(()=> SurchargeService.updateSurcharge(SoKhach, TiLePhuThu));
        if(status === STATUS_SUCCESS) {
            yield put ({type: FETCH_LIST_SURCHARGE_SAGA});
            toast.success("Chỉnh sửa tỷ lệ phụ thu thành công!");
        }
    }
    catch (err) {

    }
}

function * actDeleteSurcharge(action) {
    let {SoKhach} = action;
    try {
        let {status} = yield call(()=> SurchargeService.deleteSurcharge(SoKhach));
        if (status === STATUS_SUCCESS) {
            yield put ({type: FETCH_LIST_SURCHARGE_SAGA});
            toast.success("Xóa tỷ lệ phụ thu thành công!");
        }
    }
    catch (err) {

    }
}

export function * followActFetchListSurcharge() {
    yield takeLatest(FETCH_LIST_SURCHARGE_SAGA, actFetchListSurcharge);
}

export function * followActAddNewSurcharge() {
    yield takeLatest(ADD_NEW_SURCHARGE_SAGA, actNewSurcharge);
}

export function * followActEditSurcharge() {
    yield takeLatest(EDIT_SURCHARGE_SAGA, actEditSurcharge);
}

export function * followActDeleteSurcharge() {
    yield takeLatest(DELETE_SURCHARGE_SAGA, actDeleteSurcharge);
}