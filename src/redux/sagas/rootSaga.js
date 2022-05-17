import { all } from "redux-saga/effects";
import * as RoomListSaga from "./RoomListSaga"
export default function* rootSaga() {
    yield all([
        RoomListSaga.followActFetchListRoom(),
    ]);
}