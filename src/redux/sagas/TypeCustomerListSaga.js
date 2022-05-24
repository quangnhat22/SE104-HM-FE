import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import * as ActionTypesSaga from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant"
import {TypeCustomerService} from "../../services/TypeCustomerService";

function * actFetchListTypeCustomer() {
    try {
        let {data, status} = yield call (()=> TypeCustomerService.getListTypeCustomer());
        if(status === STATUS_SUCCESS) {
            yield put({
                type: ActionTypes.GET_TYPE_CUSTOMER,
                typeCustomerList: data
            })
        }
    } catch (err) {
        console.log(err.message)
    }
}

function * actPostTypeCustomer(typeCustomer) {
    try {
        let {status} = yield call(()=> TypeCustomerService.postRoomTypeCustomer(typeCustomer));
    } catch (err) {

    }
}

export function * followActFetchListTypeCustomer() {
    yield takeLatest(ActionTypesSaga.FETCH_LIST_TYPE_CUSTOMER_SAGA, actFetchListTypeCustomer);
}

export function * followPostTypeCustomer() {
    yield takeLatest(ActionTypesSaga.POST_TYPE_CUSTOMER_SAGA, actPostTypeCustomer)
}