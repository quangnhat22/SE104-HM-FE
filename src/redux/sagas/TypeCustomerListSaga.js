import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypesSaga from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant"
import {TypeCustomerService} from "../../services/TypeCustomerService";
import { toast } from "react-toastify";

function * actFetchListTypeCustomer() {
    try {
        yield put({ type: ActionTypes.SHOW_LOADING });
        let {data, status} = yield call (()=> TypeCustomerService.getListTypeCustomer());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_TYPE_CUSTOMER,
                typeCustomerList: data
            })
        }
        yield put({ type: ActionTypes.HIDE_LOADING });
    } catch (err) {
        console.log(err.message)
        yield put({ type: ActionTypes.HIDE_LOADING });
    }
}

function * actAddTypeCustomer(action) {
    let {typeCustomer} = action;
    try {
        let {status} = yield call(()=> TypeCustomerService.addTypeCustomer(typeCustomer));
        if(status === STATUS_CREATE_SUCCESS) {
            yield put({type: ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER_SAGA});
            toast.success(`Thêm loại khách hàng ${typeCustomer.TenLoaiKhach} thành công`);
        }
    } catch (err) {

    }
}

function * actEditTypeCustomer(action) {
    let {typeCustomer} = action;
    try {
        let {status} = yield call(()=> TypeCustomerService.editTypeCustomer(typeCustomer));
        if(status === STATUS_SUCCESS) {
            yield put({type: ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER_SAGA});
            toast.success(`Chỉnh sửa loại khách hàng ${typeCustomer.TenLoaiKhach} thành công`);
        }
    } catch (err) {

    }
}

function * actDeleteTypeCustomer(action) {
    let {typeDelete} = action;
    try {
        let {status} = yield call(()=> TypeCustomerService.deleteTypeCustomer(typeDelete.MaLoaiKhach));
        if(status === STATUS_SUCCESS) {
            yield put({type: ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER_SAGA});
            toast.success(`Xoá loại khách hàng ${typeDelete.TenLoaiKhach} thành công`);
        }
    } 
    catch (err) {

    }
}


export function * followActFetchListTypeCustomer() {
    yield takeLatest(ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER_SAGA, actFetchListTypeCustomer);
}

export function * followAddTypeCustomer() {
    yield takeLatest(ActionTypesSaga.ADD_TYPE_CUSTOMER_SAGA, actAddTypeCustomer);
}

export function * followEditTypeCustomer() {
    yield takeLatest(ActionTypesSaga.EDIT_TYPE_CUSTOMER_SAGA, actEditTypeCustomer);
}

export function * followDeleteTypeCustomer() {
    yield takeLatest(ActionTypesSaga.DELETE_TYPE_CUSTOMER_SAGA, actDeleteTypeCustomer);
}