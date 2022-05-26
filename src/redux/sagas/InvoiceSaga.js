import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import { STATUS_SUCCESS } from "../../services/urlAPI";
import {InvoiceService} from "../../services/InvoiceService";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";
const _ = require("lodash");

function* actFetchInvoiceList() {
  try {
    let {data, status} = yield call(() => InvoiceService.getListInvoice());
    if (status === STATUS_SUCCESS) {
      let newInvoiceList = _.forEach(data, (element) => {
          element.CTHD = _.map(element.CTHD, (cthd) => {
            return _.extend({},cthd, {
                STT: _.indexOf(element.CTHD, cthd) + 1,
                ThanhTien: cthd.SoNgayThue * cthd.DonGia
            })
          })
      });
      console.log("invoice: ",newInvoiceList);
        yield put({
            type: ActionTypes.GET_INVOICE_LIST,
            invoiceList: newInvoiceList
        })
    }
  } catch (err) {}
}

function * actNewInvoice(action) {
  let {invoice} = action;
  try {
  } 
  catch(err) {

  }

}

export function* followActFetchInvoiceList() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_INVOICE_SAGA,
    actFetchInvoiceList
  );
}
