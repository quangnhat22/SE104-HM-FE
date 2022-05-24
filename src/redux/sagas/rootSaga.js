import { all } from "redux-saga/effects";
import * as RoomListSaga from "./RoomListSaga";
import * as TypeRoomSaga from "./TypeRoomListSaga";
import * as TypeCustomerSaga from "./TypeCustomerListSaga";
import * as RoomStateListSaga from "./RoomStateListSaga";
export default function* rootSaga() {
    yield all([
        RoomListSaga.followActFetchListRoom(),
        RoomListSaga.followActNewRoom(),
        RoomListSaga.followActDeleteRoom(),
        RoomStateListSaga.followFecthStateRoomList(),
        TypeRoomSaga.followActFetchListTypeRoom(),
        TypeCustomerSaga.followActFetchListTypeCustomer()
    ]);
}