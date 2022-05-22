import { call, put, takeLatest } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import { FETCH_LIST_TYPE_CUSTOMER } from "../constants/constantSaga";
import * as ActionTypes from "../constants/constant";
import {TypeCustomerService} from "../../services/TypeCustomerService"
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
        
    }
}

export function * followActFetchListTypeCustomer() {
    yield takeLatest(FETCH_LIST_TYPE_CUSTOMER, actFetchListTypeCustomer);
}