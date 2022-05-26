import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import {InvoiceService} from "../../services/InvoiceService";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";

function* actFetchInvoiceList() {
  try {
    let {data, status} = yield call(() => InvoiceService.getListInvoice());
    //handle array data
    
    if (status === STATUS_SUCCESS) {
        yield put({
            type: ActionTypes.GET_INVOICE_LIST,
            invoiceList: data
        })
    }
  } catch (err) {}
}

export function* followActFetchInvoiceList() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_INVOICE_SAGA,
    actFetchInvoiceList
  );
}
