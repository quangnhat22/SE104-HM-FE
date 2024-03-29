import { all } from "redux-saga/effects";
import * as UserSaga from "./UserSaga";
import * as UserGroupSaga from "./UserGroupSaga";
import * as RoomListSaga from "./RoomListSaga";
import * as TypeRoomSaga from "./TypeRoomListSaga";
import * as TypeCustomerSaga from "./TypeCustomerListSaga";
import * as RoomStateListSaga from "./RoomStateListSaga";
import * as ReportSaga from "./ReportSaga";
import * as ReportInYearSaga from "./ReportInYearSaga";
import * as InvoiceSaga from "./InvoiceSaga";
import * as RentVoucherSaga from "./RentVoucherSaga";
import * as ConfigSaga from "./ConfigSaga"
import * as SurchargeSaga from "./SurchareSaga";
import * as AllRoomSaga from "./AllRoomSaga";
export default function* rootSaga() {
    yield all([
        UserSaga.followActLogin(),
        UserSaga.followActFetchListUser(),
        UserSaga.followActNewUser(),
        UserSaga.followActEditUser(),
        UserSaga.followActDeleteUser(),
        UserSaga.followActForgotPassword(),
        UserSaga.followActResetPassword(),
        UserGroupSaga.followFetchListUserGroup(),
        RoomListSaga.followActFetchListRoom(),
        RoomListSaga.followActNewRoom(),
        RoomListSaga.followActEditRoom(),
        RoomListSaga.followActDeleteRoom(),
        AllRoomSaga.followActFetchAllInforForRoom(),
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
        ReportSaga.followActFetchReportExcel(),
        ReportInYearSaga.followActFetchReportInYear(),
        InvoiceSaga.followActFetchInvoiceList(),
        InvoiceSaga.followActAddNewInvoice(),
        RentVoucherSaga.followActFetchListRentVoucher(),
        RentVoucherSaga.followActNewRentVoucher(),
        RentVoucherSaga.followActFetchRentVoucherDetail(),
        ConfigSaga.followActFetchConfig(),
        ConfigSaga.followActUpdateNewConfig(),
        SurchargeSaga.followActFetchListSurcharge(),
        SurchargeSaga.followActAddNewSurcharge(),
        SurchargeSaga.followActEditSurcharge(),
        SurchargeSaga.followActDeleteSurcharge()
    ]);
}