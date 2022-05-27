import { toast } from "react-toastify";
import { call, takeLatest, put } from "redux-saga/effects";
import { STATUS_CREATE_SUCCESS, STATUS_SUCCESS } from "../../services/urlAPI";
import { InvoiceService } from "../../services/InvoiceService";
import * as ActionTypes from "../constants/constant";
import * as SagaActionTypes from "../constants/constantSaga";
const _ = require("lodash");

function* actFetchInvoiceList() {
  try {
    let { data, status } = yield call(() => InvoiceService.getListInvoice());
    if (status === STATUS_SUCCESS) {
      let newInvoiceList = _.forEach(data, (element) => {
        element.CTHD = _.map(element.CTHD, (cthd) => {
          return _.extend({}, cthd, {
            STT: _.indexOf(element.CTHD, cthd) + 1,
            ThanhTien: cthd.SoNgayThue * cthd.DonGia,
          });
        });
      });
      console.log("invoice: ", newInvoiceList);
      yield put({
        type: ActionTypes.GET_INVOICE_LIST,
        invoiceList: newInvoiceList,
      });
    }
  } catch (err) {}
}

function* actAddNewInvoice(action) {
  let { invoiceSubmit } = action;
  try {
    let {status} = yield call(() =>
      InvoiceService.addNewInvoices(invoiceSubmit)
    );
    if (status === STATUS_CREATE_SUCCESS) {
      yield put({ type: SagaActionTypes.FETCH_LIST_INVOICE_SAGA });
      toast.success("Tạo hoá đơn mới thành công!");
    }
    else {
      toast.error("Tạo hoá đơn mới thất bại");
    }
  } catch (err) {}
}

export function* followActFetchInvoiceList() {
  yield takeLatest(
    SagaActionTypes.FETCH_LIST_INVOICE_SAGA,
    actFetchInvoiceList
  );
}

export function* followActAddNewInvoice() {
  yield takeLatest(SagaActionTypes.ADD_NEW_INVOICE_SAGA, actAddNewInvoice);
}
