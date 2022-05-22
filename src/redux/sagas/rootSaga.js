import { all } from "redux-saga/effects";
import * as RoomListSaga from "./RoomListSaga";
import * as TypeRoomSaga from "./TypeRoomListSaga";
import * as TypeCustomerSaga from "./TypeCustomerListSaga";
export default function* rootSaga() {
    yield all([
        RoomListSaga.followActFetchListRoom(),
        TypeRoomSaga.followActFetchListTypeRoom(),
        TypeCustomerSaga.followActFetchListTypeCustomer()
    ]);
}