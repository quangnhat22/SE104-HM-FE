import { all } from "redux-saga/effects";
import * as RoomListSaga from "./RoomListSaga";
import * as TypeRoomSaga from "./TypeRoomListSaga";
import * as TypeCustomerSaga from "./TypeCustomerListSaga";
import * as RoomStateListSaga from "./RoomStateListSaga";
import * as ReportSaga from "./ReportSaga";
import * as InvoiceSaga from "./InvoiceSaga";
export default function* rootSaga() {
    yield all([
        RoomListSaga.followActFetchListRoom(),
        RoomListSaga.followActNewRoom(),
        RoomListSaga.followActEditRoom(),
        RoomListSaga.followActDeleteRoom(),
        RoomStateListSaga.followFecthStateRoomList(),
        TypeRoomSaga.followActFetchListTypeRoom(),
        TypeRoomSaga.followActAddTypeRoom(),
        TypeRoomSaga.followActEditTypeRoom(),
        TypeRoomSaga.followActDeleteTypeRoom(),
        TypeCustomerSaga.followActFetchListTypeCustomer(),
        TypeCustomerSaga.followAddTypeCustomer(),
        TypeCustomerSaga.followEditTypeCustomer(),
        TypeCustomerSaga.followDeleteTypeCustomer(),
        ReportSaga.followActFetchReport(),
        InvoiceSaga.followActFetchInvoiceList()    
    ]);
}